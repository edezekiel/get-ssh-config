import { parseConfigFile } from './src/parseConfigFile.js';

export const getSSHConfig = () => {
    try {
        let parsedConfigFile = parseConfigFile();
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