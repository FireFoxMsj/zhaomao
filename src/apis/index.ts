import * as GraphQl from '../apis/graphql'
import request from '../utils/httpRequest'

export default {
  createAuth: request(GraphQl.createAuth), // 返回用户唯一标识
  weixinUserInfo: request(GraphQl.weixinUserInfo), // 获取用户微信信息
  list: request(GraphQl.list),
  article: request(GraphQl.article),
  relateArticles: request(GraphQl.relateArticles),
  me: request(GraphQl.me), // 我的
  like: request(GraphQl.like),
  unlike: request(GraphQl.unlike),
  replies: request(GraphQl.replies), // 回复
  createReply: request(GraphQl.createReply),
  deleteReply: request(GraphQl.deleteReply),
  open: request(GraphQl.open)
}
