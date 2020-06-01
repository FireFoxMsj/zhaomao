import Taro, { useState, useEffect, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { callApi } from '../../utils'
import Navigation from '../../components/navigation/basic'
import ScrollModal from "./scroll"
import './index.scss'

function Index(){
  const router = useRouter()
  const id = router.params.id
  const [ toy, setToy ]: [ any, any ] = useState({})
  const [ relateArticles, setRelateArticles ]: [ any[], any ] = useState([])
  const [ currentToy, setCurrentToy ]: [ any, any ] = useState()
  const [ open, setOpen ]: [ any, any ] = useState(false)

  useEffect(()=>{
    getArticle()
    getRelateArticles()
    getOpen()
  }, [])
 
  const getArticle = async () => {
    const res = await callApi('article', { id: id })
    const { toy = [] } = res
    setToy(toy)
    setCurrentToy(toy)
  }

  const getOpen = async () => {
    const res = await callApi('open', {})
    setOpen(res.open)
  }

  const getRelateArticles = async () => {
    const res = await callApi('relateArticles', { id: id, page: 1 })
    const { toy = [] } = res
    setRelateArticles((old: any[]) => [...old, ...toy.toys])
  }

  const change = async (value: any) => {
    if((relateArticles.length-3) < value) {
      getRelateArticles()
    }
    if(value==0) {
      setCurrentToy(toy)
    } else {
      setCurrentToy(relateArticles[value-1])
    }
  }

  useShareAppMessage(_res => {
    return {
      title: currentToy.name,
      imageUrl: currentToy.cover,
      path: `/pages/article/index?id=${currentToy.id}`
    }
  })

  return (
    <View className="page">
      <Navigation isLeft={true}/>
      <ScrollModal change={change} toy={toy} relateArticles={relateArticles} open={open} />
    </View>
  )
}

Index.config = {
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white',
}

export default Index
