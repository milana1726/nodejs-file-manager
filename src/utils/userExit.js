export const userExit = (username, rl) => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    rl.close();
};