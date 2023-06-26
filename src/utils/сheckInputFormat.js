import { ERROR_MESSAGE } from "./constants.js";
import { showCurrentDirectory } from "./showCurrentDirectory.js";


export const checkInputFormat = (inputValue) => {
    inputValue = inputValue.trim();
    if (inputValue.startsWith('"') && inputValue.endsWith('"')) {
        return true;
    } else {
        console.log(`${ERROR_MESSAGE.operationFailed}: incorrect format. Please, use ""`);
        return false;
    }
}