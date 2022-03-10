import axios from 'axios'

const api = axios.create({
  baseURL: 'https://raw.githubusercontent.com/SAFE-Labs-Brasil/frontend-challenge/main/server/'
})

export default api
