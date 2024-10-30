import type {Options} from '@wdio/types';
import logger from '../utils/logger.utils';
import pkg from 'multiple-cucumber-html-reporter';
const { generate } = pkg;

import { rmdirSync,existsSync } from 'node:fs';


export const baseConfig: Options.Testrunner = {
    runner: 'local',

    specs: ['./tests/features/*.feature'],

    // maximium instances to run
    maxInstances: 1,
    maxInstancesPerCapability: 1,

    // default log level
    logLevel: 'debug',

    // timeout for waitfor Timeouts
    waitforTimeout: 10000,

    // test framework to use
    framework: 'cucumber',

    reporters: [
        'dot',
        'spec',
        ['cucumberjs-json', {
                jsonFolder: `${process.cwd()}/report`,
                language: 'en',
                reportFilePerRetry: true
            }
        ]
    ],

    onPrepare: async () => {
        logger.info("Starting the test suite.")
        
        //remove the existing reports folder before starting the test suite
        if(existsSync(`${process.cwd()}/report`))
          rmdirSync(`${process.cwd()}/report`,{recursive: true})
    },

    onComplete: async (): Promise<void> => {

        logger.info("Generating the final report..")
        // Generate the report when it all tests are done
        let date = new Date();
        generate({
          jsonDir: `${process.cwd()}/report`,
          reportPath: `${process.cwd()}/report/cucumber-html-report`,
          openReportInBrowser: true,
          disableLog: true,
          saveCollectedJSON: true,
          reportName: 'Acceptance Tests Report',
          customData: {
            title: 'WDIO tests Report',
            data: [
              { label: 'Project', value: 'WDIO Demo Project' },
              { label: 'Date', value: date.toLocaleDateString() }
            ]
          }
        });
    }
}