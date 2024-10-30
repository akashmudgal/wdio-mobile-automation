import { ServiceType } from "../types/servicetype";
import { browserStackDevices,BrowserstackDeviceConfig } from "../config/browserstack.device.conf";
import { Device } from "../types/device";
import { getAvailableAVDs, getADBDevices, launchEmulator } from "./android.utils";
import logger from "./logger.utils";

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
/**
 * 
 * @param {string} serviceType The service type on which test will be run, such as appium, or browserstack 
 * @param {string} platform The target platform Name(Android, iOS, Windows)
 * @param {boolean} emulator Whether to run on emulator or real devices. defaults to true, and only checked if serviceType is APPIUM
 * @param {string} appURL  URL/File path of the app being tested
 * @param {maxDevices} maxDevices max number capabilities to generate
 */
export async function generateCapabilities(serviceType: ServiceType = ServiceType.APPIUM, platform: string = "android", emulator: boolean = true, appURL: string = "",maxDevices = 1) {
    const platformName = platform.toLowerCase();
    const automationName = platformName == 'android'? "UiAutomator2" : "XCUITest";
    const app = process.env.APP_URL ?? appURL;

    if(!app) {
        throw new Error('APP_URL is not be specified. Please ensure APP_URL is set to the path of app.')
    }

    let devices: Device[] = [{"appium:deviceName": ''}];

    let debugDevices;

    if(serviceType == ServiceType.BROWSERSTACK){
        if(platformName.toLowerCase() == "android" || platformName.toLowerCase() == "ios")
            devices = browserStackDevices[platformName as keyof BrowserstackDeviceConfig]?.slice(maxDevices) ?? [];
    }
    else {
        // check to see if any emulator is running or device connected
        debugDevices = await getADBDevices();
        const isEmulator = (deviceName: string) => {
            return deviceName.startsWith("emulator")
        };
        
        // filter the debug devices to keep only emulators or real devices
        debugDevices = debugDevices.filter(deviceName => emulator === isEmulator(deviceName));

        if(!emulator && debugDevices.length < 1){
            throw new Error('No real devices found connected. Please connect an android device in debug mode and try again.')
        }
        else if(emulator && debugDevices.length < 1){
            logger.info('No debug devices found. Checking to see if AVD configured..')
            // get Available AVDs
            const avds = await getAvailableAVDs();

            if(!avds){
                throw new Error('No AVDs configured. Please setup an AVD or connect a real device and try again.');
            }


            await launchEmulator(avds[0]);

            // sleep for 5 seconds to 
            await sleep(10000);
            
            debugDevices = await getADBDevices();
            devices = debugDevices.map(deviceName => {return {"appium:deviceName": deviceName}});
        }
    }
    
    const caps: WebdriverIO.Capabilities = {
        platformName: platformName,
        "appium:automationName": automationName,
        "appium:app": app,
        "appium:appWaitActivity": "com.swaglabsmobileapp.MainActivity"
    }

    //...(serviceType == ServiceType.BROWSERSTACK ? {"bstack:options" : generateBStackOptions(`Sample App Tests - ${new Date().toLocaleString()}}]`,'Sample App')}: {})

    return devices.map(device =>{
        return {
            ...caps,
            ...device,
            ...(serviceType == ServiceType.BROWSERSTACK ? {"bstack:options" : generateBStackOptions(`Sample App Tests - ${new Date().toLocaleString()}}]`,'Sample App')}: {})
        } as WebdriverIO.Capabilities;

        // 
    });
}

// Function that generates the browserstack options for capabilities
function generateBStackOptions(buildName: string, projectName: string) {
    let options = {
        "buildName": buildName,
        "appiumVersion": "2.0.0",
        "projectName": projectName,
        "idleTimeout": 300,
        "interactiveDebugging": true,
    };

    return options;
}