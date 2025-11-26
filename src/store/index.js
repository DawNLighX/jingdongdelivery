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
    }
  },
  actions: {
  },
  modules: {
  }
})
