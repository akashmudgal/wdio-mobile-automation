import {exec} from 'child_process';

/**
 * Returns adb devices connected in debug mode, emulators or real devices
 * @returns List of adb devices
 */
export function getADBDevices() : Promise<string[]>{
    return new Promise((resolve,reject)=>{
        exec('adb devices',(error,stdout)=>{
            if(error){
                reject(error.message)
            }
            let deviceList = stdout.trim()
                .split('\n')
                .slice(1)
                .map(line => line.trim())
                // .filter(line=> {
                //         const isDebug = line.includes('device');
                        
                //         const isEmu = line.startsWith('emulator');
                        
                //         return isDebug && (emulator ? isEmu : !isEmu);
                //     }
                // )
                .map(el => {
                    return el.trim().replace(/\tdevice/, '');
                });
            
            resolve(deviceList);
        });
    });
}

/**
 * Function to check if any AVDs are available
 * @returns {Array<string>} list of avd names
 */
export function getAvailableAVDs(): Promise<Array<string>>{
    return new Promise((resolve, reject) => {
        exec('emulator -list-avds',(error,stdout)=>{
            if(error){
                reject(error);
            }

            const avdList = stdout.trim().split("\n");
            resolve(avdList);
        })
    })
}

/**
 * Function to launch the android emulator with specified AVD Name
 * @param {string} avdName 
 * @returns {number} Process id of the emulator process
 */
export function launchEmulator(avdName: string){
    return new Promise((resolve,reject)=>{
        exec(`powershell -C $(Start-Process emulator -ArgumentList '-avd ${avdName}' -PassThru).Id`,(error,stdout)=>{
            if(error){
                reject(error)
            }
            resolve(stdout)
        });
    })
}