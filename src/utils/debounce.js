/**
 * 防抖函数
 * @param {Function} fn 要执行的函数
 * @param {number} delay 延迟时间（ms）
 * @param {boolean} immediate 是否立即执行
 * @returns {Function} 防抖后的函数
 */

export function debounceUniversal (fn, delay = 300, immediate = false) {
  let timer = null

  return function (...args) {
    const context = this

    if (timer) {
      clearTimeout(timer)
    }

    if (immediate && !timer) {
      // 立即执行
      fn.apply(context, args)
    }

    timer = setTimeout(() => {
      if (!immediate) {
        // 延迟执行
        fn.apply(context, args)
      }
      timer = null
    }, delay)
  }
}
