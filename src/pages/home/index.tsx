import Taro, { useState, useEffect, usePageScroll } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Navigation from '../../components/navigation/basic'
import Content from './content'
import ContentList from './contentList'
import './index.scss'
const list = [
  {name: "青春期笨蛋不做兔女郎学姐的梦 樱岛麻衣 晴着ver. ", cover: "https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge"},
  {name: "PULCHRA 未来明Project 未来明 赛车女郎 ver.", cover: "https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge"},
  {name: "Phat! Parfom R EVA新剧场版 式波·明日香·兰格雷 制服Ver.", cover: "https://oegquov59.qnssl.com/images/20191123/2825dd8f1999364f493.jpg-16b9"},
]

const tabs = [
  {title: "精选", value: "0"},
  {title: "冒险", value: "1"},
  {title: "科幻", value: "2"},
  {title: "搞笑", value: "3"},
  {title: "奇幻", value: "4"},
  {title: "儿童", value: "5"}
]

function Index(){
  const [ scrollTop, setScrollTop ]: [ number, any ] = useState(0)
  const [ current, setCurrent ]: [ number, any ] = useState(0)

  useEffect(() => {
    // list.push({name:"222"})
  }, [current])

  usePageScroll(res => {
    setScrollTop(res.scrollTop)
  })

  const changeTab = (v: number) => {
    setCurrent(v)
  }

  return (
    <View className="page">
      <Navigation scrollTop={scrollTop} />
      <View>
        阿阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬斯蒂芬
        阿阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬阿斯蒂芬斯蒂芬
      </View>
      <Content tabs={tabs} changeTab={changeTab} list={list} />
    </View>
  )
}

Index.config = {
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white'
}

export default Index
