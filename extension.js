const opn = require('opn');
const vscode = require('vscode');
const config = require('./config');

function activate(context) {
	const search = vscode.commands.registerCommand('extension.searchCommerceCloudDocs', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const keyword = editor.document.getText(editor.selection);
			vscode.window.showInformationMessage(`Opening SFCC Docs for "${keyword}" ...`);
			opn(`https://documentation.b2c.commercecloud.salesforce.com/DOC1/advanced/searchView.jsp?maxHits=25&searchWord=${encodeURI(keyword)}`);
		}
	});

	const bm = vscode.commands.registerCommand('extension.openInBusinessManager', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const selection = editor.document.getText(editor.selection);

			config.getSandbox().then(cnf => {
			  if (selection.indexOf('isslot') !== -1) {
			    const id = config.getMarkerAttribute(selection, 'id');
			    const context = config.getMarkerAttribute(selection, 'context');

			    if (id && context) {
			      vscode.window.showInformationMessage(`Opening Slot ID "${id}" in Business Manager ...`);
			      opn(`https://${cnf.hostname}/on/demandware.store/Sites-Site/-/StorefrontEditing-Slot?SlotID=${id}&ContextName=${context}&Site=${cnf.sitecode}&ContextUUID=null`);
			    } else {
			      vscode.window.showErrorMessage('Selection does not contain entire <isslot /> HTML Element.');
			    }
			  } else if (selection.indexOf('iscontentasset') !== -1) {
			    const id = config.getMarkerAttribute(selection, 'aid');

			    if (id) {
			      vscode.window.showInformationMessage(`Opening Content Asset "${id}" in Business Manager ...`);
			      opn(`https://${cnf.hostname}/on/demandware.store/Sites-Site/-/StorefrontEditing-Content?ContentUUID=${id}&Site=${cnf.sitecode}`);
			    } else {
			      vscode.window.showErrorMessage('Selection does not contain entire <iscontentasset /> HTML Element.');
			    }
			  } else {
			    vscode.window.showErrorMessage('Selection does not contain <isslot /> or <iscontentasset /> HTML Element.');
			  }
			}).catch(error => {
			  vscode.window.showErrorMessage(error);
			});

			context.subscriptions.push(search);
			context.subscriptions.push(bm);
		}
	});
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
