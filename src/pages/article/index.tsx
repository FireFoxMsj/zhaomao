import Taro, { useState, useEffect, useRouter, useShareAppMessage } from '@tarojs/taro'
import { View, Image, Text, Button, ScrollView, Input } from '@tarojs/components'
import { callApi } from '../../utils'
import Navigation from '../../components/navigation/basic'
import IIcon from '../../components/iicon'
import BottomModal from "../../components/bottomModal"
import InputModal from "../../components/inputMocal"
import c from 'classnames'
import './index.scss'

function Index(){
  const router = useRouter()
  const { id } = router.params
  const [ toy, setToy ]: [ any, any ] = useState({})
  const [ commentIsPop, setCommentIsPop ]: [ any, any ] = useState(false)
  const [ isLike, setIsLike ]: [ any, any ] = useState(false)
  const [ likesCount, setLikesCount ]: [ any, any ] = useState(0)
  const [ repliesCount, setRepliesCount ]: [ any, any ] = useState(0)
  const [ replyPageId, setReplyPageId ]: [ any, any ] = useState(1)
  const [ replyList, setReplyList ]: [ any, any ] = useState([])
  const [ openModal, setOpenModal ]: [ any, any ] = useState(false)
  const [ replyComment, setReplyComment ]: [ any, any ] = useState(null)
  const [ scrollTop, setScrollTop ]: [ any, any ] = useState(0)
  const [ moreLoading, setMoreLoading ]: [ any, any ] = useState(false)

  useEffect(()=>{
    getArticle()
    getReplies(true)
  }, [])

  const getArticle = async () => {
    const res = await callApi('article', { id: id })
    const { toy = [] } = res
    setIsLike(toy.likedByMe)
    setLikesCount(toy.count)
    setToy(toy)
    setRepliesCount(toy.repliesCount)
  }

  const getReplies = async (refresh = false) => {
    let pageId = replyPageId
    if(refresh) {
      pageId = 1
    } else {
      pageId = pageId + 1
    }
    const res = await callApi('replies', { id: id, page: pageId })
    const { toy = {} } = res
    setReplyPageId(pageId)
    if(refresh) {
      setReplyList(toy.replies)
    } else {
      setReplyList((old: any[]) => [...old, ...toy.replies])
    }
    if(!!toy.replies && toy.replies.length >= 10) {
      setMoreLoading(true)
    } else {
      setMoreLoading(false)
    }
  }

  useShareAppMessage(_res => {
    return {
      title: toy.name,
      imageUrl: toy.cover,
      path: `/pages/article/index?id=${toy.id}`
    }
  })

  const onCommentByClick = () => {
    setCommentIsPop(old => !old)
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

  const openInput = () => {
    setReplyComment(null)
    setOpenModal(true)
  }

  const closeInputModal = () => {
    setOpenModal(false)
  }

  const deleteOnReply = async (id: any) => {
    const res = await callApi('deleteReply', {
      id: id
    })
    const { deleteReply = {} } = res
    if(deleteReply.success){
      setReplyList(
        replyList.filter(item => item.id !== id)
      )
      setRepliesCount((old) => old - 1)
    }
  }

  const comment = async (value: any) => {
    await callApi('createReply', {
      repliable_id: toy.id,
      repliable_type: "Toy",
      body: value,
      reply_to_id: (replyComment && replyComment.id) || null,
    })
    setOpenModal(false)
    getReplies(true)
    setScrollTop((old) => old == 0 ? 1 : 0)
    setRepliesCount((old) => old + 1)
  }

  const handleScrollToLower = () => {
    if (moreLoading) {
      getReplies()
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
            <Text>评论 {repliesCount}</Text>
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
      {openModal &&
        <InputModal
          isOpened={openModal}
          comment={comment}
          user={replyComment && replyComment.user}
          closeInputModal={closeInputModal}
        />
      }
      <BottomModal
          isPop={commentIsPop}
          onPopClick={onCommentByClick}
          height="70vh"
        >
        <ScrollView 
          scrollY
          scrollWithAnimation
          style={{height: "62vh"}}
          scrollTop={scrollTop}
          lowerThreshold={100}
          onScrollToLower={handleScrollToLower}
          >
          <View className="reply-container">
            <View></View>
            {replyList.map((item: any, index: number) => (
              <View className="reply-card" key={'I' + index}>
                <View className="one">
                  <View className="avatar">
                    <Image src={item.user.avatarUrl}/>
                  </View>
                  <View className="user">
                    <View className="name">{item.user.name}</View>
                    <View className="time">{item.date}</View>
                  </View>
                </View>
               {!!item.replyTo && <View className="two"><View className="name">@{item.replyTo.name}</View> {item.replyTo.body}</View>}
                <View className="three">{item.body}</View>
                <View className="four">
                  <View className="btn" onClick={() => {
                    deleteOnReply(item.id)
                  }}>删除</View>
                  <View className="btn" onClick={() => {
                    setReplyComment(item)
                    setOpenModal(true)
                  }}>回复</View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
        <View className="reply" onClick={openInput}>
          <Input
              className='footer-input'
              placeholder='写回复...'
              confirmType='send'
              placeholderClass='input-placeholder'
              disabled
            />
        </View>
      </BottomModal>
    </View>
  )
}

Index.config = {
  navigationStyle: 'custom',
  navigationBarTextStyle: 'white',
}

export default Index
