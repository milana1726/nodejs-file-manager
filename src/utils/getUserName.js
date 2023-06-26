import { MESSAGE } from "./constants.js";


export const getUserName = () => {
    try {
        const  [ username ] = process.argv
            .slice(2)
            .map((item) => item.split('=')[1]);
        return username;
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};