import type { Options } from '@wdio/types';

export const platformConfig: Options.Testrunner = {
    services: ['browserstack'],

    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCES_KEY
}