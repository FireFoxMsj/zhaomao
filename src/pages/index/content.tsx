import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './content.scss'
import Card from './item'
interface ContentProps {
  list: any[],
  isRefresh: boolean
}

function Content({list = [], isRefresh = false}: ContentProps){
  const [leftList, setLeftList]: [any[], any] = useState([])
  const [rightList, setRightList]: [any[], any] = useState([])

  const [leftHeight, setLeftHeight]: [any, any] = useState(0)
  const [rightHeight, setRightHeight]: [any, any] = useState(0)
  useEffect(() => {
    if(isRefresh) {
      setLeftList([])
      setRightList([])
    }
  }, [isRefresh])

  useEffect(() => {
    const query = Taro.createSelectorQuery().in(this.$scope)
    setTimeout(function(){
      query.select("#left-container").boundingClientRect((rect: any) => {
        setLeftHeight(rect.height)
      }).select("#right-container").boundingClientRect((rect: any) => {
        setRightHeight(rect.height)
      }).exec()
    }, 1000)
    loadList()
  }, [list])

  const loadList = () => {
    const tmpLeftList = list.filter((c: any, i: number) => i % 2 !== 0)
    const tmpRightList = list.filter((c: any, i: number) => i % 2 == 0)
    if(leftHeight > rightHeight) {
      setLeftList((oldList: any[]) => [...oldList, ...tmpLeftList])
      setRightList((oldList: any[]) => [...oldList, ...tmpRightList])
    } else {
      setRightList((oldList: any[]) => [...oldList, ...tmpLeftList])
      setLeftList((oldList: any[]) => [...oldList, ...tmpRightList])
    }
  }

  return (
    <View className="list">
      <View className="list-container">
        <View className="list-cards">
          <View className="left-container" id="left-container">
            {leftList.map((itemB: any, indexJ: number) => (
              <Card item={itemB} key={'J' + indexJ}/>
            ))}
          </View>
          <View className="right-container" id="right-container">
            {rightList.map((itemC: any, indexJ: number) => (
              <Card item={itemC} key={'J2' + indexJ}/>
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

export default Content
