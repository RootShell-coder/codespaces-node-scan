# Node-scan

[![node-scan](https://github.com/RootShell-coder/codespaces-node-scan/actions/workflows/docker-image.yml/badge.svg)](https://github.com/RootShell-coder/codespaces-node-scan/actions/workflows/docker-image.yml)

`docker run -ti --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest <ip or pool> <port or range>`

example

`docker run -ti --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest 8.8.8.8 53`

`docker run -ti --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest 192.168.0.1-254 22-443`
