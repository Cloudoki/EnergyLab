# EnergyLab

## Installation
Install cordova and ionic globally with `npm install -g cordova ionic`.

## Dependencies
Install the dependencies by running `ionic state reset` and add Image Detection Plugin `ionic plugin add https://github.com/Cloudoki/ImageDetectionCordovaPlugin.git` for git or clone the repository and run `ionic plugin add ../path/to/ImageDetectionCordovaPlugin`

## IOS
Add platform `ionic platform add ios`

Build `ionic build ios`

Open Xcode in platform/ios/ to test on device.

## Android
Add platform `ionic platform add android`

Build `ionic build android`

Run on device/emulator `ionic run android`
