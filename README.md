# EnergyLab

## Installation
Install cordova and ionic globally with `npm install -g cordova ionic`. 

## Dependencies
Install dependencies by running `ionic state reset` and add ARToolKit Cordova Plugin `cordova plugin add https://github.com/Cloudoki/ARToolKitCordovaPlugin.git`

## IOS (not tested yet)
Add platform `ionic platform add ios`

Build `ionic build ios`

Open Xcode in platform/ios/ to test on device.

## Android
Add platform `ionic platform add android`

Build `ionic build android`

Run on device/emulator `ionic run android`
