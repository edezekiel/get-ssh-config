"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ssh_config_1 = __importDefault(require("ssh-config"));
exports.getSSHConfig = () => {
    try {
        const configPath = path_1.default.join(process.env.HOME, '/.ssh/config');
        const parsedConfigFile = exports.parseConfigFile(configPath);
        return exports.generateHosts(parsedConfigFile);
    }
    catch (err) {
        throw err;
    }
};
exports.generateHosts = (parsedConfigFile) => {
    let hosts = [];
    parsedConfigFile.forEach(host => {
        const flatHost = flattenHost(host);
        hosts.push(flatHost);
    });
    return hosts;
};
exports.parseConfigFile = (configPath) => {
    try {
        const config = fs_1.default.readFileSync(configPath, 'utf8');
        return ssh_config_1.default.parse(config.toString());
    }
    catch (err) {
        throw err;
    }
};
const flattenHost = (host) => {
    let flatHost = {};
    flatHost.Host = host.value;
    host.config.forEach((property) => {
        flatHost[property.param] = property.value;
    });
    return flatHost;
};
