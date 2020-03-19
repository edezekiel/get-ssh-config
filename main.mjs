import { serverConnections } from './modules/serverConnections.mjs';
import { parsedConfigFile } from './modules/parsedConfigFile.mjs';
import readline from 'readline';
import process from 'process';

const main = () => {
    const connections = serverConnections(parsedConfigFile);
    console.log(connections);

    getPassword();
    return connections;
}

const getPassword = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

    rl.question("Please enter the password used for ssh login on remote machine(s): ", (password) => {
        console.log(`${password}`)
        rl.close();
    })
}
main();