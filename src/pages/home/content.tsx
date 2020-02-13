import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Swiper, SwiperItem, ScrollView, Image } from '@tarojs/components'
import c from 'classnames'
import {loading} from '../../constants/images'
import './index.scss'

interface ContentProps {
  tabs: tabProp[],
  changeTab: any,
  list: any[]
}
interface tabProp {
  title: string,
  value: string
}

function Content({tabs = [], changeTab, list}: ContentProps){
  const [current, setCurrent]: [any, any] = useState(0)
  const [switchList, setSwitchList]: [any[], any] = useState([])
  const containerStyle: any = {
    height: '83vh'
  }

  useEffect(() => {
    switchChange(current)
  }, [current])

  const handleClick = (v: any) => {
    setCurrent(v)
    changeTab(v)
    switchChange(v)
  }

  const switchChange = (v: number) => {
    const rs: Array<any>[] = []
    for (let i = 0; i < tabs.length; i++) {
      if(i == v) {
        rs.push(list)
      } else {
        rs.push([])
      }
    }
    setSwitchList(rs)
  }

  const tabItems = tabs.map((tab: any, index: number) => {
    const itemCls = c({
      'tab-item tab-item-class': true,
      'tab-active tab-active-class': current === index
    })
    return (
      <View
        key={'T'+index}
        className={itemCls}
        id={`tab${index}`}
        onClick={() => handleClick(index)}
      >
        <View className='tab-title'>
          <View>{tab.title}</View>
        </View>
      </View>
    )
  })

  const renderContentItem = (ele: any) => {
    return (
      <View className="card">
        <View>
          <Image src="https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge" mode='aspectFill'/>
        </View>
        <View className="text">
          <View>安抚我番茄味番茄味番茄味番茄味</View>
          <View className="hint">发斯蒂芬</View>
        </View>
      </View>
    )
  }

  return (
    <View className="swiper-tabs-list">
      <ScrollView
          className='tab-container'
          scrollX
          scrollWithAnimation
          scrollIntoView={`tab${current}`}
        >
        {tabItems}
      </ScrollView>
      <Swiper
        className='swiper-tabs'
        style={containerStyle}
        indicatorDots={false}
        current={current}
        onChange={(e)=>{
          setCurrent(e.detail.current)
          changeTab(e.detail.current)
        }}
        >
        {switchList.map((item: any, index: number) => (
          <SwiperItem key={'I'+index}>
            {item.length>0 && item.map((itemB: any) => (
              <View>{renderContentItem(itemB)}</View>
            ))}
            {item.length == 0 && <View className="loading"><Image src={loading}/></View>}
          </SwiperItem>
        ))}
      </Swiper>
    </View>
  )
}

export default Content
