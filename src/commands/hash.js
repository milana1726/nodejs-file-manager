import { existsAsync } from "../utils/existsAsync.js";
import path from "path";
import { checkInputFormat } from "../utils/checkInputFormat.js";
import { MESSAGE } from "../utils/constants.js";
import { lstat, readFile } from "fs/promises";
import { createHash } from 'crypto';

export const hash = async (currentDirectory, filename) => {
    if (!checkInputFormat(filename)) {
        return currentDirectory;
    }

    filename = filename.replace(/"/g, '');
    const filePath = path.resolve(currentDirectory, filename);

    if (!filename.includes('.')) {
        console.log(`${MESSAGE.operationFailed}: Insert file name with extension!`);
        return;
    }

    try {
        const statFile = await lstat(filePath);
        if (await existsAsync(filePath) && statFile.isFile()) {
            const fileContent = await readFile(filePath);
            const fileHash = createHash('sha256').update(fileContent).digest('hex');
            console.log(fileHash);
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
}
