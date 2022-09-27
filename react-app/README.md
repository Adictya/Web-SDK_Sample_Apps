# Build React-sdk 
Go to `<path-to-app-builder>/Builds/react-sdk`
Edit `package.json` version number to a unique version
Run `npm pack`

# Uninstall and Re-Install Appbuilder
Go to where this directory is cloned
`npm uninstall agora-app-builder-sdk`
`npm install <path-to-app-builder>/Builds/react-sdk`

# Install additional dependencies
`npm install react-router-dom@5 @apollo/client@3`

# Run the app
`npm run start`
