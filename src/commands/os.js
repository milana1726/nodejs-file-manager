import os from 'os';
import { checkInputFormat } from '../utils/checkInputFormat.js';
import { MESSAGE } from '../utils/constants.js';


const osOperations = {
    eol() {
        const defaultEOL = JSON.stringify(os.EOL);
        console.log(`Default system EOL is: ${defaultEOL}`);
    },

    cpus() {
        console.log(`Total amount of CPUS: ${os.cpus().length}`);
        console.table(os.cpus().map(unit => {
            return {
                Model: unit.model,
                clockRate: `${unit.speed / 1000} GHz`,
            }
        }));
    },

    homedir() {
        console.log(`Your home directory is: ${os.homedir()}`);
    },

    username() {
        console.log(`System user name is: ${os.userInfo().username}`);
    },

    architecture() {
        console.log(`CPU architecture is: ${process.arch}`);
    },
};

export const osInfo = (parameter) => {
    if (parameter.startsWith('"') && parameter.endsWith('"')) {
        console.log(`${MESSAGE.operationFailed}: incorrect format. Please, don't use ""`);
        return;
    }

    switch (parameter) {
        case "--eol":
        case "--EOL":
            osOperations.eol();
            break;
        case "--cpus":
            osOperations.cpus();
            break;
        case "--homedir":
            osOperations.homedir();
            break;
        case "--username":
            osOperations.username();
            break;
        case "--architecture":
            osOperations.architecture();
            break;

        default:
            break;
    }
};
