import type { Options } from '@wdio/types';

export const platformConfig: Options.Testrunner = {
    
    //services for appium
    services: [['appium',{
        command: 'appium'
    }]],
}