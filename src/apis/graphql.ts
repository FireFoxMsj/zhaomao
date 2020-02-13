// 获取token
export const createAuth = `
  mutation($code: String!) {
    CreateAuth(input: {code: $code}) {
      success
      access_token
      logined
    }
  }
`

// 获取用户微信信息
export const weixinUserInfo = `
  mutation($user_info: String!, $iv: String!) {
    UpdateAuth(input: {user_info: $user_info, iv: $iv}) {
      success
      errors
    }
  }
`
