import Client from './api'

export const GetProfile = async (pk) => {
  try {
    const res = await Client.get(`/user/pk/${pk}`)
    return res.data
  } catch (error) {
    throw error
  }
}