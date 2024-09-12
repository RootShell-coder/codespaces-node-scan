# Codespaces Node Scan

[![codespaces-node-scan](https://github.com/RootShell-coder/codespaces-node-scan/actions/workflows/docker-image.yml/badge.svg)](https://github.com/RootShell-coder/codespaces-node-scan/actions/workflows/docker-image.yml)

The `codespaces-node-scan` it's scanner can be used in CI to detect host availability and open ports. Displays data in JSON format.

`docker run -i --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest <ip or pool(-)> <port or range(-) or ports(,)>`

## example usage

### help

`docker run -i --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest --help`

### output

```bash
Node-scan CI component usage:
Help: codespaces-node-scan --help or empty
Scan example target ports: codespaces-node-scan 8.8.8.8 53,443
Scan example range hosts and port: codespaces-node-scan 192.168.0.2-254 80
Scan example range hosts and ports: codespaces-node-scan 192.168.0.27-192.168.0.254 22-443
```

---

### scan host and port

`docker run -i --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest 8.8.8.8 53`

### output

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

---

### Use for .gitlab-ci.yml

```yml
---
default:
  cache:
    key: "${CI_COMMIT_REF_SLUG}"
    paths:
      - configs

stages:
  - check_port

services:
  - name: docker:dind

variables:
  DOCKER_HOST: tcp://docker:2376
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"

  SCAN_NET: 10.10.20.1-254
  SCAN_PORT: 23

gitlab:get_router:
  stage: check_port
  tags:
    - service_dontainer_dind
  script:
    - apk add jq
    - docker run -i --rm ghcr.io/rootshell-coder/codespaces-node-scan:latest ${SCAN_NET} ${SCAN_PORT} | jq -r '.[] | select(.ip) | .ip' > configs/available.ip
    - cat configs/available.ip
```

### optput pipeline

```bash
10.10.20.3
10.10.20.57
10.10.20.44
10.10.20.1
10.10.20.55
10.10.20.48
10.10.20.21
10.10.20.30
```

---

### This can be used for ansible to form a inventories/hosts.yml file in next task.

```yml
gitlab:lint:
  stage: ansible_play
  image: ghcr.io/rootshell-coder/ansible:latest
  tags:
    - service_dontainer_dind
  script:
    - |+
      echo "---" > inventories/hosts.yml
      echo "all:" >> inventories/hosts.yml
      echo "  children:" >> inventories/hosts.yml
      echo "    dynamic:" >> inventories/hosts.yml
      echo "      hosts:" >> inventories/hosts.yml
      while IFS= read -r ip; do
        echo "        ${ip}:" >> inventories/hosts.yml
        done < configs/available.ip
    - ansible-lint -q --offline
    - cat inventories/hosts.yml
```

### optput pipeline

```yaml
---
all:
  children:
    dynamic:
      hosts:
        10.10.20.3:
        10.10.20.57:
        10.10.20.44:
        10.10.20.1:
        10.10.20.55:
        10.10.20.48:
        10.10.20.21:
        10.10.20.30:
```

_It remains only to perform Play (ansible-playbook -i inventories/hosts.yml ...) Is it really just?_

---

### Perhaps there are a thousand more ways to use this

```bash
echo "Other usage"
```

---

## build

```bash
git clone https://github.com/RootShell-coder/codespaces-node-scan.git .
cd docker
docker build -t node-scan -f docker/Dockerfile .
```
