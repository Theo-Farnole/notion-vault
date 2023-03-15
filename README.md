<div align="center">
  
  <img src="apps/electron/assets/icon.png" width="200" />
  
</div>

<br>

<p align="center">
Secure your hard work and ideas by automating your Notion.so workspace backups
</p>

<hr>


<p align="middle" height="400">
<img src="readme_assets/app_home.png" width="600" />
</p>

Notion Vault is an open-source application that allows you to create automatic and manual backups of your workspaces on Notion.so. The application is easy to use and connects to your Notion account using OAuth, ensuring the security of your data.

## Features

- Automatic and manual backups of your Notion workspaces
- Easy to connect with Notion using OAuth
- Simple and user-friendly interface

## Installation
Download Notion Vault for Windows from the [releases](https://github.com/Theo-Farnole/notion-vault/releases) page. 

## FAQ
### Why the connect workspace button is slow after authentification ? 

We use a server to convert the OAuth code to a permanent access code. THe server is hosted on render.com using the free tier, so after **15 minutes of inactivity, the server shuts down**. So, the first time click on "connect workspace" butotn, the server will have to build and start. This takes about 45 to 60 seconds.

### In which format is the export ?

The backups are the requests' data from the API, saved in .json. It is not using Markdown, HTML or csv. If you want to add this feature, an [issue](https://github.com/Theo-Farnole/notion-vault/issues/1) is open.

### Can I import my backup in Notion ?

Not for the moment.

## Contributing
Notion Vault is an open-source project and we welcome contributions from anyone. To contribute, please fork the repository and submit a pull request with your changes.

## Issues
If you encounter any issues with Notion Vault, please open an issue on the GitHub repository. We will do our best to address any issues in a timely manner.

## Credits 
Icon by [Freepik](https://www.flaticon.com/free-icons/vault)  
Original template Electron+React from [this repo](https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder)  
Article: exporting notion data with a OAuth token https://notionbackups.com/blog/automated-notion-backup-api
