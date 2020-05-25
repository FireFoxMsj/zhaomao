import Taro from '@tarojs/taro'

export default {
  get() {
    return new Promise(async (resolve, reject) => {
      let navigation = Taro.getStorageSync('navigation0415')
      if (!!navigation) {
        resolve(navigation)
      } else {
        const res = Taro.getSystemInfoSync()
        const statusHeight = `${res.statusBarHeight}PX`
        const titleHeight = Taro.getMenuButtonBoundingClientRect().bottom + Taro.getMenuButtonBoundingClientRect().top - (res.statusBarHeight*2)
        const naviHeight = Taro.getMenuButtonBoundingClientRect().bottom + Taro.getMenuButtonBoundingClientRect().top - res.statusBarHeight
        const navi = {
          statusHeight: statusHeight,
          titleHeight: `${titleHeight}PX`,
          titleBarHeight: titleHeight,
          naviHeight: naviHeight,
          windowHeight: res.windowHeight,
          screenHeight: res.screenHeight,
          windowWidth: res.windowWidth,
          screenWidth: res.screenWidth
        }
        Taro.setStorageSync('navigation0415', navi)
        resolve(navi)
      }
    })
  }
}


