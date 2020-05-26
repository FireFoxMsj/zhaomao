import Taro, { useState, useEffect, usePullDownRefresh, useReachBottom,  useShareAppMessage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { callApi } from '../../utils'
import Content from "./content"
import {logo} from "../../constants/images"
import './index.scss'

function Index(){
  const [ list, setList ]: [any[], any] = useState([])
  const [ haveNextPage, setHaveNextPage ] = useState(true)
  const [ pageId, setPageId ] = useState(1)
  const [ moreLoading, setMoreLoading ] = useState(true)
  const [ isRefresh, setIsRefresh ] = useState(false)

  useEffect(() => {
    getList(pageId)
  }, [pageId])

  useEffect(() => {
    if(isRefresh) {
      if(pageId == 1) {
        getList(1)
      } else {
        setPageId(1)
      }
    }
  }, [isRefresh])

  usePullDownRefresh(() => {
    setIsRefresh(true)
  })

  useReachBottom(() => {
    loadMore()
  })

  const loadMore = () => {
    if (moreLoading && haveNextPage) {
      setPageId((oldPageId) => oldPageId + 1)
    }
  }

  const getList = async (pageId: number) => {
    if(pageId>0) {
      setMoreLoading(false)
      const res = await callApi('list', { page: pageId })
      const { toys = [] } = res
      setList(toys)
      setHaveNextPage(toys.length >= 9)
      setMoreLoading(true)
      if(isRefresh) {
        Taro.stopPullDownRefresh()
        setIsRefresh(false)
      }
    }
  }

  useShareAppMessage(_res => {
    return {
      title: '话虎-再无聊的时光都是也都是限量版',
      imageUrl: logo,
      path: '/pages/index/index'
    }
  })
  
  return (
    <View className="page">
      <Content list={list} isRefresh={isRefresh}/>
    </View>
  )
}

Index.config = {
  navigationBarTextStyle: 'black',
  enablePullDownRefresh: true,
  backgroundTextStyle: "dark",
  onReachBottomDistance: 100,
  backgroundColor: '#f5f5f7',
  navigationBarTitleText: '話虎',
  navigationBarBackgroundColor: '#fec234',
}

export default Index
