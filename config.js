const fs = require('fs');
const rxjs = require('rxjs');
const vscode = require('vscode');

/**
 * Loop Through Directory and Find Config Files
 * @param {Object} include
 * @param {Number} maxResults
 * @param {Boolean} errIfNoFound
 */
function findFiles(include, maxResults, errIfNoFound) {
  return new rxjs.Observable(observer => {
    const tokenSource = new vscode.CancellationTokenSource();
    vscode.workspace.findFiles(include, undefined, maxResults, tokenSource.token).then(files => {
      if (errIfNoFound && !files.length) {
        observer.error(new Error('Unable find files: ' + include.pattern));
      } else {
        files.forEach(file => {
          observer.next(file);
        });
        observer.complete();
      }
    }, err => {
      observer.error(err);
    });
    return () => {
      tokenSource.dispose();
    };
  });
}

/**
 * Read dw.json Config File
 * @param {String} configFilename
 */
function readConfigFile(configFilename) {
  return new rxjs.Observable(observer => {
    const stream = fs.createReadStream(configFilename);
    let chunks = [];

    stream.on('data', chunk => {
      chunks.push(chunk);
    });

    stream.on('error', err => {
      observer.error(err);
    });

    stream.on('close', () => {
      try {
        const conf = JSON.parse(Buffer.concat(chunks).toString());
        conf.configFilename = configFilename;
        observer.next(conf);
        observer.complete();
        chunks = null;
      } catch (err) {
        observer.error(err);
      }
    });
    return () => {
      chunks = null;
      stream.close();
    };
  });
}

/**
 * Get Config for Sandbox
 */
function getSandbox() {
  const workspaces = vscode.workspace.workspaceFolders.filter(workspaceFolder => workspaceFolder.uri.scheme === 'file');
  const configs = Promise.all(workspaces.map(workspaceFolder => findFiles(new vscode.RelativePattern(workspaceFolder, '**/dw.json'), 1).toPromise()));

  return configs.then(configFiles => {
    if (configFiles) {
      configFiles = configFiles.filter(Boolean);

      if (!configFiles.length) {
        return Promise.reject('Missing dw.json');
      } else if (configFiles.length === 1) {
        return configFiles[0].fsPath;
      } else {
        return vscode.window.showQuickPick(configFiles.map(config => config.fsPath), {
          placeHolder: 'Select Config'
        });
      }
    } else {
      return Promise.reject('Missing dw.json');
    }
  }).then(filepath => {
    if (filepath) {
      return readConfigFile(filepath).toPromise().then(config => {
        if (!config) {
            return Promise.reject('Missing dw.json');
        } else if (!config.hostname) {
            return Promise.reject('Missing `hostname` param in dw.json');
        } else if (!config.sitecode) {
            return Promise.reject('Missing `sitecode` param in dw.json');
        }

        return config;
      });
    } else {
      return Promise.reject('Please choose configuration first');
    }
  });
};

function getMarkerAttribute(selection, attribute) {
  selection = selection.trim();

  var regex = new RegExp(`${attribute}="([^"]*)"`, '');
  var matches = selection.match(regex);

  return (matches !== null && matches.length > 1) ? matches[1] : null;
}

module.exports = {
  getSandbox,
  getMarkerAttribute
}