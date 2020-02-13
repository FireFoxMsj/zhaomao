import Taro, { useState } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import IIcon from '../../../../components/iicon'
import c from 'classnames'
import './index.scss'

const Banner = ({ images = []}: any) => {
  const [current, setCurrent]: [any, any] = useState(0)
  const [isTo, setIsTo]: [any, any] = useState(true)

  return (
    <View className="banner-container">
      <Swiper
      className='banner'
      indicatorActiveColor='#333'
      indicatorDots={false}
      onTransition={(res) => {
        if(current == 3 && res.detail.dx > 80 && isTo) {
          setIsTo(false)
          Taro.navigateTo({ url: '/pages/toys/show/images/index' })
        }
        if(res.detail.dx == 0) {
          setIsTo(true)
        }
      }}
      onAnimationFinish={(res) => {
        setCurrent(res.detail.current)
      }}
      >
        {images.slice(0,4).map((image: any, index: number) => (
          <SwiperItem key={index}>
            <View key={index} className='image-item'>
              <Image src={image} mode='aspectFill'/>
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <View className="box-shadow-top"/>
      <View className="dots">
        {images.slice(0,4).map((image: any, index: number) => (
          <View key={index} className={c('image-sm', {'active': index==current})}>
            <Image src={image} mode='aspectFill'/>
          </View>
        ))}
        <View className="hint">
          {images.length}张
          <IIcon icon='iconjiantou' color='#FFFFFF' size='12'/>
        </View>
      </View>
    </View>
  )
}

export default Banner
