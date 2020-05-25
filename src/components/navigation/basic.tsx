import { useEffect, useState } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import c from 'classnames'
import IIcon from "../iicon"
import {logo} from "../../constants/images"
import './basic.scss'

const app = Taro.getApp()

const Basic = ({ barStyle = Basic.defaultProps.barStyle, style = Basic.defaultProps.style, isLeft = true }) => {

  const [navigationStyle, setNavigationStyle]: [any, any] = useState({})

  useEffect(() => {
    setNavigationStyle({
      height: `${app.globalData.titleBarHeight + app.globalData.statusBarHeight}px`,
      background: style.background
    })
  }, [app])

  const back = () => {
    Taro.navigateBack({ delta: 1 })
  }

  return (
    <View className="navigation">
      <View className={c("navigation-sample", {"black": barStyle=="black"})} style={navigationStyle}>
        {isLeft && <View className="left">
          <View className="back" onClick={() => {back()}}>
            <IIcon icon='iconleft1' color={barStyle=="black" ? "#222222" : "#FFFFFF"} size='16'/>
          </View>
          <View className="br" />
          <View className="home">
            <IIcon icon='iconHomehomepagemenu' color={barStyle=="black" ? "#222222" : "#FFFFFF"} size='18'/>
          </View>
        </View>}
        {!isLeft && <View className="left2">
          <Image src={logo} className="logo"/>
          <View className="slogan">再无聊的时光也都是限量版</View>
        </View>}
      </View>
    </View>
  )
}

Basic.defaultProps = {
  style: {
    background: "transparents"
  }
}

export default Basic
