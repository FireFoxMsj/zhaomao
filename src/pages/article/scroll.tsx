import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import c from 'classnames'
import Content from './content'
import './scroll.scss'

function Scroll({change, toy, relateArticles, open}){
  const [ scrollindex, setScrollindex ]: [ any, any ] = useState(0)
  const [ starty, setStarty ]: [ any, any ] = useState(0)
  const [ margintop, setMargintop ]: [ any, any ] = useState(0)
  const [ init, setInit ]: [ any, any ] = useState(false)
  const [ totalnum, setTotalnum ]: [ any, any ] = useState(0)

  useEffect(() => {
    if(init) {
      change(scrollindex)
    }
  }, [scrollindex])

  useEffect(() => {
    setTotalnum(relateArticles.length + 1)
  }, [relateArticles])

  const scrollTouchstart = (e) => {
    setInit(true)
    setStarty(e.touches[0].pageY)
  }
  const scrollTouchmove = (e) => {
    let py = e.touches[0].pageY;
    if(py-starty<100 && py-starty>-100){  
      setMargintop(py - starty)
    }
  }
  const scrollTouchend = (e) => {
    const end = e.changedTouches[0].pageY
    if(end-starty > 100 && scrollindex > 0){
      setScrollindex(scrollindex-1)
    }else if(end-starty < -100 && scrollindex < totalnum){
      setScrollindex(scrollindex+1)
    }
    setStarty(0)
    setMargintop(0)
  }
  return (
    <View className="container">
      <View className="scroll-fullpage" onTouchMove={scrollTouchmove} onTouchStart={scrollTouchstart} onTouchEnd={scrollTouchend} style={{transform: `translateY(${-scrollindex*100}%)`, marginTop: `${margintop}px`}}>
        <View className={c("section", {active: scrollindex==0})}>
          <Content toy={toy} open={open}/>
        </View>
        {relateArticles && relateArticles.map((item: any, index: number) => (
          <View className={c("section", {active: (scrollindex-1)==index})}>
            <Content toy={item} open={open}/>
          </View>
        ))}
      </View>
    </View> 
  )
}

export default Scroll
