import { lstat, readdir } from 'fs/promises';
import path from 'path';
import { ERROR_MESSAGE } from '../utils/constants.js';
import { checkInputFormat } from '../utils/сheckInputFormat.js';


export const up = async (currentDirectory) => {
    const arg = '..';
    try {
        const newDirectory = path.resolve(currentDirectory, arg);
        const statDir = await lstat(newDirectory);
        if (statDir.isDirectory()) {
            console.log(newDirectory);
            return newDirectory;
        }
    } catch (error) {
        console.log(`${ERROR_MESSAGE.operationFailed}: ${error.message}`);
    }
};

export const cd = async (currentDirectory, arg) => {
    if (!checkInputFormat(arg)) {
        return currentDirectory;
    }

    arg = arg.replace(/"/g, '');
    try {
        const newDirectory = path.resolve(currentDirectory, arg);
        const statDir = await lstat(newDirectory);
        if (statDir.isDirectory()) {
            return newDirectory;
        }
    } catch (error) {
        console.log(`${ERROR_MESSAGE.operationFailed}: ${error.message}`);
        return currentDirectory;
    }
};

export const ls = async (currentDirectory) => {
    const dirList = await readdir(currentDirectory, { withFileTypes: true });
    const dirListSorted = dirList.sort((a, b) => a.isFile() - b.isFile()).filter((item) => !item.isSymbolicLink());
    const result = dirListSorted.map((el) => ({ Name: el.name, Type: el.isFile() ? "file" : "directory"}));
    console.table(result);
};
