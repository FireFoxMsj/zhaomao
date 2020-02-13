import { View } from '@tarojs/components'
import c from 'classnames'
import IIcon from "../iicon"
import './basic.scss'

const app = Taro.getApp()

const Basic = ({ barStyle = Basic.defaultProps.barStyle, style = Basic.defaultProps.style }) => {

  const navigationStyle: any = {
    height: `${app.globalData.titleBarHeight + app.globalData.statusBarHeight}px`,
    background: style.background
  }
  const back = () => {
    Taro.navigateBack({ delta: 1 })
  }

  return (
    <View className="navigation">
      <View className={c("navigation-sample", {"black": barStyle=="black"})} style={navigationStyle}>
        <View className="left">
          <View className="back" onClick={() => {back()}}>
            <IIcon icon='iconleft1' color={barStyle=="black" ? "#222222" : "#FFFFFF"} size='16'/>
          </View>
          <View className="br" />
          <View className="home">
            <IIcon icon='iconHomehomepagemenu' color={barStyle=="black" ? "#222222" : "#FFFFFF"} size='18'/>
          </View>
        </View>
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
