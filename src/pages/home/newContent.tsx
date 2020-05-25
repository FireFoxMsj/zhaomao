import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'
import IIcon from '../../components/iicon'
import './index.scss'

interface ContentProps {
  list: any[]
}

function NewContent({list}: ContentProps){
  return (
    <View className="newer-swiper-list">
      <View className="head">
        <Text>新品日历</Text>
        <View className="more">
          查看更多
          <IIcon icon='iconyou' color='#818181' size='10'/>
        </View>
      </View>
      <Swiper
        className='swiper-tabs'
        indicatorDots={false}
        vertical={true}
        circular={true}
        >
        {/* {list.map((item: any, index: number) => (
          <SwiperItem key={'I'+index}>
            <View className="card">
              <View className="body">
                <View className="text">{item.name}</View>
                <View className="hint">{item.special}</View>
              </View>
              <View className="image">
                <Image src="https://oegquov59.qnssl.com/images/20191120/5305dd54144ba5bb420.jpg-huge" mode='aspectFill'/>
              </View>
            </View>
          </SwiperItem>
        ))} */}
      </Swiper>
    </View>
  )
}

export default NewContent
