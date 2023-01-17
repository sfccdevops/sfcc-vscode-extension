Project Support
===

If you or your company enjoy using this project, please consider supporting my work and joining my discord. 💖

[![Become a GitHub Sponsor](https://img.shields.io/badge/Sponsor-171515.svg?logo=github&logoColor=white&style=for-the-badge "Become a GitHub Sponsor")](https://github.com/sponsors/sfccdevops)
[![Become a Patreon Sponsor](https://img.shields.io/badge/Sponsor-FF424D.svg?logo=patreon&logoColor=white&style=for-the-badge "Become a Patreon Sponsor")](https://patreon.com/peter_schmalfeldt)
[![Donate via PayPal](https://img.shields.io/badge/Donate-169BD7.svg?logo=paypal&logoColor=white&style=for-the-badge "Donate via PayPal")](https://www.paypal.me/manifestinteractive)
[![Join Discord Community](https://img.shields.io/badge/Community-5865F2.svg?logo=discord&logoColor=white&style=for-the-badge "Join Discord Community")](https://discord.gg/U2x6gZRNgY)

------

![Logo](https://sfccdevops.s3.amazonaws.com/logo-128.png "Logo")

VS Code Extension
---

> Context Menu to make Developing for Salesforce Commerce Cloud Easier:

- [X] Quickly Search SFCC Docs for Selected Text from ISML and JS Files
- [X] Open Content Assets in Business Manager from ISML Files
- [X] Open Slots in Business Manager from ISML Files


Setup
---

> You probably already have everything else you need, though we do add a new `sitecode` property to the `dw.json` as it is required for opening Slots & Content Assets in Business Manager.

1. Make sure you install [Prophet Debugger](https://marketplace.visualstudio.com/items?itemName=SqrTT.prophet)
2. Edit the `dw.json` file in your VS Code Workspace Root Folder
3. Add a new `sitecode` property ( _Administration >  Sites >  Manage Sites_ then copy the `ID` attribute for the one you use most )

Final JSON should look something like this:

```json
{
  "hostname": "dev01-web-sandbox.demandware.net",
  "username": "me@email.com",
  "password": "supersecret",
  "code-version": "version1",
  "sitecode": "myclient-us"
}
```


Usage
---

#### Searching SFCC Docs

> This works in any `.isml` of `.js` file.  Select the text you want to lookup, right click it, and select **Search SFCC Docs**.

![demo](docs/img/search-docs.gif?v=1.1.0)

#### Open in Business Manager

> This works in any `.isml` file.  Select the entire `isslot` or `iscontentasset` HTML node ( tripple click to select an entire line ), right click it, and select **Open in BM**

![demo](docs/img/open-in-bm.gif?v=1.1.0)


Developer Overview
---

> Here is how you can work on this extension on your local machine:

1. Clone this repo to your local machine `git clone https://github.com/sfccdevops/sfcc-vscode-extension.git`
2. Open `sfcc-vscode-extension` folder in VS Code
3. Open the `extension.js` file
4. Press the `F5` key to build & launch a new instance of VS Code
5. This extension will be installed the new instance for you to play with

Disclaimer
---

> The trademarks and product names of Salesforce®, including the mark Salesforce®, are the property of Salesforce.com. SFCC DevOps is not affiliated with Salesforce.com, nor does Salesforce.com sponsor or endorse the SFCC DevOps products or website. The use of the Salesforce® trademark on this project does not indicate an endorsement, recommendation, or business relationship between Salesforce.com and SFCC DevOps.
