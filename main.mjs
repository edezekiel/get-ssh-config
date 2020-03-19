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

    rl.question("Enter your FedEx password: ", (password) => {
        console.log(`${password}`)
        rl.close();
    })
}
main();