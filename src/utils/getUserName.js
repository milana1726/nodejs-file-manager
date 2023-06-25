import { ERROR_MESSAGE } from "./constants.js";


export const getUserName = () => {
    try {
        const  [ username ] = process.argv
            .slice(2)
            .map((item) => item.split('=')[1]);
        return username;
    } catch (error) {
        console.log(`${ERROR_MESSAGE.operationFailed}: ${error.message}`);
    }
};