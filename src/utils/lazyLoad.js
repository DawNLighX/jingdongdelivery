/**
 * Vue 3 图片懒加载指令
 * 用法: v-lazy="imageUrl"
 * 自动替换 src，添加占位图、加载完成、加载失败处理
 */

export const vLazy = {
  mounted (el, binding) {
    // 占位图（可选：base64 透明图 或 本地占位图）
    const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E'

    // 设置初始占位图
    if (el.tagName === 'IMG') {
      el.src = placeholder
      el.dataset.src = binding.value
    }

    // 使用 Intersection Observer API 检测图片是否进入视口
    const imageLoad = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.dataset.src

          if (src) {
            // 创建新的 Image 对象来预加载，避免加载失败时显示破损图标
            const tempImg = new Image()

            tempImg.onload = () => {
              img.src = src
              img.classList.add('lazy-loaded')
              observer.unobserve(img)
            }

            tempImg.onerror = () => {
              // 加载失败时可保持占位图或设置为错误图标
              img.classList.add('lazy-error')
              observer.unobserve(img)
            }

            tempImg.src = src
          }
        }
      })
    }

    const observer = new IntersectionObserver(imageLoad, {
      root: null, // 相对于视口
      rootMargin: '50px', // 提前 50px 开始加载
      threshold: 0.01 // 图片 1% 进入视口时触发
    })

    observer.observe(el)

    // 保存 observer 实例以便后续卸载时清理
    el._lazyObserver = observer
  },

  updated (el, binding) {
    // 如果 src 发生改变，重新观察
    if (binding.value !== binding.oldValue) {
      el.dataset.src = binding.value
      if (el._lazyObserver) {
        el._lazyObserver.observe(el)
      }
    }
  },

  unmounted (el) {
    // 组件卸载时清理
    if (el._lazyObserver) {
      el._lazyObserver.unobserve(el)
      el._lazyObserver.disconnect()
      delete el._lazyObserver
    }
  }
}

/**
 * 组合式 API 中使用的懒加载钩子
 * 用法: const lazyLoad = useLazyLoad(); lazyLoad(el, imageUrl)
 */
export function useLazyLoad () {
  const lazyLoad = (el, src) => {
    const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E'

    el.src = placeholder
    el.dataset.src = src

    const imageLoad = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          const imageSrc = img.dataset.src

          if (imageSrc) {
            const tempImg = new Image()

            tempImg.onload = () => {
              img.src = imageSrc
              img.classList.add('lazy-loaded')
              observer.unobserve(img)
            }

            tempImg.onerror = () => {
              img.classList.add('lazy-error')
              observer.unobserve(img)
            }

            tempImg.src = imageSrc
          }
        }
      })
    }

    const observer = new IntersectionObserver(imageLoad, {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    })

    observer.observe(el)
    el._lazyObserver = observer
  }

  const cleanupLazy = (el) => {
    if (el._lazyObserver) {
      el._lazyObserver.disconnect()
      delete el._lazyObserver
    }
  }

  return { lazyLoad, cleanupLazy }
}
