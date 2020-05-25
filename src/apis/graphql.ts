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
    play {
      id
      name
      avatarUrl
    }
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