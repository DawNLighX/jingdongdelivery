/**
 * 节流函数
 * @param {Function} fn 要执行的函数
 * @param {number} interval 间隔时间
 * @param {Object} options 选项 {leading: true, trailing: true}
 * @returns {Function}节流后的函数
 */

export function throttle (fn, interval = 300, options = {}) {
  const { leading = true, trailing = true } = options
  let timer = null
  let lastTime = 0

  return function (...args) {
    const context = this
    const now = Date.now()

    // 计算剩余时间
    const remaining = interval - (now - lastTime)

    // 清除定时器
    const clearTimer = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }

    if (remaining <= 0 && leading) {
      clearTimer()
      fn.apply(context, args)
      lastTime = now
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        lastTime = Date.now()
        timer = null
      }, remaining > 0 ? remaining : interval)
    }
  }
}
