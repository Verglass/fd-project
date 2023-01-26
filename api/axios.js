import axios from 'axios'

export default axios.create({
    baseURL: 'https://shopapi-production-7591.up.railway.app'
    // baseURL: 'http://localhost:3500'
})