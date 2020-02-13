import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import IIcon from "../iicon"
import './index.scss'

interface NavigationProps {
  scrollTop: number
  styleAttr?: StyleAttr
  children?: any
}
interface StyleAttr {
  background?: string
  backColor?: string
  titleFontSize?: number
}

const app = Taro.getApp()

const Navigation = ({ scrollTop, styleAttr = Navigation.defaultProps.styleAttr, children }: NavigationProps) => {

  const [ active, setActive ] = useState()
  const navigationStyle: any = {height: `${app.globalData.titleBarHeight + app.globalData.statusBarHeight}px`}
  const customNavigationStyle: any = {
    height: `${app.globalData.titleBarHeight + app.globalData.statusBarHeight}px`,
    background: styleAttr.background
  }

  useEffect(() => {
    if(scrollTop > 200) {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [ scrollTop ])

  const back = () => {
    Taro.navigateBack({ delta: 1 })
  }

  return (
    <View className="navigation">
      {!active && <View className="navigation-sample" style={navigationStyle}>
        <View className="left">
          <View className="back" onClick={() => {back()}}>
            <IIcon icon='iconleft1' color='#FFFFFF' size='16' />
          </View>
        </View>
      </View>}
      {active && <View className="navigation-normal" style={customNavigationStyle}>
        <View className="left">
          <View className="back" onClick={() => {back()}}>
            <IIcon icon='iconleft1' color='#FFFFFF' size='16' />
          </View>
          {children}
        </View>
      </View>}
    </View>
  )
}

Navigation.defaultProps = {
  scrollTop: 0,
  styleAttr: {
    background : "#FFFFFF",
    backColor : "#FFFFFF",
    titleFontSize: 37
  }
}

export default Navigation
