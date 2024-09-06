# Codespaces Node Scan

[![codespaces-node-scan](https://github.com/RootShell-coder/codespaces-node-scan/actions/workflows/docker-image.yml/badge.svg)](https://github.com/RootShell-coder/codespaces-node-scan/actions/workflows/docker-image.yml)

The `codespaces-node-scan` it's scanner can be used in CI to detect host availability and open ports. Displays data in JSON format.

`docker run -i --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest <ip or pool(-)> <port or range(-) or ports(,)>`

## example usage

help

`docker run -i --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest --help`

output

```
Node-scan CI component usage:
Help: codespaces-node-scan --help or empty
Scan example target ports: codespaces-node-scan 8.8.8.8 53,443
Scan example range hosts and port: codespaces-node-scan 192.168.0.2-254 80
Scan example range hosts and ports: codespaces-node-scan 192.168.0.27-192.168.0.254 22-443
```

scan host and port

`docker run -i --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest 8.8.8.8 53`

output
```json
[
  {
    "result": "ok"
  },
  {
    "ip": "8.8.8.8",
    "port": 53,
    "banner": "",
    "status": "open"
  }
]
```

## build

```bash
git clone https://github.com/RootShell-coder/codespaces-node-scan.git .
cd docker
docker build -t node-scan -f docker/Dockerfile .
```
