# OMAD - One Mile a Day

## Installation
Install cordova and ionic globally with `npm install -g cordova ionic`.
Go into `builder/` directory and do an npm and bower install by running the commands:

`npm install` - will install npm dependencies

`npm run bower install` - will install npm dependencies

`npm run gulp` - will build the www directory, watch the dev directory for changes and update accordingly

### Note
Any changes to the code is to be made in the dev directory.

## Dependencies
Install the dependencies by running `ionic state reset` and add Vuforia Cordova Plugin `ionic plugin add https://github.com/Cloudoki/VuforiaCordovaPlugin.git` **(this doesn't work if the repo is private since it requires authentication)** for git or clone the repository and run `ionic plugin add ../path/to/VuforiaCordovaPlugin`

## IOS
Add platform `ionic platform add ios`

Build `ionic build ios`

Open Xcode in platform/ios/ to test on device.

## Android
Add platform `ionic platform add android`

Build `ionic build android`

Run on device/emulator `ionic run android`
