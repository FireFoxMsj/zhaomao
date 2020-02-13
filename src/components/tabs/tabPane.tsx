import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import './index.scss'

const TabsPane = (props: any) => {
  const {
    customStyle,
    className,
    tabDirection,
    index,
    current,
    children,
  } = props

  return (
    <View
      className={
        classNames({
          'tabs-pane-container': true,
          'at-tabs-pane--vertical': tabDirection === 'vertical',
          'at-tabs-pane--active': index === current,
          'at-tabs-pane--inactive': index !== current
        }, className)
      }
      style={customStyle}
    >
      {children}
    </View>
  )
}

export default TabsPane