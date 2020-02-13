import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import './index.scss'

interface PhotosProps {
  photos: string[]
}

const PhotosGroup = ({ photos = [] }: PhotosProps) => {
  const previewImg = (url: string) => {
    Taro.previewImage({
      urls: photos,
      current: url
    })
  }

  return (
    <View className='photos-group-container'>
      {photos.map((photo: any, index: number)=>(
          <View
            className='photos-group-content'
            key={`${photo}${index}`}
            onClick={() => previewImg(photo)}>
            <Image className='photos-item' src={photo} lazyLoad mode='aspectFill' />
          </View>
        ))
      }
    </View>
  )
}

export default PhotosGroup
