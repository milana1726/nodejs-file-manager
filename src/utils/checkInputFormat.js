import { MESSAGE } from "./constants.js";


export const checkInputFormat = (inputValue) => {
    inputValue = inputValue.trim();
    if (inputValue.startsWith('"') && inputValue.endsWith('"')) {
        return true;
    } else {
        console.log(`${MESSAGE.operationFailed}: incorrect format. Please, use ""`);
        return false;
    }
}