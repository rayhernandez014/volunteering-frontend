import axios from 'axios'

const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {

  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const userService = { getAll, create, setToken }

export default userService