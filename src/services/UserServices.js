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

export const CreateTask = async () => {
  try {
    const res = await Client.post(`/task/create`, {
      taskName: 'checkin',
      location: '124 main',
      description: 'string',
      checkIn: false,
      comment: 'value',
      userId: 1
    })
  } catch (error) {
    throw error
  }
}

export const sendDataToBackEnd = async (data) => {
  try {
    const res = await Client.post(`/location/data`, data)
  } catch (error) {
    throw error
  }
}

export const GetLocation = async (id) => {
  try {
    const res = await Client.get(`/location/pk/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
export const CreateLocation = async (data) => {
  try {
    const res = await Client.post(`/location/createone`, data)
    console.log('location created')
  } catch (error) {
    throw error
  }
}

export const getUserTaskLocation = async (id) => {
  try {
    const res = await Client.get(`/user/task/location/${id}`)

    return res.data
  } catch (error) {
    throw error
  }
}

export const pushToActivity = async (data) => {
  try {
    const res = await Client.post(`/activity/create`, data)
    console.log('activity created')
  } catch (error) {
    throw error
  }
}

export const GetUserTaskActivity = async (id) => {
  const res = await Client.get(`/activity/user/${id}`)
  return res.data
}

export const DeleteUser = async (id) => {
  const res = await Client.destroy(`/delete/${id}`)
}