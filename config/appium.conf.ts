import type { Options } from '@wdio/types';

export const platformConfig: Options.Testrunner = {
    
    // the default appium port
    port: 4723,

    //services for appium
    services: [['appium',{
        command: 'appium'
    }]],
}