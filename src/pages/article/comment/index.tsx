import Taro, { useState, useEffect, usePageScroll } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";

interface IProps {
  content:Content,
  onShoppingByClick: any
}

interface Content {
  price: string; // 价格
  on_sale_shop_count: number; // 商家数量
  currency_unit: string; // 是否为人民币CNY还是$
}

function CommodityPrice({content, onShoppingByClick}:IProps) {

  const toggleShopping = () => {
    onShoppingByClick()
  }

  return (
    <View className='comm-price' onClick={toggleShopping}>
        <View className='left-pri'>
            <Text className='number'>sd</Text>
            <Text className='text'>家店铺在售</Text>
        </View>
        <View className='right-pri'>
            <Text className='text'>最低</Text>
            <View className='price'>
              <View className='pri-ico' >¥</View>
              <View className='pri-ico-num' >aaaa</View>
            </View>
        </View>
    </View>
  );
}
export default CommodityPrice;