import fs from 'fs';
import path from 'path';
import SSHConfig from 'ssh-config';

export const getSSHConfig = (): any[] => {
    try {
        const configPath = path.join(<string>process.env.HOME, '/.ssh/config');
        const parsedConfigFile = parseConfigFile(configPath);
        return generateHosts(parsedConfigFile);
    } catch (err) {
        throw err;
    }
}

export const generateHosts = (parsedConfigFile: any[]): any[] => {
    let hosts: any[] = [];
    parsedConfigFile.forEach(host => {
        const flatHost = flattenHost(host);
        hosts.push(flatHost)
    });
    return hosts;
}

export const parseConfigFile = (configPath: string | number | Buffer | import('url').URL) => {
    try {
        const config = fs.readFileSync(configPath, 'utf8');
        return SSHConfig.parse(config.toString());
    } catch (err) {
        throw err;
    }
}

const flattenHost = (host: { value: any; config: any[]; }): any => {
    let flatHost = <any>{};
    flatHost.Host = host.value;
    host.config.forEach((property: { param: string | number; value: any; }) => {
        flatHost[property.param] = property.value
    });
    return flatHost;
}
