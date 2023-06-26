import { checkArgsCount } from "../utils/checkArgsCount.js";
import { showCurrentDirectory } from "../utils/showCurrentDirectory.js";
import { userExit } from "../utils/userExit.js";
import { up, cd, ls } from "../commands/nwd.js";
import { ERROR_MESSAGE } from "../utils/constants.js";


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

                default:
                    console.log(`${ERROR_MESSAGE.invalidInput}. Type one of these commands:
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
        console.log(`${ERROR_MESSAGE.operationFailed}: ${error.message}`);
    }
}