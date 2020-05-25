import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import c from "classnames"
import './index.scss'

interface ContentProps {
  list: any[]
}

function BannerContent({list}: ContentProps){
  const [current, setCurrent]: [any, any] = useState(0)
  return (
    <View className="banner-swiper-tabs-list">
      <Swiper
        className='swiper-tabs'
        indicatorDots={false}
        previous-margin="20px"
        next-margin="20px"
        circular={true}
        easing-function="linear"
        onChange={e => {
          setCurrent(e.detail.current)
        }}
        >
        {/* {list.map((item: any, index: number) => (
          <SwiperItem key={'I'+index} className={c({"active": current == index})} >
            <Image src="https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge" mode='aspectFill'/>
          </SwiperItem>
        ))} */}
      </Swiper>
    </View>
  )
}

export default BannerContent
