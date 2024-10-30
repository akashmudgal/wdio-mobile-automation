import { Device } from "../types/device";

export interface BrowserstackDeviceConfig {
    android?: Device[],
    ios?: Device[],
}

export const browserStackDevices: BrowserstackDeviceConfig = {
    "android": [
        {
            "appium:deviceName": "Google Pixel 6",
            "appium:platformVersion": 12.0
        }
    ],
    "ios": [
        {
            "appium:deviceName": 'iPhone 14',
            "appium:platformVersion": 16
        }
    ]
}