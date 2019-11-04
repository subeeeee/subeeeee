  function getLocalIP() {
  const os = require('os');
  const osType = os.type(); //系统类型
  const netInfo = os.networkInterfaces(); //网络信息
  let ip = '';
  if (osType === 'Windows_NT') {
    console.log(netInfo)
    for (let dev in netInfo) {
      //win7的网络信息中显示为本地连接，win10显示为以太网
      if (dev === '本地连接' || dev === '以太网' || dev === 'WLAN') {
        for (let j = 0; j < netInfo[dev].length; j++) {
          if (netInfo[dev][j].family === 'IPv4') {
            ip = netInfo[dev][j].address;
            break;
          }
        }
      }
    }

  } else if (osType === 'Linux') {
    ip = netInfo.eth0[0].address;
  }
  return ip;
}
exports.localIP = getLocalIP()