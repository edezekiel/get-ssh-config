import { serverConnections } from './modules/serverConnections.mjs';
import fs from 'fs';
import SSHConfig from 'ssh-config';
import process from 'process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const sshConfigFile = () => {
    // __dirname is not defined in Node ES Modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    process.chdir(process.env.HOME);

    // "~/.ssh/config" path doesn't work. Have to change directories instead.
    const config = fs.readFileSync('.ssh/config', {encoding: 'utf8'}, (err, data) => {
        if (err) throw err;
        return data;
    }).toString();

    process.chdir(__dirname);
    return config;
}

const parsedConfigFile = SSHConfig.parse(sshConfigFile());

console.log(serverConnections(parsedConfigFile));
