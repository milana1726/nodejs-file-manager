import { MESSAGE } from "../utils/constants.js";
import { userExit } from "../utils/userExit.js";

export const closeApp = async (username, rl) => {
    try {
        rl.on('SIGINT', () => userExit(username, rl));
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
}