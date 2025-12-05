import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://m1.apifoxmock.com/m1/7414080-7147438-default',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }
    ).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
