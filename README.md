# Node-scan

[![node-scan](https://github.com/RootShell-coder/codespaces-node-scan/actions/workflows/docker-image.yml/badge.svg)](https://github.com/RootShell-coder/codespaces-node-scan/actions/workflows/docker-image.yml)

`docker run -ti --rm rootshellcoder/node-scan <ip or pool> <port or range>`

example

`docker run -ti --rm rootshellcoder/node-scan 8.8.8.8 53`

`docker run -ti --rm rootshellcoder/node-scan 192.168.0.1-254 22-443`

## .gitlab-ci.yml stage scan

```yml
net_scan:
  stage: scan
  tags:
    - docker-runner
  variables:
    NET: 192.168.100.1-254
    PORT: 23
  only:
    refs:
      - master
  before_script:
    - apk update && apk add bash grep
  script:
    - |+
      rm discovery_ip/nets.txt && touch discovery_ip/nets.txt
      NETS=$(echo $NETWORKS_SCAN | sed "s/\s//g" | sed "s/,/ /g")
      for NET in ${NETS}; do
        RAW=$(docker run -i --rm rootshellcoder/node-scan ${NET} ${PORT})
        IP=$(echo "${RAW}" | grep -Poi '(\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3})' | uniq | sort)
        for i in "${IP}"; do
          echo "${i}" >> discovery_ip/nets.txt
        done
      done
  artifacts:
    expose_as: "artifacts"
    paths: ["discovery_ip"]
    expire_in: 1 day
```
