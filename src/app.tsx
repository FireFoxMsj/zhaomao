import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'

class App extends Component {
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/article/index',
      'pages/mine/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#dbdbdb',
      selectedColor: '#222222',
      position: 'bottom',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: './assets/images/home.png',
          selectedIconPath: './assets/images/homea.png'
        },{
          pagePath: 'pages/mine/index',
          text: '我的',
          iconPath: './assets/images/me.png',
          selectedIconPath: './assets/images/mea.png'
        }
      ]
    }, subPackages: [
      {
        root: 'packageArticle',
        pages: [
          'pages/new/index',
        ]
      }
    ]
  }

  globalData = {
    statusBarHeight: 20,
    titleBarHeight: 44,
    windowHeight: 800
  }

  componentDidMount () {
    const that = this
    Taro.getSystemInfo({
      success: function (res) {
        that.globalData.statusBarHeight = res.statusBarHeight
        that.globalData.titleBarHeight = Taro.getMenuButtonBoundingClientRect().bottom + Taro.getMenuButtonBoundingClientRect().top - (res.statusBarHeight * 2)
        that.globalData.windowHeight = res.windowHeight
      }
    })
  }

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
