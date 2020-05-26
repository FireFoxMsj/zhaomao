import Taro, {useState, useEffect} from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './item.scss'
import IIcon from '../../components/iicon'
function Item(item: any){
  const [ele, setEle]: [any, any] = useState({})
  useEffect(() => {
    setEle(item.item)
  }, [item])
  
  return (
    <View className="card" onClick={()=>{
      Taro.navigateTo({url: `/pages/article/index?id=${ele.id}`})
    }}>
      <View>
        {ele.cover && <Image src={`${ele.cover}!sm`} mode='widthFix' className="image"/>}
      </View>
      {!!ele.name && <View className="desc">
        {ele.name}
      </View>}
      <View className='card-bottom'>
        <View className='card-author'>
          <Image className='author-image' src={ele.play.avatarUrl} />
          <Text className='author-name'>{ele.play.name}</Text>
        </View>
        <View className='card-praise'>
          <IIcon icon='iconzan1' color={"#747474"} size='12'/>
          {false && <IIcon icon='iconzan2' color={"#FEC234"} size='14'/>}
          <Text className='praise-number'>{ele.count || 0}</Text>
        </View>
      </View>
    </View>
  )
}

export default Item
