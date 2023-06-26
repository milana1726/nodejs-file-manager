import { checkArgsCount } from "../utils/checkArgsCount.js";
import { showCurrentDirectory } from "../utils/showCurrentDirectory.js";
import { userExit } from "../utils/userExit.js";
import { up, cd, ls } from "../commands/nwd.js";
import { MESSAGE } from "../utils/constants.js";
import { cat, add, rn, cp, mv, rm } from "../commands/fs.js";
import { hash } from "../commands/hash.js";
import { osInfo } from "../commands/os.js";
import { compress, decompress } from "../commands/zip.js";


export const commandsApp = (rl, username, currentDirectory) => {
    try {
        rl.on('line', async (data) => {
            const inputArgs = data.split(' ');

            const [ command, arg1, arg2 ] = inputArgs;

            switch (command) {
                case '.exit':
                    userExit(username, rl);
                    break;

                case 'up':
                    if (checkArgsCount(inputArgs, 0)) {
                        currentDirectory = await up(currentDirectory);
                    }
                    break;

                case 'cd':
                    if (checkArgsCount(inputArgs, 1)) {
                        currentDirectory = await cd(currentDirectory, arg1);
                    }
                    break;

                case 'ls':
                    if (checkArgsCount(inputArgs, 0)) {
                        await ls(currentDirectory);
                    }
                    break;
                case 'cat':
                    if (checkArgsCount(inputArgs, 1)) {
                        await cat(currentDirectory, arg1);
                    }
                    break;

                case 'add':
                    if (checkArgsCount(inputArgs, 1)) {
                        await add(currentDirectory, arg1);
                    }
                    break;

                case 'rn':
                    if (checkArgsCount(inputArgs, 2)) {
                        await rn(currentDirectory, arg1, arg2);
                    }
                    break;

                case 'cp':
                    if (checkArgsCount(inputArgs, 2)) {
                        await cp(currentDirectory, arg1, arg2);
                    }
                    break;

                case 'mv':
                    if (checkArgsCount(inputArgs, 2)) {
                        await mv(currentDirectory, arg1, arg2);
                    }
                    break;

                case 'rm':
                    if (checkArgsCount(inputArgs, 1)) {
                        await rm(currentDirectory, arg1);
                    }
                    break;

                case 'hash':
                    if (checkArgsCount(inputArgs, 1)) {
                        await hash(currentDirectory, arg1);
                    }
                    break;
                case 'os':
                    if (checkArgsCount(inputArgs, 1)) {
                        osInfo(arg1);
                    }
                    break;
                case 'compress':
                    if (checkArgsCount(inputArgs, 2)) {
                        await compress(currentDirectory, arg1, arg2);
                    }
                    break;
                case 'decompress':
                    if (checkArgsCount(inputArgs, 2)) {
                        await decompress(currentDirectory, arg1, arg2);
                    }
                    break;

                default:
                    console.log(`${MESSAGE.invalidInput}. Type one of these commands:
                        up
                        cd "path_to_directory"
                        ls
                        cat "path_to_file"
                        add "new_file_name.extension"
                        rn "path_to_file" "new_filename"
                        cp "path_to_file" "path_to_new_directory"
                        mv "path_to_file" "path_to_new_directory"
                        rm "path_to_file"
                        os --EOL
                        os --cpus
                        os --homedir
                        os --username
                        os --architecture
                        compress "path_to_file" "path_to_compressed_file"
                        decompress "path_to_compressed_file" "path_to_file"
                        .exit`);
                    break;
            }
            showCurrentDirectory(currentDirectory);
        });
    } catch (error) {
        console.log(`${MESSAGE.operationFailed}: ${error.message}`);
    }
}