# Notion App Backup

I am building a desktop app to make local backups of my notion.so workspaces.

## The next micro tasks

### Main tasks before release
- ADD recurrent backup system when app is opened
- Open app at startup
- Unfork 
- Create backend server to /login/:code
- Create a nice README.md + Move remaining tasks into issues
- Advertise to notion communities

### Polish
| Priority | Task
|----------|-------
| HIGH     | Save in markdown or html (instead of .json)
| MEDIUM   | Allow backup path changing
| MEDIUM   | Select backup interval (day, week)
| LOW      | ADD backup history in "backup details" page
| LOW      | ADD latest backup recap in "backup details" page
| LOW      | Add "open in explorer" button in "backup details" page
| LOW      | ADD progression feedback when manual backup btn is pressed (for the moment it is faked)

## Contributions 

Original template Electron+React from [this repo](https://github.com/yhirose/react-typescript-electron-sample-with-create-react-app-and-electron-builder)  
Article: exporting notion data with a OAuth token https://notionbackups.com/blog/automated-notion-backup-api
