import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import c from 'classnames'
import './index.scss'

function Index({isPop, onPopClick, children, height}){

  const toggleClick = () => {
    onPopClick()
  }

  return (
    <View className={c("modal-attr-pop", {"hide": !isPop})} style={{height: height}}>
      <View className="header">
        <View className="close" onClick={toggleClick}>关闭</View>
      </View>
      {children}
    </View>
  )
}

export default Index
