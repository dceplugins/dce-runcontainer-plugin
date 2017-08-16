import storage from '../config/localstorage';
import yaml from 'js-yaml'
import { merge, cloneDeep } from 'lodash'

function genSpec(c) {
  let spec = {
    "Hostname": c.hostname,
    "AttachStdin": false,
    "AttachStdout": false,
    "AttachStderr": false,
    "ExposedPorts": {},
    "Tty": false,
    "OpenStdin": false,
    "StdinOnce": false,
    "Env": [],
    "Cmd": null,
    "Image": c.image,
    "Volumes": {},
    "WorkingDir": "",
    "Entrypoint": null,
    "OnBuild": null,
    "Labels": {
      "io.daocloud.dce.authz.owner": storage.userName,
      "io.daocloud.dce.authz.tenant": storage.tenant
    },
    "HostConfig": {
      "Binds": [],
      "LogConfig": {
        "Type": "json-file",
        "Config": {
          "max-file": "2",
          "max-size": "100m"
        }
      },
      "NetworkMode": c.network,
      "RestartPolicy": {
        "Name": "",
        "MaximumRetryCount": 0
      },
      "AutoRemove": false,
      "VolumeDriver": "",
      "VolumesFrom": null,
      "CapAdd": c.cap_add ? c.cap_add.split(',') : [],
      "Dns": [],
      "DnsOptions": [],
      "DnsSearch": [],
      "ExtraHosts": null,
      "GroupAdd": null,
      "IpcMode": "",
      "Cgroup": "",
      "Links": null,
      "OomScoreAdj": 0,
      "PidMode": "",
      "Privileged": false,
      "PublishAllPorts": false,
      "ReadonlyRootfs": false,
      "SecurityOpt": null,
      "UTSMode": "",
      "UsernsMode": "",
      "ShmSize": 0,
      "ConsoleSize": [0, 0],
      "Isolation": "",
      "CpuShares": 0,
      "Memory": 0,
      "NanoCpus": 0,
      "CgroupParent": "",
      "BlkioWeight": 0,
      "BlkioWeightDevice": null,
      "BlkioDeviceReadBps": null,
      "BlkioDeviceWriteBps": null,
      "BlkioDeviceReadIOps": null,
      "BlkioDeviceWriteIOps": null,
      "CpuPeriod": 0,
      "CpuQuota": 0,
      "CpuRealtimePeriod": 0,
      "CpuRealtimeRuntime": 0,
      "CpusetCpus": "",
      "CpusetMems": "",
      "Devices": [],
      "DeviceCgroupRules": null,
      "DiskQuota": 0,
      "KernelMemory": 0,
      "MemoryReservation": 0,
      "MemorySwap": 0,
      "MemorySwappiness": -1,
      "OomKillDisable": false,
      "PidsLimit": 0,
      "Ulimits": null,
      "CpuCount": 0,
      "CpuPercent": 0,
      "IOMaximumIOps": 0,
      "IOMaximumBandwidth": 0
    },
    "NetworkingConfig": {
      "EndpointsConfig": {}
    }
  }
  spec.NetworkingConfig.EndpointsConfig[c.network] = c.ip? {
    "IPAMConfig": {
      "IPv4Address": c.ip,
    }
  } : {};
  return spec;
}

function parseYaml(s) {
  return yaml.safeLoad(s);
}

function mergeSpecs(a, b) {
  let tmp = cloneDeep(a);
  merge(tmp, b);
  return tmp;
}


export {
  genSpec,
  parseYaml,
  mergeSpecs
}
