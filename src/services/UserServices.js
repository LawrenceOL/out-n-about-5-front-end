import Client from './api'

export const GetProfile = async (pk) => {
  try {
    const res = await Client.get(`/user/pk/${pk}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateProfile = async (pk, data) => {
  try {
    const res = await Client.put(`/user/update/${pk}`, data)
  } catch (error) {
    throw error
  }
}

export const sendDataToBackEnd = async (data) => {
  try {
    const res = await Client.post(`location/data`, data)
  } catch (error) {
    throw error
  }
}

export const CreateLocation = async (data) => {
  try {
    const res = await Client.post(`location/create`, data)
  } catch (error) {
    throw error
  }
}
