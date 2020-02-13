import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'
import './app.scss'

class App extends Component {
  config: Config = {
    pages: [
      'pages/home/index',
      'pages/toys/show/index',
      'pages/toys/show/images/index',
      'pages/toys/show/info/index',
      'pages/index/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
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
