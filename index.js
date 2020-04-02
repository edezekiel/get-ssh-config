import fs from 'fs';
import path from 'path';
import SSHConfig from 'ssh-config';

export const getSSHConfig = () => {
    try {
        const configPath = path.join(process.env.HOME, '/.ssh/config');
        const parsedConfigFile = parseConfigFile(configPath);
        return generateHosts(parsedConfigFile);
    } catch (err) {
        throw err;
    }
}

export const generateHosts = parsedConfigFile => {
    let hosts = [];
    parsedConfigFile.forEach(host => {
        const flatHost = flattenHost(host);
        hosts.push(flatHost)
    });
    return hosts;
}

const flattenHost = host => {
    let flatHost = {};
    flatHost.Host = host.value;
    host.config.forEach(property => {
        flatHost[property.param] = property.value
    });
    return flatHost;
}

export const parseConfigFile = configPath => {
    try {
        const config = fs.readFileSync(configPath, 'utf8');
        return SSHConfig.parse(config.toString());
    } catch (err) {
        throw err;
    }
}