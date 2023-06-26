import { createReadStream, createWriteStream } from "fs";
import { existsAsync } from "../utils/existsAsync.js";
import path from "path";
import { checkInputFormat } from "../utils/checkInputFormat.js";
import { MESSAGE } from "../utils/constants.js";
import { lstat, writeFile, rename, rm as remove } from "fs/promises";
import { pipeline } from 'stream/promises';


export const cat = async (currentDirectory, filename) => {
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
        const fileExists = await existsAsync(filePath);
        if (fileExists && statFile.isFile()) {
            const stream = createReadStream(filePath, { encoding: 'utf8' });
            stream.pipe(process.stdout);
            stream.on("end", () => {
                console.log();
            });
            stream.on("error", (error) => {
                console.log(`${MESSAGE.operationFailed}: ${error.message}`);
            });
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};

export const add = async (currentDirectory, filename) => {
    if (!checkInputFormat(filename)) {
        return currentDirectory;
      }

      filename = filename.replace(/"/g, '');

      try {
        if (filename.includes('.')) {
            const filePath = path.resolve(currentDirectory, filename);
            const fileExists = await existsAsync(filePath);
            if (fileExists) {
              console.log(`${MESSAGE.operationFailed}: File '${filename}' already exists!`);
              return;
            }
            const writeStream = createWriteStream(filePath);
            writeStream.end();
            console.log(MESSAGE.operationSuccessful);
        } else {
          console.log(`${MESSAGE.operationFailed}: insert file name with extension!`);
        }
      } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
      }
};

export const rn = async (currentDirectory, filename, newFilename) => {
    if (!checkInputFormat(filename) || !checkInputFormat(newFilename)) {
        return currentDirectory;
    }

    filename = filename.replace(/"/g, '');
    newFilename = newFilename.replace(/"/g, '');

    const sourceFilePath = path.resolve(currentDirectory, filename);
    const newFilePath = path.resolve(currentDirectory, newFilename);

    const sourceFileExists = await existsAsync(sourceFilePath);
    const newFileExists = await existsAsync(newFilePath);

    if (!sourceFileExists) {
        console.log(`${MESSAGE.operationFailed}: File '${filename}' does not exist!`);
        return;
    }

    if (newFileExists) {
        console.log(`${MESSAGE.operationFailed}: File '${newFilename}' already exists!`);
        return;
    }

    if (!newFilename.includes('.')) {
        console.log(`${MESSAGE.operationFailed}: Insert file name with extension!`);
        return;
    }

    try {
        const statFile = await lstat(sourceFilePath);
        if (statFile.isFile()) {
            await rename(sourceFilePath, newFilePath);
            console.log(MESSAGE.operationSuccessful);
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};

export const cp = async (currentDirectory, sourceFilename, newDirPath) => {
    if (!checkInputFormat(sourceFilename) || !checkInputFormat(newDirPath)) {
        return currentDirectory;
    }

    sourceFilename = sourceFilename.replace(/"/g, '');
    newDirPath = newDirPath.replace(/"/g, '');

    const sourceFilePath = path.resolve(currentDirectory, sourceFilename);
    const filename = path.basename(sourceFilePath);
    const newFilePath = path.join(newDirPath, filename);

    if (!filename.includes('.')) {
        console.log(`${MESSAGE.operationFailed}: Insert file name with extension!`);
        return;
    }

    if (path.dirname(sourceFilePath) === newDirPath) {
        console.log(`${MESSAGE.operationFailed}: Cannot copy file to itself!`);
        return;
    }

    try {
        const statFile = await lstat(sourceFilePath);
        const statDir = await lstat(newDirPath);
        if (statFile.isFile() && statDir.isDirectory()) {
            const newFileExists = await existsAsync(newFilePath);
            if (newFileExists) {
                console.log(`${MESSAGE.operationFailed}: File '${filename}' already exists!`);
                return;
            }
            const readStream = createReadStream(sourceFilePath);
            const writeStream = createWriteStream(newFilePath, { flags: 'a' });
            await pipeline(readStream, writeStream);
            console.log(MESSAGE.operationSuccessful);
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};

export const mv = async (currentDirectory, sourceFilename, newDirPath) => {
    if (!checkInputFormat(sourceFilename) || !checkInputFormat(newDirPath)) {
        return currentDirectory;
    }

    sourceFilename = sourceFilename.replace(/"/g, '');
    newDirPath = newDirPath.replace(/"/g, '');

    const sourceFilePath = path.resolve(currentDirectory, sourceFilename);
    const filename = path.basename(sourceFilePath);
    const newFilePath = path.join(newDirPath, filename);

    if (!filename.includes('.')) {
        console.log(`${MESSAGE.operationFailed}: Insert file name with extension!`);
        return;
    }

    if (path.dirname(sourceFilePath) === newDirPath) {
        console.log(`${MESSAGE.operationFailed}: Cannot copy file to itself!`);
        return;
    }

    try {
        const statFile = await lstat(sourceFilePath);
        const statDir = await lstat(newDirPath);
        if (statFile.isFile() && statDir.isDirectory()) {
            const newFileExists = await existsAsync(newFilePath);
            if (newFileExists) {
                console.log(`${MESSAGE.operationFailed}: File '${filename}' already exists!`);
                return;
            }
            const readStream = createReadStream(sourceFilePath);
            const writeStream = createWriteStream(newFilePath, { flags: 'a' });
            await pipeline(readStream, writeStream);
            await remove(sourceFilePath);
            console.log(MESSAGE.operationSuccessful);
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};

export const rm = async (currentDirectory, filename) => {
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
        const fileExists = await existsAsync(filePath);
        if (fileExists && statFile.isFile()) {
            await remove(filePath);
            console.log(MESSAGE.operationSuccessful);
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};
