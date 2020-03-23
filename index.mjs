import { parseConfigFile } from './src/parseConfigFile.mjs';

export const getSSHConfig = () => {

    try {
        let parsedConfigFile = parseConfigFile();

        let hosts = [];

        parsedConfigFile.forEach(host => {
    
            const flatHost = flattenHost(host);
            
            flatHostIsValid(flatHost) 
            ? hosts.push(flatHost) 
            : console.log(`Unable to create host: ${host.value}`);
        });
        
        return hosts;
    } catch (err) {
        throw err;
    }
}

const flattenHost = host => {
    let flatHost = {};

    flatHost.Host = host.value;

    host.config.forEach(property => {
        switch (property.param) {
            case 'HostName':
                flatHost.HostName = property.value;
                break;
            case 'User':
                flatHost.User = property.value;
                break;
            case 'IdentityFile':
                flatHost.IdentityFile = property.value;
                break;
            default:
                break;
        }
    });
    
    flatHost.UserHost = `${flatHost.User}@${flatHost.HostName}`;

    return flatHost;
}

const flatHostIsValid = flatHost => {
    return (flatHost.User && flatHost.HostName && flatHost.IdentityFile)
    ? true 
    : false;
}
