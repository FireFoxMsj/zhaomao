import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import IIcon from '../../components/iicon'
import c from 'classnames'
import './new.scss'

function New({state, manuRefresh}){
  const [ open, setOpen ]: [ any, any ] = useState(false)
  useEffect(() => {
    setOpen(state)
  }, [state])

  const linkToNew = () => {
    Taro.navigateTo({ url: '/packageArticle/pages/new/index' })
  }

  return (
    <View className="new">
      <View className="layer">
      <View className={c("top-container", {
        "hide": false,
        "active": open
      })}>
        <View className="top">
          <View className="top-btn" onClick={() => {manuRefresh()}}>
            <IIcon icon='iconfanhuidingbu' color={"#fec234"} size='18'/>
            <View className="text">刷新</View>
          </View>
        </View>
      </View></View>
      <View className="btn-container" onClick={linkToNew}>
        <View className="btn">投稿</View>
      </View>
    </View>
  )
}

export default New
