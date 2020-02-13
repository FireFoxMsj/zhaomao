import Taro, { useState, useEffect } from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import classnames from "classnames"
import Tabs from "./tabs"
import IIcon from "../../../components/iicon"

import './index.scss'
const app = Taro.getApp()
interface VariousListProps {
  children?: any,
  scrollTop: number,
  tabs?: any,
}

const Index = ({tabs, children, scrollTop}: VariousListProps) => {
  const variousListHeight: number = app.globalData.windowHeight - app.globalData.titleBarHeight - app.globalData.statusBarHeight
  const variousListStyle: {} = {height: `${variousListHeight}px`, position: 'relative'}
  const [ state, setState ]: [ any, any ] = useState("normal")
  const [ height, setHeight ]: [ number, any ] = useState(0)

  useEffect(()=>{
    queryBodyHeight()
  }, [])

  useEffect(() => {
    if(((height - variousListHeight) > (app.globalData.windowHeight+200)) && (height - scrollTop > variousListHeight*2)){
      setState("bottom")
    }else {
      setState("top")
    }
  }, [ scrollTop, height ])

  const togglePosition = () => {
    if(state=="top") {
      setState("bottom")
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    } else {
      setState("top")
      Taro.pageScrollTo({
        scrollTop: 100000,
        duration: 300
      })
    }
  }

  const queryBodyHeight = () =>{
    const query = Taro.createSelectorQuery()
    query.select('.page').boundingClientRect().exec(function (res) {
      setHeight(res[0] && (res[0].height))
    })
  }

  return (
    <View className="various-list-container" style={variousListStyle}>
      <View className={
        classnames("various-list-view", 
          {"fixed": state == "bottom", "absoluted": state == "top"}
        )} >
        <View className="header">
          {(height - variousListHeight) > (app.globalData.windowHeight+200) && <View className="addition-holder" onClick={togglePosition}>
            {state == "bottom" && <IIcon icon='iconzhankai' color='#BEBEBE' size='10' />}
            {state == "top" && <IIcon icon='iconzhankai9' color='#BEBEBE' size='10' />}
          </View>}
          <View className="content">
            <Tabs tabList={tabs}
              layout='left' 
              tab-item-class='operation-tab-item-class' segment-one-line-class='operation-segment-one-line-class'
            />
            <View className="share"><IIcon icon="iconshare" color="#222222" size="14"/><Text>分享</Text></View>
          </View>
        </View>
        <View className={classnames({"hidden":  state == "bottom"})}>
          {children}
        </View>
      </View>
    </View>
  )
}

export default Index
