import { createStore } from 'vuex'

const cartStorage = {
  get () {
    try {
      return JSON.parse(localStorage.cartList) || {}
    } catch {
      return {}
    }
  },
  set (cartList) {
    localStorage.cartList = JSON.stringify(cartList)
  }
}

const persistencePlugin = (store) => {
  // 订阅所有 mutations
  store.subscribe((mutation, state) => {
    // 只对 cartList 相关的 mutations 进行持久化
    const cartMutations = ['changeItem', 'chooseCartItem', 'clearCart', 'selectAll', 'addShopName']
    if (cartMutations.includes(mutation.type)) {
      cartStorage.set(state.cartList)
    }
  })
}

export default createStore({
  state: {
    cartList: cartStorage.get()
  },
  getters: {
  },
  mutations: {
    changeItem (state, payload) {
      const { shopId, productId, productInfo, num } = payload

      if (!state.cartList[shopId]) {
        state.cartList[shopId] = { shopName: '', productList: {} }
      }

      const shopInfo = state.cartList[shopId]
      let product = shopInfo.productList[productId]

      if (!product) {
        product = {
          ...productInfo,
          count: 0
        }
      }

      product.count += num
      if (num > 0) product.check = true
      if (product.count < 0) product.count = 0

      shopInfo.productList[productId] = product
    },
    chooseCartItem (state, payload) {
      const { shopId, productId } = payload
      const cartItem = state.cartList[shopId].productList[productId]
      cartItem.check = !cartItem.check
    },
    clearCart (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
    },
    selectAll (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
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
    },
    addShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [persistencePlugin]
})
