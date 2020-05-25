import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import { callApi } from '../../utils'
import {loginDefaultAvatar } from  '../../constants/images'
import IIcon from "../../components/iicon"
import './index.scss'

function Index(){
  const [ logined, setLogined ] : [ any, any ] = useState(true)
  const [ userInfo, setUserInfo ] : [ any, any ] = useState({name: "", avatar: ""})

  useEffect(()=>{
    setLogined(Taro.getStorageSync('logined'))
    getMe()
  }, [])

  const mineMenu = [
    { text: '我的点赞', value: 'mineWallet'},
  ]

  const getMe = async () => {
    const { me = {} } = await callApi('me') 
    if(!!me) {
      setUserInfo({
        name: me.name,
        avatar: me.avatarUrl
      })
    }
  }

  const onGetUserInfo = async (info: any) => {
    const { detail = {} } = info
    const { bindUser } = await callApi('weixinUserInfo', {
      user_info: detail.encryptedData,
      iv: detail.iv,
    })
    if(bindUser.success) {
      Taro.setStorageSync('logined', true)
      setLogined(true)
      getMe()
    }
  }

  const linkToFollowerList = (type: number) => {
    Taro.navigateTo({ url: `/pages/followerList/index?type=${type}&id=` })
  }

  const itemMenuClick = (value: string) => {
    Taro.navigateTo({ url: `/packageMine/pages/${value}/index` })
  }
  
  return (
    <View className="page">
     {!logined && <View className="login">
        <View>
          <View className="bg">
            <Image src="https://pic.ocexam.cn/%E6%98%9F%E7%90%83.png" mode="widthFix"/>
          </View>
          <View className="hint">登录后可查看“我的”页面</View>
          <Button className='btn' openType='getUserInfo' onGetUserInfo={ onGetUserInfo } >
            登录
          </Button>
        </View>
      </View>}
      {logined && <View className="mine">
          <View className='mine-top-container'>
          <View className='avatar-block'>
            <View className='avatar-img-view'>
              <Button className='avatar-img-btn' openType='getUserInfo'
                      onGetUserInfo={ onGetUserInfo }>
                <Image src={ userInfo.avatar || loginDefaultAvatar } className='avatar-img'/>
              </Button>
              <View className='nickname-and-des'>
                <Text className='username-text'>{ userInfo.name || '未命名' }</Text>
                <Text className='description'>这家伙很懒，什么都没留下</Text>
              </View>
            </View>
          </View>

          <View className='follow-block'>
            <View className='follow followed' onClick={() => linkToFollowerList(1)}>
              <Text>{80}</Text>
              <Text className='follow-block-text'>我关注的</Text>
            </View>
            <View className='follow-block-l' />
            <View className='follow follow-me' onClick={() => linkToFollowerList(2)}>
              <Text>{70}</Text>
              <Text className='follow-block-text'>关注我的</Text>
            </View>
          </View>
          <View className='mine-bottom-container'>
            <View className="mine-bottom-menu">
              {mineMenu.map((menu: any) => (
                <View className='menu-item' key={menu.value} onClick={() => itemMenuClick(menu.value)}>
                  <Text>{menu.text}</Text>
                  <View style='padding-right:41rpx'>
                    <IIcon icon='iconyou' color='#BEBEBE' size={10}/>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>}
    </View>
  )
}

Index.config = {
  navigationBarTextStyle: 'black',
  enablePullDownRefresh: true,
  backgroundTextStyle: "light",
  backgroundColor: '#f5f5f7',
  navigationBarBackgroundColor: '#fec234',
  navigationBarTitleText: '我的'
}

export default Index
