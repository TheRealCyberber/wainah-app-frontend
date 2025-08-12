import Client from './api'

export const CreateClaimRequest = async (data) => {
  try {
    const res = await Client.post('/claims', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetClaimsForItem = async (itemId) => {
  try {
    const res = await Client.get(`/claims/item/${itemId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetClaimsByUserId = async () => {
  try {
    const res = await Client.get('/claims/user')
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdateClaimStatus = async (claimId, status) => {
  try {
    const res = await Client.put(`/claims/${claimId}/status`, { status })
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeleteClaimRequest = async (claimId) => {
    try {
      const res = await Client.delete(`/claims/${claimId}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  
  export const EditClaimRequest = async (claimId, data) => {
    try {
      const res = await Client.put(`/claims/${claimId}`, data)
      return res.data
    } catch (error) {
      throw error
    }
  }

  export const GetClaimById = async (claimId) => {
    try {
      const res = await Client.get(`/claims/${claimId}`)
      return res.data
    } catch (error) {
      throw error
    }
  }
  
  