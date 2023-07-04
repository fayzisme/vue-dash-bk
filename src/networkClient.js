import axios from 'axios'
import config from './config'
import store from './store'

const timeout = 60000 // in milisecond

export default function(payload) {
  axios.defaults.baseURL = config.baseApi
  axios.defaults.timeout = timeout
  axios.defaults.headers.common['api-key'] = store.getters.accessToken || ''
  axios.defaults.headers.common['ip-pub'] = store.getters.ip || ''

  return new Promise ((resolve, reject) => {
    axios(payload)
    .then(result => {
      if (result.data.ec == 401) {
        window.location.replace('/logout')
      } else {
        resolve(result)
      }
    })
    .catch(error => { reject(error) })
  })
}