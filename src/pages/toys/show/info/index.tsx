import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Navigation from '../../../../components/navigation/basic'
import './index.scss'
const app = Taro.getApp()

function Index(){
  const topStyle: object = {
    paddingTop: `${app.globalData.titleBarHeight + app.globalData.statusBarHeight}px`
  }

  return (
    <View className="page">
      <Navigation style={{background: '#151214'}}/>
      <View className="body" style={topStyle}>
        <View className="title">参数</View>
        <View className="card">
          <View className="head">原名</View>
          <Text>路飞 Ver.2</Text>
        </View>
        <View className="card">
          <View className="head">角色</View>
          <Text>路飞</Text>
        </View>
        <View className="card">
          <View className="head">官方价格</View>
          <Text>9250 日元</Text>
        </View>
        <View className="card">
          <View className="head">属性</View>
          <Text>PVC涂装完成品男性</Text>
        </View>
        <View className="card">
          <View className="head">尺寸</View>
          <Text>20cm</Text>
        </View>
        <View className="card">
          <View className="head">系列</View>
          <Text>海贼王POP</Text>
        </View>
        <View className="card">
          <View className="head">发售时间</View>
          <Text>2016年4月</Text>
        </View>
      </View>
    </View>
  )
}

Index.config = {
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white',
  backgroundColor: "#151214"
}

export default Index
