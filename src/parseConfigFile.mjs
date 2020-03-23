import fs from 'fs';
import SSHConfig from 'ssh-config';
import process from 'process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const parseConfigFile = () => {
    // __dirname is not defined in Node ES Modules
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    try {
        process.chdir(process.env.HOME);

        // "~/.ssh/config" path doesn't work. Have to change directories instead.
        let config = fs.readFileSync('.ssh/config', {encoding: 'utf8'}, (err, data) => {
            if (err) throw err;
            return data;
        }).toString();
        process.chdir(__dirname);

        return SSHConfig.parse(config);

    } catch (err) {
        throw err;
    }
}