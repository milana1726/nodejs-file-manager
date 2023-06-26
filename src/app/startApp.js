import { MESSAGE } from "../utils/constants.js";
import { showCurrentDirectory } from "../utils/showCurrentDirectory.js";


export const startApp = (username, currentDirectory) => {
    try {
        console.log(`Welcome to the File Manager, ${username}!`);
        showCurrentDirectory(currentDirectory);
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
}
