import Taro, { useState, useEffect, usePageScroll } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import Addition from '../../../components/containers/addition'
import Navigation from '../../../components/navigation/basic'
import IIcon from '../../../components/iicon'
import ScrollViewColCard from './scrollViewColCard'
import Banner from './banner'
import './index.scss'
const tabs = [
  {title: "评论", value: "review"},
  {title: "关注", value: "follow"}
]
const images = [
  "https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge",
  "https://oegquov59.qnssl.com/images/20190305/7635c7e79ed19ad7403.jpeg-big",
  "https://oegquov59.qnssl.com/images/20190305/1365c7e79ecc7c18870.jpg-big",
  "https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg",
  "https://pic.iranshao.com/photo/image/3a211ea9f34da9136271203669dc67df.jpg",
]

const toys = [
  {
    id: 1,
    cover: "https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge",
    name: "TOYS",
    rate: 5
  },
  {
    id: 1,
    cover: "https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big",
    name: "TOYS",
    rate: 5
  },
  {
    id: 1,
    cover: "https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big",
    name: "TOYS",
    rate: 5
  },
  {
    id: 1,
    cover: "https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big",
    name: "TOYS",
    rate: 5
  },
  {
    id: 1,
    cover: "https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big",
    name: "TOYS",
    rate: 5
  },
  {
    id: 1,
    cover: "https://pic.iranshao.com/photo/image/1aad31b4d508cc034b2ef7380bc1fb16.jpg",
    name: "TOYS",
    rate: 5
  },
  {
    id: 1,
    cover: "https://pic.iranshao.com/photo/image/1aad31b4d508cc034b2ef7380bc1fb16.jpg",
    name: "TOYS",
    rate: 5
  },
  {
    id: 1,
    cover: "https://pic.iranshao.com/photo/image/1aad31b4d508cc034b2ef7380bc1fb16.jpg",
    name: "TOYS",
    rate: 5
  },
  {
    id: 1,
    cover: "https://pic.iranshao.com/photo/image/1aad31b4d508cc034b2ef7380bc1fb16.jpg",
    name: "TOYS",
    rate: 5
  }
]

function Index(){
  const [ scrollTop, setScrollTop ]: [ number, any ] = useState(0)
  const [followed, setFollowed]: [any, any] = useState(true)

  usePageScroll(res => {
    setScrollTop(res.scrollTop)
  })

  const toggleFollow = () => {
    setFollowed(v => !v)
  }

  const toInfo = () => {
    Taro.navigateTo({ url: '/pages/toys/show/info/index' })
  }

  return (
    <View className="page">
      <Navigation scrollTop={scrollTop} />
      <View className="body">
        <Banner images={images}/>
        <View className="content">
          <View className="one">
            <View className="title">
              中原巴 夜宴
            </View>
            <View className="btn">
              {followed && <View className="follow" onClick={toggleFollow}>
                <IIcon icon='iconguanzhu' color='#FFFFFF' size='16'/>
                <Text>关注</Text>
              </View>}
              {!followed && <View className="follow followed" onClick={toggleFollow}>
                <Text>已关注</Text>
              </View>}
            </View>
          </View>
          <View className="two">
            <View className="review-card">
              <View className="score">8.7</View>
              <View className="star">
                <View>
                  <View>模范指数TM</View>
                  <View>模范指数TM</View>
                </View>
              </View>
              <View className="do">
                <View className="frame">赞</View>
                <View className="frame">踩</View>
              </View>
            </View>
          </View>
          <View className="three">
            <View className="head">
              <View className="border-left"/>
              产品简介
            </View>
            <View className="intro">
              s手动阀阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯顿发手动阀手动阀手动阀手动阀阿道夫阿萨德发送到发送到发s手动阀阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯顿发手动阀手动阀手动阀手动阀阿道夫阿萨德发送到发送到发s手动阀阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯顿发手动阀手动阀手动阀发s手动阀阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯顿发手动阀手动阀手动阀手动阀阿道夫阿萨德发送到发送到发s手动阀阿斯 
            </View>
            <View className="product-intro" onClick={toInfo}>
              <View>
                <IIcon icon='iconcanshu1' color='#FFFFFF' size='12'/>
                <Text>产品参数</Text>
              </View>
              <IIcon icon='iconyou' color='#ABAFB2' size='10'/>
            </View>
            <View className="head">
              <View className="border-left"/>
              测评
            </View>
            <View className="review-list">
              <View className="item">
                <View className="text">
                  <View>安抚我番茄味番茄味番茄味番茄味</View>
                  <View className="hint">发斯蒂芬</View>
                </View>
                <View><Image src="https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge" mode='aspectFill'/></View>
              </View>
              <View className="item">
                <View className="text">
                  <View>安抚我番茄味番茄味番茄味番茄味安抚我番茄味番茄味番茄味番茄味安抚我番茄味番茄味番茄味番茄味安抚我番茄味番茄味番茄味番茄味</View>
                  <View className="hint">发斯蒂芬</View>
                </View>
                <View><Image src="https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big" mode='aspectFill'/></View>
              </View>
              <View className="item">
                <View className="text">
                  <View>安抚我番茄味番茄味番茄味番茄味</View>
                  <View className="hint">发斯蒂芬</View>
                </View>
                <View><Image src="https://oegquov59.qnssl.com/images/20190305/6935c7e79ee35ef0452.jpg-big" mode='aspectFill'/></View>
              </View>
            </View>
            <View className="head">
              <View className="border-left"/>
              相关产品
            </View>
            <View className="toys">
              <ScrollViewColCard toys={toys} />
            </View>
          </View>
        </View>
      </View>
      <Addition tabs={tabs} scrollTop={scrollTop}>
        <View>
          按时大声道发斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发声反对按时大声道发斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发声反对按时大声道发斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发声反对按时大声道发斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发声反对按时大声道发斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发声反对按时大声道发斯蒂芬阿斯蒂芬阿斯蒂芬阿萨德发声反对
        </View>
      </Addition>
    </View>
  )
}

Index.config = {
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white'
}

export default Index
