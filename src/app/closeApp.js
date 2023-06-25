import { ERROR_MESSAGE } from "../utils/constants.js";
import { userExit } from "../utils/userExit.js";

export const closeApp = async (username, rl) => {
    try {
        rl.on('SIGINT', () => userExit(username, rl));
        rl.on('line', (data) => {
            if (data === '.exit') {
                userExit(username, rl);
            }
        });
    } catch (error) {
        console.log(`${ERROR_MESSAGE.operationFailed}: ${error.message}`);
    }
}