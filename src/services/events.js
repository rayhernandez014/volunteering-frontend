import axios from 'axios'
const baseUrl = '/api/events'

let token = null

const getConfig = () => {
  const config = {
    headers: { Authorization: token }
  }
  return config
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newEvent) => {

  const config = getConfig()

  const response = await axios.post(baseUrl, newEvent, config)
  return response.data
}

const update = async (id, modifiedEvent) => {

  const config = getConfig()

  const response = await axios.put(`${baseUrl}/${id}`, modifiedEvent, config)
  return response.data
}

const updateRSVP = async (id) => {

  const config = getConfig()

  const response = await axios.put(`${baseUrl}/${id}/rsvp`, undefined, config)
  return response.data
}

const remove = async (id) => {

  const config = getConfig()

  await axios.delete(`${baseUrl}/${id}`, config)
}

const blogService = { getAll, create, setToken, update, updateRSVP, remove }

export default blogService