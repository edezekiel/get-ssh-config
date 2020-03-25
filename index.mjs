import { parseConfigFile } from './src/parseConfigFile.mjs';

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
        
        flatHostIsValid(flatHost) 
        ? hosts.push(flatHost) 
        : console.log(`Unable to create host: ${host.value}`);
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

const flatHostIsValid = flatHost => {
    return (flatHost.User && flatHost.HostName && flatHost.IdentityFile)
    ? true 
    : false;
}
