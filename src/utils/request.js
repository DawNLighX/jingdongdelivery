import axios from 'axios'
import { getAccessToken, setTokens, clearTokens } from './token'

const instance = axios.create({
  baseURL: 'http://192.168.1.2:3001',
  withCredentials: true,
  timeout: 10000
})

// 请求拦截器：添加 authorization header
instance.interceptors.request.use(
  config => {
    const accessToken = getAccessToken()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器：处理 token 过期
instance.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const { response, config } = error

    // 如果响应状态码为 401（未授权），尝试刷新 token
    if (response && response.status === 401) {
      try {
        // 刷新 token：refreshToken 存在 HttpOnly cookie，浏览器会随请求自动携带
        const refreshResponse = await axios.post('http://192.168.1.2:3001/api/user/refreshToken', {}, { withCredentials: true })

        if (refreshResponse.data && refreshResponse.data.errno === 0) {
          const { accessToken } = refreshResponse.data.data

          // 保存新的 accessToken（refreshToken 已由后端通过 HttpOnly cookie 轮换）
          setTokens(accessToken)

          // 使用新的 token 重试原请求
          config.headers.Authorization = `Bearer ${accessToken}`
          return instance(config)
        } else {
          // 刷新 token 失败，清除 token 并跳转到登录页
          clearTokens()
          window.location.href = '/#/login'
          return Promise.reject(error)
        }
      } catch (refreshError) {
        console.error('刷新 token 失败:', refreshError)
        // 刷新失败，清除 token 并跳转到登录页
        clearTokens()
        window.location.href = '/#/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

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

export const patch = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.patch(url, JSON.stringify(data), {
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

export const del = (url) => {
  return new Promise((resolve, reject) => {
    instance.delete(url).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

// 登出：调用后端清除 HttpOnly refreshToken cookie，并清除前端 accessToken
export const logout = async () => {
  try {
    // instance 已设置 withCredentials: true
    const res = await instance.post('/api/user/logout')
    // 清除本地 accessToken
    clearTokens()
    // 可选：跳转到登录页由调用方决定
    return res.data
  } catch (err) {
    clearTokens()
    throw err
  }
}
