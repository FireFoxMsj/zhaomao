import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './tabs.scss'

interface TabProps {
  tabList: TabListItem[]
  layout?: 'center' | 'left'
  tabContainerStyle?: {}
  defaultValue?: any
  children?: any
  segmentOneLine?: boolean
}

interface TabListItem {
  title: string
  value: any
  cornerMark?: any
}

const Tab = ({ tabList = [] , layout = 'center', tabContainerStyle, defaultValue, children, segmentOneLine = true }: TabProps) => {
  const [ active, setActive ] = useState()

  let displayNoneStyle: string = ''
  if(tabList.length > 0){
    if (Object.keys(tabList[0]).indexOf('cornerMark') === -1) {
      displayNoneStyle = 'display: none'
    }
  }

  useEffect(() => {
    setActive(defaultValue || tabList[0].value)
  }, [ defaultValue ])

  const tabChange = (value: any) => {
    setActive(value)
  }

  return (
    <View className={`tab-container tab-class`} style={tabContainerStyle}>
      {children}
      <View className={`tab-list-view tab-list-view-class ${layout === 'left' ? 'layout-left' : ''}`}>
        {tabList.map((tab: any, index: number) => (
          <View
            key={index}
            className={`tab-item tab-item-class ${active === tab.value ? 'tab-active tab-active-class': ''}`}
            onClick={() => tabChange(tab.value)}
          >
            <View className='tab-title'>
              <View>{tab.title}</View>
              <View className='corner-mark' style={displayNoneStyle}>{tab.cornerMark}</View>
            </View>
            {(segmentOneLine && active === tab.value) && <View className='segment-one-line segment-one-line-class'/>}
            {(!segmentOneLine && active === tab.value) &&
              <View className='segment-four-line'>
                <View className='segment-one'/>
                <View className='segment-two'/>
                <View className='segment-three'/>
                <View className='segment-four'/>
              </View>
            }
          </View>
        ))}
      </View>
    </View>
  )
}

Tab.externalClasses = ['tab-class', 'tab-list-view-class', 'tab-item-class', 'tab-active-class', 'segment-one-line-class']

export default Tab
