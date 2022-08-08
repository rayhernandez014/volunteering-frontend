import axios from 'axios'
const baseUrl = '/api/logout'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const logout = async () => {


  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, undefined, config)
  return response.data
}

const logoutService = { logout, setToken }

export default logoutService