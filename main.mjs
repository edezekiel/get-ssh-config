import { serverConnections } from './modules/serverConnections.mjs';
import { parsedConfigFile } from './modules/parsedConfigFile.mjs';

const main = () => {
    const connections = serverConnections(parsedConfigFile);
    console.log(connections);
    return connections;
}

main();