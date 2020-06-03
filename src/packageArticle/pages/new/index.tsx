import Taro, {useState, useDidShow, getCurrentPages, useRouter} from '@tarojs/taro'
import {View, Image, Text, Textarea} from '@tarojs/components'
import {loginDefaultAvatar, addPhone, qiniu_bucket_domain} from '../../../constants/images'
import {callApi} from "../../../utils"
import qiniu from '../../../utils/getUptoken'
import qiniuUploader from '../../../utils/qiniuUploader'
// import {PhotosGroup} from "../../components/information"
// import Avatar from "../../components/information/userCard/avatar"

import './index.scss'

const Index = () => {
  const [statusesMiddleStyle, setStatusesMiddleStyle]: [string, any] = useState('')
  const [statusesBottomStyle, setStatusesBottomStyle]: [string, any] = useState('display: none;')
  const [tempFilePaths, setTempFilePaths]: [string[], any] = useState([])
  const [textareaValue, setTextareaValue]: [string, any] = useState('')
  const [photoKeys, setPhotoKeys]: [string[], any] = useState([])
  const [miniPhotosUrl, setMiniPhotosUrl]: [string[], any] = useState([])

  const textareaOnFocus = (event: any) => {
    setStatusesBottomStyle(`display: none;`)
    setStatusesMiddleStyle(`margin-bottom: ${event.detail.height}px;`)
  }

  const textareaOnBlur = (event: any) => {
    checkTempFilePaths(tempFilePaths.length)
    setStatusesMiddleStyle(`margin-bottom: 0;`)
    console.log('textareaOnBlur', event.detail.value)
  }

  const addPic = async () => {
    const qiniuUptoken = await qiniu.qiniuUptoken()
    Taro.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: async (res) => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths: string[] = res.tempFilePaths
        // 七牛云上传图片
        await qiniuUpload(tempFilePaths, qiniuUptoken)
        setTempFilePaths(tempFilePaths)
        checkTempFilePaths(tempFilePaths.length)
      }
    })
  }

  const qiniuUpload =(tempFilePaths: string[], qiniuUptoken: string)=>{
    for (let i = 0; i < tempFilePaths.length; i++) {
      qiniuUploader.upload(tempFilePaths[i], (respond) => {
        photoKeys.push(respond.key)
        setPhotoKeys(photoKeys)
        console.log('photoKeys', photoKeys)

        miniPhotosUrl.push(`https://${qiniu_bucket_domain}/${respond.key}`)
        setMiniPhotosUrl(miniPhotosUrl)
        console.log('miniPhotosUrl', miniPhotosUrl)
      }, (error) => {
        console.log('error: ' + error);
      }, {
        region: 'ECN',
        key: 'customFileName.jpg',
        uptoken: qiniuUptoken,
        shouldUseQiniuFileName: true
      }, (res) => {
        console.log('上传进度', res.progress)
        console.log('已经上传的数据长度', res.totalBytesSent)
        console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
      })
    }
  }

  const checkTempFilePaths = (length: number) => {
    if (length > 3) {
      setStatusesBottomStyle(`height: 480rpx;`)
    } else if (length === 0) {
      setStatusesBottomStyle(`display: none;`)
    } else {
      setStatusesBottomStyle(`height: 248rpx;`)
    }
  }

  const publishStatuses = async () => {
    const statuses: {} = {body: textareaValue, photos: photoKeys}
    const res = await callApi('publishStatuses', {status: statuses})
    const result = res.CreateMpStatus
    if (!result.success){
      Taro.showToast({ title: result.errors, icon: 'none', duration: 3000 })
    } else {
      Taro.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 1500,
        success: () => {
          const intervalId = setTimeout(function () {
            let pages = getCurrentPages();
            let beforePage = pages[pages.length - 2];
            console.log('beforePage.data', beforePage.data);
            beforePage.setData({
              listType: 'follow'
            })
            Taro.navigateBack()
          }, 1500)
          return () => clearTimeout(intervalId)
        }
      })
    }
  }

  return (
    <View className='publish-statuses-container'>
      <View className='publish-statuses-content'>
        <View className="body">
          <Textarea autoHeight
            onFocus={(event) => textareaOnFocus(event)}
            onBlur={(event) => textareaOnBlur(event)}
            onInput={(event) => setTextareaValue(event.detail.value)}
            placeholder='写一些你的想法吧...'
            showConfirmBar={false}
            className='textarea'
            placeholderClass='textarea-placeholder'
            maxlength={-1}
            value={''} />
        </View>
      </View>

      <View>
        <View className='publish-statuses-middle' style={statusesMiddleStyle}>
          <View className='publish-btn' onClick={publishStatuses}>发布</View>
          <View className='publish-operate'>
            <View className='publish-operate-btn' onClick={addPic}>
              <View>
                <Image src={addPhone} className='add-pic-icon' />
              </View>
              <Text className='text'>添加图片</Text>
            </View>
          </View>
        </View>

        <View className='publish-statuses-bottom' style={statusesBottomStyle}>
          <View className='publish-statuses-bottom-images'>
            {/* <PhotosGroup photos={miniPhotosUrl} containerStyle={{margin: 0}} /> */}
          </View>
        </View>
      </View>

    </View>
  )
}

Index.config = {
  navigationBarBackgroundColor: '#FFFFFF',
  navigationBarTitleText: '投稿',
  navigationBarTextStyle: 'black',
}

export default Index
