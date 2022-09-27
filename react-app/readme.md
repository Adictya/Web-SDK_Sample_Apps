# Build React-sdk 
- Go to `<path-to-app-builder>/Builds/react-sdk`
- Edit `package.json` version number to a unique version
- Run `npm pack`

# Uninstall and Re-Install Appbuilder
- Go to where this directory is cloned
- `npm uninstall @appbuilder/react`
- `npm install <path-to-app-builder>/Builds/react-sdk/appbuilder-react-1.0.1.tgz` NOTE: update the version number

<!-- # Install additional dependencies [NOT NEEDED FOR SAMPLE APP]
- `npm install react-router-dom@5 @apollo/client@3 nanoid@4` -->

# Run the app
- `npm run start`
