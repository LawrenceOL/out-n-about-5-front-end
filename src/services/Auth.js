import Client from './api'

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/user/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/user/signin', data)
    localStorage.setItem('token', res.data.token)
    return res.data
  } catch (error) {
  throw error
}
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/user/session')
    return res.data
  } catch (error) {
    throw error
  }
}