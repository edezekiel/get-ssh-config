const fs = require('fs');
const SSHConfig = require('ssh-config');
const process = require('process');

const sshConfigFile = () => {
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

serverConnections = (parsedConfigFile) => {
    const connections = generateServerConnections(parsedConfigFile);
    const validatedConnections = validateServerConnections(connections);
    return validatedConnections; 
}

const generateServerConnections = (parsedConfigFile) => {
    return parsedConfigFile.map(host => {
        let userHost = {};
        host.config.forEach(property => {
            switch (property.param) {
                case 'HostName':
                    userHost.HostName = property.value;
                    break;
                case 'User':
                    userHost.User = property.value;
                    break;
                default:
                    break;
            }
        });
        
        warnIfInvalidConnection(host, userHost);

        return (!!userHost.User && !!userHost.HostName) 
            ? `${userHost.User}@${userHost.HostName}` 
            : null;
    })
}

const warnIfInvalidConnection = (host, userHost) => {
    if (!userHost.User || !userHost.HostName) {
        console.warn("Unable to create connection for the following Host:");
        console.warn(`  Host: ${host.value}`);
        console.warn(`  User: ${userHost.User}`);
        console.warn(`  HostName: ${userHost.HostName}`);
    };
}

const validateServerConnections = connections => {
    const validated = connections.filter(connection => connection !== null);
    return Array.from(validated);
}

console.log(serverConnections(parsedConfigFile));
