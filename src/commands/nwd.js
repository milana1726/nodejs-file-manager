import { lstat, readdir } from 'fs/promises';
import path from 'path';
import { MESSAGE } from '../utils/constants.js';
import { checkInputFormat } from '../utils/checkInputFormat.js';


export const up = async (currentDirectory) => {
    const dirname = '..';

    try {
        const newDirectory = path.resolve(currentDirectory, dirname);
        const statDir = await lstat(newDirectory);

        if (statDir.isDirectory()) {
            return newDirectory;
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};

export const cd = async (currentDirectory, dirname) => {
    if (!checkInputFormat(dirname)) {
        return currentDirectory;
    }

    dirname = dirname.replace(/"/g, '');

    try {
        const newDirectory = path.resolve(currentDirectory, dirname);
        const statDir = await lstat(newDirectory);

        if (statDir.isDirectory()) {
            return newDirectory;
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
        return currentDirectory;
    }
};

export const ls = async (currentDirectory) => {
    const dirList = await readdir(currentDirectory, { withFileTypes: true });
    const dirListSorted = dirList.sort((a, b) => a.isFile() - b.isFile()).filter((item) => !item.isSymbolicLink());
    const result = dirListSorted.map((el) => ({ Name: el.name, Type: el.isFile() ? "file" : "directory"}));
    console.table(result);
};
