import Taro, { useState, useEffect, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, Image, Text, Button, ScrollView } from '@tarojs/components'
import { callApi } from '../../utils'
import Navigation from '../../components/navigation/basic'
import IIcon from '../../components/iicon'
import BottomModal from "../../components/bottomModal"
import c from 'classnames'
import './index.scss'

function Index(){
  const router = useRouter()
  const { id } = router.params
  const [ toy, setToy ]: [ any, any ] = useState({})
  const [ commentIsPop, setCommentIsPop ]: [ any, any ] = useState(false)
  const [ isLike, setIsLike ]: [ any, any ] = useState(false)
  const [ likesCount, setLikesCount]: [ any, any ] = useState(0)
  useEffect(()=>{
    getArticle()
  }, [])

  const getArticle = async () => {
    const res = await callApi('article', { id: id })
    const { toy = [] } = res
    setIsLike(toy.likedByMe)
    setLikesCount(toy.count)
    setToy(toy)
  }

  useShareAppMessage(_res => {
    return {
      title: toy.name,
      imageUrl: toy.cover,
      path: `/pages/article/index?id=${toy.id}`
    }
  })
  const onCommentByClick = () => {
    setCommentIsPop(old => !old);
  } 

  const toggleLike = async() => {
    if(isLike) {
      setLikesCount((old) => old - 1)
      setIsLike(false)
      await callApi('unlike', { likableId: toy.id, likableType: "Toy" })
    } else {
      setLikesCount((old) => old + 1)
      setIsLike(true)
      await callApi('like', { likableId: toy.id, likableType: "Toy" })
    }
  }

  return (
    <View className="page">
      <Navigation isLeft={true}/>
      <Image src={toy.cover} mode="widthFix"/>
      <View className="touch-bar">
        <View className="one">
          {toy.name}
          <IIcon icon='iconpinglun_' color={"#FFFFFF"} size='16'/>
          <Text>{toy.play.name}</Text>
        </View>
        <View className="two">
          <View className="item" onClick={onCommentByClick}>
            <IIcon icon='iconpinglun1' color={"#FFFFFF"} size='16'/>
            <Text>评论 {toy.count}</Text>
          </View>
          <View className={c("item", {"active": isLike})} onClick={toggleLike}>
            {!isLike && <IIcon icon='iconzan1' color={"#FFFFFF"} size='16'/>}
            {isLike && <IIcon icon='iconzan2' color={"#d81e06"} size='16'/>}
            <Text>点赞 {likesCount}</Text>
          </View>
          <View className="item">
            <Button openType='share' className='share-wechat-icon'>
              <IIcon icon='iconshare' color={"#FFFFFF"} size='16'/>
              <Text>分享</Text>
            </Button>
          </View>
        </View>
      </View>
      <BottomModal
          isPop={commentIsPop}
          onPopClick={onCommentByClick}
          height="70vh"
        >
        <ScrollView 
          scrollY
          scrollWithAnimation
          style={{height: "62vh", padding: "0 20px"}}>
          <View>敬请期待</View>
        </ScrollView>
      </BottomModal>
    </View>
  )
}

Index.config = {
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white',
}

export default Index
