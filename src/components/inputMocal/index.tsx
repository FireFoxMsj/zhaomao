import Taro, { useState } from '@tarojs/taro'
import { View, Input, Image, Text } from '@tarojs/components'
import { AtModal, AtModalContent } from "taro-ui"


import './index.scss'

const InputModal = ({ isOpened, comment, closeInputModal, user }: any) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ disabled, setDisabled ] = useState(false)

  const inputChange = (e: any) => {
    setInputValue(e.detail.value)
  }

  const confirm = async () => {
    if (disabled) {
      return
    } else {
      setDisabled(true)
      await comment(inputValue)
      setDisabled(false)
    }
  }

  return (
    <AtModal
      isOpened={isOpened}
      className='input-modal'
      onClose={closeInputModal}
    >
      <AtModalContent>
        {user &&
          <View className='user-container'>
            <Image className='user-image' src={user.avatarUrl} />
            <Text>{user.name}</Text>
          </View>
        }
        <View className='input-container'>
          <Input
            className='input'
            placeholder='写回复...'
            confirmType='send'
            placeholderClass='input-placeholder'
            cursorSpacing={20}
            onConfirm={confirm}
            onInput={inputChange}
            focus
          />
          <View className='input-btn' onClick={confirm}>发布</View>
        </View>
      </AtModalContent>
    </AtModal>
  )
}

export default InputModal
