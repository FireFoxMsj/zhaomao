import Taro from '@tarojs/taro'
import { ScrollView, View, Image, Text } from '@tarojs/components'

import './index.scss'

const ScrollViewColCard = ({ toys = [] }: any) => {

  return (
    <View className='race-card'>
      {toys.length > 0 &&
        <ScrollView
          className='scroll-view'
          scrollX={true}
          scrollWithAnimation
          scrollLeft={0}
        >
          <View className='race-container'>
            {toys.map((toy: any) => (
              <View key={toy.id} className='race-card-item'>
                <Image className='race-cover' src={toy.cover} />
                <Text className='race-name'>{toy.name}</Text>
                <View className="competition-score-text">{toy.rate}</View>
              </View>
            ))}
          </View>
        </ScrollView>
      }

    </View>
  )
}

export default ScrollViewColCard
