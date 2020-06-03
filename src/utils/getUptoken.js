import Taro from '@tarojs/taro'
import {callApi} from "./index";

export default {
  qiniuUptoken() {
    return new Promise(async (resolve, reject) => {
      let uptoken = Taro.getStorageSync('qiniuUptoken')
      let expiration = Taro.getStorageSync('qiniuUptokenExpiration')
      let timestamp = Date.parse(new Date())
      if (!!uptoken && expiration > timestamp) {
        resolve(uptoken)
      } else {
        const res = await callApi('qiniuUptoken', {})
        console.log('callApi(\'qiniuUptoken\'', res)
        Taro.setStorageSync('qiniuUptoken', res.qiniu_uptoken.uptoken)
        Taro.setStorageSync('qiniuUptokenExpiration', (timestamp + 3000000))
        resolve(res.qiniu_uptoken.uptoken)
      }
    })
  },
  getgGearHome () {
    return new Promise(async (resolve, reject) => {
      let cache_gearHome = Taro.getStorageSync('cache_gearHome')
      let expiration = Taro.getStorageSync('cache_gearHomeExpiration')
      let timestamp = Date.parse(new Date())
      if (!!cache_gearHome && expiration > timestamp) {
        resolve(gearHome)
      } else {
        let res = await callApi('gearHome')
        Taro.setStorageSync('cache_gearHome',res)
        Taro.setStorageSync('cache_gearHomeExpiration',timestamp+3600)
        resolve(res)
      }
    })
  }
}


