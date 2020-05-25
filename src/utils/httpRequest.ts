import Taro from '@tarojs/taro'
import * as GraphQl from '../apis/graphql'

const Fly = require('flyio/dist/npm/wx')

const baseURL = 'https://www.ocexam.cn'
// const baseURL = 'http://localhost:3000'

const httpRequest = new Fly()
const tokenRquest = new Fly()

const getAuth = async () => {
  httpRequest.lock()
  const { code } = await Taro.login()
  const res = await tokenRquest.post('/graphql', {
    query: GraphQl.createAuth,
    variables: { code }
  })
  const { createAuth = {} } = res.data.data
  const { accessToken, logined } = createAuth
  Taro.setStorageSync('accessToken', accessToken)
  Taro.setStorageSync('logined', logined)
  httpRequest.unlock()
}

httpRequest.config.baseURL = baseURL
tokenRquest.config.baseURL = baseURL

httpRequest.interceptors.request.use(async request => {
  const accessToken = Taro.getStorageSync('accessToken')
  if(!accessToken) {
    getAuth()
  }
  request.headers["X-ACCESS-TOKEN"] = Taro.getStorageSync('accessToken')
  return request
})
httpRequest.interceptors.response.use(
  (response: any) => {
    return response
  },
  async err => {
    const {status} = err
    try {
      if (status === 0) {
        Taro.showToast({ title: "网络问题", icon: 'none' })
      }
      if (status === 401 || status === 403) {
        if(status === 403) {
          Taro.reLaunch({
            url: '/pages/mine/index'
          })
        } else {
          getAuth()
          err.request.headers['X-ACCESS-TOKEN'] = Taro.getStorageSync('accessToken')
          return await httpRequest.request(err.request)
        }
      } else {
        throw new Error('Unable to get login status')
      }
      return err
    } catch (e) {
      throw e
    }
  }
)

const defaultRequest = (query: any) => (variables?: any) => (
  httpRequest.request('/graphql', {
      query,
      variables,
    },
    {
      method: 'post',
      baseURL,
      timeout: 10000, //超时设置为10s
    }
  )
)

export default defaultRequest

