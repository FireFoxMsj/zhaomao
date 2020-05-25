import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import {logo} from '../../constants/images'
import IIcon from '../../components/iicon'
import './index.scss'
const app = Taro.getApp()
interface ContentProps {
  list: any[]
}

function Search({}: ContentProps){
  const navigationStyle: any = {
    paddingTop: `${app.globalData.statusBarHeight}px`
  }
  return (
    <View className="search">
      <View className="body" style={navigationStyle}>
        <View className="one"><Image src={logo} /></View>
        <View className="two">
          <View className="search-input">
            <IIcon icon='iconchakan' color='#F8B68E' size='12'/>
            <Text>搜索你喜欢的作品</Text>
          </View>
        </View>
      </View>
      <View className="pure-top" />
    </View>
  )
}

export default Search
