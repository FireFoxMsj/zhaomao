import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

const IIcon = ({ icon, color, size, style = {} }: any) => {

  return (
    <View
      className={`iclass iconfont ${icon}`}
      style={{
        color,
        display: 'inline-block',
        fontSize: `${size}px`,
        ...style
      }}
    />
  )
}

IIcon.externalClasses = ['iclass']

IIcon.defaultProps = {
  icon: '',
}

export default IIcon
