import Client from './api'

export const GetItems = async () => {
  try {
    const res = await Client.get('/items')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetItemsByUserId = async (userId) => {
  try {
    const res = await Client.get(`/items/user/${userId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetItemById = async (id) => {
  try {
    const res = await Client.get(`/items/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateItem = async (data) => {
  try {
    const res = await Client.post('/items', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateItem = async (id, data) => {
  try {
    const res = await Client.put(`/items/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteItem = async (id) => {
  try {
    const res = await Client.delete(`/items/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
