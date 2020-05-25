import * as GraphQl from '../apis/graphql'
import request from '../utils/httpRequest'

export default {
  createAuth: request(GraphQl.createAuth), // 返回用户唯一标识
  weixinUserInfo: request(GraphQl.weixinUserInfo), // 获取用户微信信息
  list: request(GraphQl.list),
  article: request(GraphQl.article),
  me: request(GraphQl.me), // 我的
  like: request(GraphQl.like),
  unlike: request(GraphQl.unlike)
}
