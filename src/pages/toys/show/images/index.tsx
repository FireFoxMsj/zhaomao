import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Navigation from '../../../../components/navigation/basic'
import { Tabs, TabsPane } from '../../../../components/tabs'
import Photos from '../../../../components/content/photos'
import './index.scss'
const app = Taro.getApp()
const tabList = [
  { title: '官方图片', value: 'one' },
  { title: '实物图片', value: 'two' },
]
const onePhotos = [
  "https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge",
  "https://oegquov59.qnssl.com/images/20190305/7635c7e79ed19ad7403.jpeg-big",
  "https://oegquov59.qnssl.com/images/20190305/1365c7e79ecc7c18870.jpg-big",
  "https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg"
]
const twoPhotos = [
  "https://oegquov59.qnssl.com/images/20190305/7635c7e79ed19ad7403.jpeg-big",
  "https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge",
  "https://oegquov59.qnssl.com/images/20190305/1365c7e79ecc7c18870.jpg-big",
  "https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg"
]
function Index(){
  const topStyle: object = {
    paddingTop: `${app.globalData.titleBarHeight + app.globalData.statusBarHeight}px`
  }

  const tabOnChange = () => {
  }

  const getList = () => {
  }

  return (
    <View className="page">
      <Navigation barStyle="black"/>
      <View className="body" style={topStyle}>
        <Tabs
          tabList={tabList}
          onChange={tabOnChange}
          layout='left'
          contentStyle={{ backgroundColor: '#fff' }}
        >
          <TabsPane>
            <Photos photos={onePhotos} />
          </TabsPane>
          <TabsPane>
            <Photos photos={twoPhotos} />
          </TabsPane>
        </Tabs>
      </View>
    </View>
  )
}

Index.config = {
  navigationStyle: 'custom',
  navigationBarTextStyle: 'black',
  backgroundColor: "#FFFFFF"
}

export default Index
