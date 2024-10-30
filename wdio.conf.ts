import { Options } from '@wdio/types';
import {baseConfig} from './config/base.conf';
import {generateCapabilities} from './utils/capabilities.utils';
import { ServiceType } from './types/servicetype';
import { configDotenv } from 'dotenv';
configDotenv({path: ".env"});

let serviceType = process.env.SERVICETYPE ?? "APPIUM";

// import the config as per the service type set
const serviceConfig = await import(`./config/${serviceType.toLowerCase()}.conf`)

let setupType = ServiceType[serviceType.toUpperCase() as keyof typeof ServiceType];

const platformName = process.env.PLATFORM?.toLowerCase() ?? "android";
const maxDevices = Number(process.env.MAX_DEVICES ?? 1);
const appUrl = process.env.APP_URL ?? "D:\\Downloads\\Android.SauceLabs.Mobile.Sample.app.2.7.1.apk";
const useEmulator = process.argv.includes('--emulator') ? true: false;

export const config: WebdriverIO.Config = {
    ...baseConfig,
    
    ...serviceConfig.platformConfig,

    capabilities: await generateCapabilities(setupType,platformName,useEmulator,appUrl,maxDevices),
    // cucumber options
    cucumberOpts: {
        require: ['./tests/step-definitions/*.ts'],
    },
    afterScenario: async (world,result)=>{
        console.log(result);

        await browser.reloadSession();
    }
}