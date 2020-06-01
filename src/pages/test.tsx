import Taro, {useState, useEffect} from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './test.scss'
import c from 'classnames'
const totalnum = 3
function Index({children}){
  const [ scrollindex, setScrollindex ]: [ any, any ] = useState(0)
  const [ starty, setStarty ]: [ any, any ] = useState(0)
  const [ endy, setEndy ]: [ any, any ] = useState(0)
  const [ margintop, setMargintop ]: [ any, any ] = useState(0)

  const scrollTouchstart = (e) => {
    setStarty(e.touches[0].pageY)
  }
  const scrollTouchmove = (e) => {
    let py = e.touches[0].pageY;
    setEndy(py)
    if(py-starty<100 && py-starty>-100){  
      setMargintop(py - starty)
    }
  }
  const scrollTouchend = (e) => {
    if(endy-starty >100 && scrollindex>0){
      setScrollindex(scrollindex-1)
    }else if(endy-starty <-100 && scrollindex<totalnum-1){
      setScrollindex(scrollindex+1)
    }else if(endy-starty >100 && scrollindex==0){
      setScrollindex(2)
    }else if(endy-starty <-100 && scrollindex==totalnum-1) {
      setScrollindex(0)
    }
    setStarty(0)
    setEndy(0)
    setMargintop(0)
  }
  return (
    <View className="container container-fill">
      <View className="scroll-fullpage" onTouchStart={scrollTouchstart} onTouchMove={scrollTouchmove} onTouchEnd={scrollTouchend} style={{transform: `translateY(-${scrollindex*100}%)`, marginTop: `${margintop}px`}}>
        <View className={c("section section01", {active: scrollindex==0})}>
          <Text className="section-maintitle">0</Text>
        </View>
        <View className={c("section section02", {active: scrollindex==1})}>
          <Text className="section-maintitle">1</Text>
        </View>
        <View className={c("section section03", {active: scrollindex==2})}>
          <Text className="section-maintitle">2</Text>
        </View>
      </View>
    </View> 
  )
}

export default Index
