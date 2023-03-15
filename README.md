<div align="center">
  
  <img src="apps/electron/assets/icon.png" width="200" />
  
</div>

<br>

<p align="center">
Backup your Notion.so workspaces automatically
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
### Why the connection to a workspace is slow ?

To host the authentication credentials, we use a server, hosted on render.com. We use the free tier, so after **15 minutes of inactivity, the server shuts down**. Then, at the next request, the server will have to build and start. This takes about 45 to 60 seconds.

## Contributing
Notion Vault is an open-source project and we welcome contributions from anyone. To contribute, please fork the repository and submit a pull request with your changes.

## Issues
If you encounter any issues with Notion Vault, please open an issue on the GitHub repository. We will do our best to address any issues in a timely manner.

## Credits 
Icon by [Freepik](https://www.flaticon.com/free-icons/vault)  
Original template Electron+React from [this repo](https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder)  
Article: exporting notion data with a OAuth token https://notionbackups.com/blog/automated-notion-backup-api
