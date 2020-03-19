export const serverConnections = (parsedConfigFile) => {
    const connections = generateServerConnections(parsedConfigFile);
    const validatedConnections = connectionNotNull(connections);
    return validatedConnections; 
}

const generateServerConnections = (parsedConfigFile) => {
    return parsedConfigFile.map(host => {

        const connection = generateConnection(host);
        
        switch (connectionIsValid(connection)) {
            case true:
                return connection
            case false:
                console.log(`Unable to create connection for ${connection}`)
                return null;
            default:
                break;
        }
    })
}

const generateConnection = (host) => {
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

const connectionIsValid = (connection) => {
    return (connection.User && connection.HostName && connection.IdentityFile)
    ? true 
    : false;
}

const connectionNotNull = connections => {
    const validated = connections.filter(connection => connection !== null);
    return Array.from(validated);
}