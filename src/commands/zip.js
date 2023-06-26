import { checkInputFormat } from "../utils/checkInputFormat.js";
import { MESSAGE } from "../utils/constants.js";
import { createReadStream, createWriteStream } from 'fs';
import { lstat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import path from 'path';
import { existsAsync } from "../utils/existsAsync.js";

export const compress = async (currentDirectory, filename, archiveName) => {
    if (!checkInputFormat(filename) || !checkInputFormat(archiveName)) {
        return currentDirectory;
    }

    filename = filename.replace(/"/g, '');
    archiveName = archiveName.replace(/"/g, '');

    const filePath = path.resolve(currentDirectory, filename);
    const compressFilePath = path.resolve(currentDirectory, archiveName);

    if (!archiveName.includes('.br')) {
        console.log(`${MESSAGE.operationFailed}: Incorrect format. Use '.br' extension for ${archiveName}`);
        return;
    }

    try {
        const archiveExists = await existsAsync(compressFilePath);

        if (archiveExists) {
            console.log(`${MESSAGE.operationFailed}: Archive file '${archiveName}' already exists!`);
            return;
        }

        const statFile = await lstat(filePath);

        if (statFile.isFile()) {
            const brotliCompress = createBrotliCompress();
            const readStream = createReadStream(filePath);
            const writeStream = createWriteStream(compressFilePath, { flags: 'a' });

            await pipeline(readStream, brotliCompress, writeStream);
            console.log(MESSAGE.operationSuccessful);
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};

export const decompress = async (currentDirectory, archiveName, filename) => {
    if (!checkInputFormat(archiveName) || !checkInputFormat(filename)) {
        return currentDirectory;
    }

    archiveName = archiveName.replace(/"/g, '');
    filename = filename.replace(/"/g, '');

    const compressFilePath = path.resolve(currentDirectory, archiveName);
    const filePath = path.resolve(currentDirectory, filename);

    if (!filename.includes('.')) {
        console.log(`${MESSAGE.operationFailed}: Insert file name with extension!`);
        return;
    }

    if (!archiveName.includes('.br')) {
        console.log(`${MESSAGE.operationFailed}:Incorrect format. Use '.br' extension for ${archiveName}`);
        return;
    }

    try {
        const fileExists = await existsAsync(filePath);

        if (fileExists) {
            console.log(`${MESSAGE.operationFailed}: File '${filename}' already exists!`);
            return;
        }

        const statFile = await lstat(compressFilePath);

        if (statFile.isFile()) {
            const brotliDecompress = createBrotliDecompress();
            const readStream = createReadStream(compressFilePath);
            const writeStream = createWriteStream(filePath, { flags: 'a' });

            await pipeline(readStream, brotliDecompress, writeStream);
            console.log(MESSAGE.operationSuccessful);
        }
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
};
