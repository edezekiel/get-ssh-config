import { getSSHConfig } from './modules/getSSHConfig.mjs';
import readline from 'readline';
import process from 'process';

const main = () => {
    const hosts = getSSHConfig();
    console.log(hosts);

    //getPassword();
    return hosts;
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