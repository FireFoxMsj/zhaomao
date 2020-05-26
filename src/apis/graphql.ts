// 获取token
export const createAuth = `
  mutation($code: String!) {
    createAuth(input: {code: $code}) {
      accessToken
      success
      logined
    }
  }
`

// 获取用户微信信息
export const weixinUserInfo = `
  mutation($user_info: String!, $iv: String!) {
    bindUser(input: {userInfo: $user_info, iv: $iv}) {
      success
    }
  }
`

// 内容列表
export const list = `
query($page: Int) {
  toys(page: $page) {
    id
    name
    cover
    photoUrls
    count: cachedVotesTotal
    likedByMe
    play {
      id
      name
      avatarUrl
    }
  }
}
`

// 内容页面
export const article = `
query($id: ID!) {
  toy(id: $id) {
    id
    name
    cover
    photoUrls
    count: cachedVotesTotal
    likedByMe
    repliesCount
    play {
      id
      name
      avatarUrl
    }
  }
}
`

// 文章评论接口
export const replies = `
query($id: ID!, $page: Int!) {
  toy(id: $id) {
    replies(page: $page) {
      id
      date
      user {
        name
        avatarUrl
      }
      body
      replyTo {
        id
        body
        user {
          name
          avatarUrl
        }
      }
    }
  }
}`

// 回复评论
export const createReply = `
  mutation($repliable_id: ID!, $repliable_type: String!, $body: String!, $reply_to_id: ID) {
    createReply(input: {repliableId: $repliable_id, repliableType: $repliable_type, body: $body, replyToId: $reply_to_id}) {
      success
    }
  }
`

// 删除评论
export const deleteReply = `
  mutation($id: ID!) {
    deleteReply(input: {id: $id}) {
      success
    }
  }
`

// 我的
export const me = `
query me {
  me {
    name
    avatarUrl
  }
}
`

// 点赞
export const like = `
mutation($likableId: ID!, $likableType: String!){
  createLike(input: {likableId: $likableId, likableType: $likableType}) {
    success
  }
}
`

// 取消点赞
export const unlike = `
mutation($likableId: ID!, $likableType: String!){
  deleteLike(input: {likableId: $likableId, likableType: $likableType}) {
    success
  }
}
`