import Client from './api'

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/auth/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetUserById = async (userId) => {
    if (!userId) throw new Error('UserId parameter is required');
    try {
      const res = await Client.get(`/auth/users/${userId}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  

export const SignOutUser = () => {
  localStorage.removeItem('token') 
}

