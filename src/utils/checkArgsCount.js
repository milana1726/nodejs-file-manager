import { ERROR_MESSAGE } from "./constants.js";


export const checkArgsCount = (inputArgs, count) => {
    if (inputArgs.length !== count + 1) {
        console.log(`${ERROR_MESSAGE.invalidInput}: Expected ${count} arguments, but got ${inputArgs.length - 1}!`);
        return false;
    }
    return true;
}
