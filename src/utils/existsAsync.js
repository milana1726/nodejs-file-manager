import { access, constants } from 'fs/promises';


export const existsAsync = async (path) => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}
