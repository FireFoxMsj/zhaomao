import Taro, { useState } from '@tarojs/taro'
import { View } from '@tarojs/components'

function ContentList({list}){
  return (
    <View>
      {list.map((item: any, index: number) => (
        <View>{item.name}</View>
      ))}
    </View>
  )
}
export default ContentList
