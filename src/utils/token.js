/**
 * @description Token 管理工具（前端）
 * @author DawNLighX
 */

const TOKEN_KEY = 'accessToken'

/**
 * 获取 access token
 * @returns {string|null}
 */
export function getAccessToken () {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 获取 refresh token
 * @returns {string|null}
 */
/**
 * 保存 accessToken（refreshToken 使用 HttpOnly cookie 管理）
 * @param {string} accessToken
 */
export function setTokens (accessToken) {
  localStorage.setItem(TOKEN_KEY, accessToken)
}

/**
 * 清除 token
 */
export function clearTokens () {
  localStorage.removeItem(TOKEN_KEY)
  // refreshToken 存在于 HttpOnly cookie，由后端在 logout 接口清除
  localStorage.removeItem('isLogin')
}

/**
 * 检查 token 是否存在
 * @returns {boolean}
 */
export function hasToken () {
  return !!getAccessToken()
}
