import { parsedConfigFile } from './parsedConfigFile.mjs';

export const getSSHConfig = () => {
    let hosts = [];

    parsedConfigFile.forEach(host => {

        const connection = flattenHost(host);
        
        flatHostIsValid(connection) 
        ? hosts.push(connection) 
        : console.log(`Unable to create connection for Host: ${host.value}`);

    });

    return hosts;
}

const flattenHost = host => {
    let connection = {};

    connection.Host = host.value;

    host.config.forEach(property => {
        switch (property.param) {
            case 'HostName':
                connection.HostName = property.value;
                break;
            case 'User':
                connection.User = property.value;
                break;
            case 'IdentityFile':
                connection.IdentityFile = property.value;
                break;
            default:
                break;
        }
    });
    
    connection.UserHost = `${connection.User}@${connection.HostName}`;

    return connection;
}

const flatHostIsValid = connection => {
    return (connection.User && connection.HostName && connection.IdentityFile)
    ? true 
    : false;
}