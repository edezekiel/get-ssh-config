# get-ssh-config
Get Hosts From Local SSH Config File

# Usage

```javascript
import { getSSHConfig } from 'get-ssh-config';

const printHosts = () => {

  console.log(getSSHConfig());

}

printHosts();
```

Returns an array of "hosts" derived from the config file:
```javascript
[
  {
     Host: [ 'staging' ],
     HostName: 'app1.test.matrix.com',
     User: 'keanu',
     IdentityFile: '~/.ssh/id_rsa',
     UserHost: 'keanu@app1.test.matrix.com'
  },
  {
     Host: [ 'prod' ],
     HostName: 'app1.prod.matrix.com',
     User: 'keanu',
     IdentityFile: '~/.ssh/id_rsa',
     UserHost: 'keanu@app1.prod.matrix.com'
  }
]
```

# The SSH Config File

This package assumes that you have a properly formatted file named `config` 
at `~/.ssh/config` on your local machine.

See [ssh.com/ssh/config](https://www.ssh.com/ssh/config) and [cyjake ssh-config](https://github.com/cyjake/ssh-config)
for more information about formatting and parsing the config file.
