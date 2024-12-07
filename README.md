# Test Automation Framework for Mobile Apps, based on webdriverIO

This is a demo project created with webdriverIO, Typescript, Cucumber for the below application:

https://github.com/saucelabs/sample-app-mobile/releases

## To get started:

- Ensure Android SDK is properly setup  with build tools installed as well
- Install appium node package globally
- Ensure Android Emulator is running or AVDs are configured (Framework is configured to auto detect running emulator and if not running, launch one with preconfigured AVDs)
- Install Dependencies
- Ensure Environment variables in `.env` are set'
- When set, run the npm script `wdio:local` :
	```
		npm run wdio:local
	```
