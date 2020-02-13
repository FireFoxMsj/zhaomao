import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import classNames from 'classnames'

import './index.scss'

const MIN_DISTANCE = 200
const MAX_INTERVAL = 3000
// 定时器
let timer: any = null
// 触摸时的原点
let touchStartX: number = 0
let touchStartY: number = 0
// 滑动时间间隔
let interval: number = 0
// 是否已经在滑动
let isMoving: boolean = false

let touchMoveX: number = 0
let touchMoveY: number = 0

let scrollTop2Bottom: boolean = false

const Tabs = (props: any) => {

  const {
    scroll,
    layout = 'center',
    swipeable = true,
    tabDirection = 'horizontal',
    defaultCurrent = 0,
    tabList = [],
    // animated = true,
    customStyle,
    tabsStyle,
    contentStyle,
    className,
    // height = '100vh',
    children,
    // displayNoneStyle,
    onChange,
  } = props

  const [ scrollIntoView, setScrollIntoView ] = useState('')
  const [ current, setCurrent ] = useState()
  const defaultStyle = {
    transform: `translate3d(-${current * 100}%, 0px, 0px)`,
    transition: 'transform 0.3s linear',
  }
  const [ bodyStyle, setBodyStyle ] = useState(defaultStyle)

  let displayNoneStyle: string = ''
  if(tabList.length > 0){
    if (Object.keys(tabList[0]).indexOf('cornerMark') === -1) {
      displayNoneStyle = 'display: none'
    }
  }

  useEffect(() => {
    setCurrent(defaultCurrent || 0)
    updateState(defaultCurrent || 0)
  }, [ defaultCurrent ])

  useEffect(() => {
    setBodyStyle({
      transform: `translate3d(-${current * 100}%, 0px, 0px)`,
      transition: 'all 0.3s linear',
    })
  }, [ current ])

  const updateState = (idx: number) => {
    if (scroll) {
      // 标签栏滚动
      const index = Math.max(idx - 1, 0)
      setScrollIntoView(`tab${index}`)
    }
  }

  const handleClick = (v: any) => {
    setCurrent(v)
    onChange(tabList[v] && tabList[v].value)
  }

  const handleTouchStart = (e: any) => {
    if (!swipeable || tabDirection === 'vertical') return
    // 获取触摸时的原点
    touchStartX = e.touches[0].pageX
    touchStartY = e.touches[0].pageY
    // 使用js计时器记录时间
    timer = setInterval(() => {
      interval++
    }, 100)
  }

  const handleTouchMove = (e: any) => {
    if (!swipeable || tabDirection === 'vertical') return
    touchMoveX = e.touches[0].pageX
    touchMoveY = e.touches[0].pageY
    const moveDistancX = touchMoveX - touchStartX
    const moveDistanceY = touchMoveY - touchStartY
    if ((Math.abs(moveDistanceY) > Math.abs(moveDistancX) && moveDistanceY > 0) || Math.abs(moveDistanceY) > Math.abs(moveDistancX) && moveDistanceY < 0) {
      scrollTop2Bottom = true
      return
    }
    if (!scrollTop2Bottom) {
      let translateX = 0
      translateX = (-current * 100 + (moveDistancX / 5))
      setBodyStyle({
        transform: `translate3d(${translateX}%, 0px, 0px)`,
        transition: 'transform 0s linear',
      })
    }
  }

  const handover = () => {
    const moveDistance = touchMoveX - touchStartX
    const maxIndex = tabList.length
    if (!isMoving && interval < MAX_INTERVAL && touchMoveX > 8 ) {
      // 向左滑动
      if (current + 1 < maxIndex && moveDistance <= -MIN_DISTANCE) {
        isMoving = true
        handleClick(current + 1)

      // 向右滑动
      } else if (current - 1 >= 0 && moveDistance >= MIN_DISTANCE) {
        isMoving = true
        handleClick(current - 1)
      } else {
        setBodyStyle(defaultStyle)
      }
    } else {
      setBodyStyle(defaultStyle)
    }
    // console.log(moveDistance, isMoving, interval, MAX_INTERVAL, touchStartX)
  }

  const handleTouchEnd = () => {
    scrollTop2Bottom = false
    if (!swipeable || tabDirection === 'vertical') return
    handover()
    clearInterval(timer)
    interval = 0
    isMoving = false
  }

  const reset = () => {
    setBodyStyle(defaultStyle)
    clearInterval(timer)
    interval = 0
    isMoving = false
  }

  const tabItems = tabList.map((tab: any, index: number) => {
    const itemCls = classNames({
      'tab-item tab-item-class': true,
      'tab-active tab-active-class': current === index
    })

    return (
      <View
        key={index}
        className={itemCls}
        id={`tab${index}`}
        onClick={() => handleClick(index)}
      >
        <View className='tab-title'>
          <View>{tab.title}</View>
          <View className='corner-mark' style={displayNoneStyle}>{tab.cornerMark}</View>
        </View>
        <View className='tab-corner-mark' />
      </View>
    )
  })


  const rootCls = classNames({
    'tabs-warper': true,
    [`tabs-warper-${layout}`]: true,
    'tabs-scroll': scroll,
  }, className)

  const scrollX = tabDirection === 'horizontal'
  const scrollY = tabDirection === 'vertical'

  return (
    <View
      className={rootCls}
      style={customStyle}
    >
      {
        scroll
          ? <ScrollView
            className='tab-container'
            // style={heightStyle}
            scrollX={scrollX}
            scrollY={scrollY}
            scrollWithAnimation
            scrollIntoView={scrollIntoView}
          >
            {tabItems}
          </ScrollView>
          :
          <View className='tab-container' style={tabsStyle}>
            {tabItems}
          </View>
      }
      <View className='tabs-body-warper'>
        <View
          className='tabs-body'
          style={{ ...bodyStyle, ...contentStyle }}
        >
          {children}
        </View>
      </View>
    </View>
  )

}

export default Tabs
