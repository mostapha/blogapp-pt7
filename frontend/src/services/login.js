import axios from 'axios'

const login = async credentials => {
  try {
    const response = await axios.post('/api/login', credentials)
    return response.data
  } catch (error) {
    if(error.response.status === 401){
      return error.response.data
    }
    console.log([error])
    console.error(error)
  }
}

export default { login }