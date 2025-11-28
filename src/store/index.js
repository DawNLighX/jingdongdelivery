import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
      // 第一层级是商品id
    }
  },
  getters: {
  },
  mutations: {
    changeItem (state, payload) {
      const { shopId, productId, productInfo, num } = payload

      if (!state.cartList[shopId]) {
        state.cartList[shopId] = {}
      }

      const shopInfo = state.cartList[shopId]
      let product = shopInfo[productId]

      if (!product) {
        product = {
          ...productInfo,
          count: 0
        }
      }

      product.count += num
      if (num > 0) product.check = true
      if (product.count < 0) product.count = 0

      shopInfo[productId] = product
    },
    chooseCartItem (state, payload) {
      const { shopId, productId } = payload
      const cartItem = state.cartList[shopId][productId]
      cartItem.check = !cartItem.check
    },
    clearCart (state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = {}
    },
    selectAll (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]
      if (products) {
        // 检查当前是否已经全选（只统计有数量的商品）
        const productArray = Object.values(products)
        const hasProducts = productArray.some(product => product.count > 0)

        if (!hasProducts) return // 如果没有商品，直接返回

        const isAllSelected = productArray.every(product =>
          product.count > 0 ? product.check : true // 忽略数量为0的商品
        )

        // 取反作为新状态
        const newCheckState = !isAllSelected

        for (const key in products) {
          const product = products[key]
          // 只对数量大于0的商品进行操作
          if (product.count > 0) {
            product.check = newCheckState
          }
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
