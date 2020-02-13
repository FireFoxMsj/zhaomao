import Api from '../apis'

const callApi = async (apiName: string, args: any = {}) => {
  const response = await Api[apiName](args)
  const { status, data } = response
  if (status === 200) {
    return data.data
  }
}

export default callApi
