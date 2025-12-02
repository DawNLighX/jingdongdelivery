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

// 插件：监听 cartList 相关 mutation 并同步到 localStorage
const persistencePlugin = store => {
  const cartMutations = [
    'changeItem',
    'chooseCartItem',
    'clearCart',
    'selectAll',
    'addShopName'
  ]

  store.subscribe((mutation, state) => {
    if (cartMutations.includes(mutation.type)) {
      cartStorage.set(state.cartList)
    }
  })
}

export default createStore({
  state: {
    cartList: cartStorage.get()
  },
  mutations: {
    // 修改商品数量
    changeItem (state, payload) {
      const { shopId, shopName, productId, productInfo, num } = payload

      // 保证 shopId 存在
      if (!state.cartList[shopId]) {
        state.cartList[shopId] = { shopName: shopName || '', productList: {} }
      } else if (shopName && !state.cartList[shopId].shopName) {
        state.cartList[shopId].shopName = shopName
      }

      const shopInfo = state.cartList[shopId]

      // 保证 productId 存在
      if (!shopInfo.productList[productId]) {
        shopInfo.productList[productId] = { ...productInfo, count: 0 }
      }

      const product = shopInfo.productList[productId]
      product.count += num
      if (num > 0) product.check = true
      if (product.count < 0) product.count = 0
    },

    // 勾选/取消勾选商品
    chooseCartItem (state, payload) {
      const { shopId, productId } = payload
      const cartItem = state.cartList[shopId]?.productList[productId]
      if (!cartItem) return
      cartItem.check = !cartItem.check
    },

    // 清空某个店铺购物车
    clearCart (state, payload) {
      const { shopId } = payload
      if (state.cartList[shopId]) {
        state.cartList[shopId].productList = {}
      }
    },

    // 全选/取消全选
    selectAll (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]?.productList
      if (!products) return

      const productArray = Object.values(products)
      const hasProducts = productArray.some(p => p.count > 0)
      if (!hasProducts) return

      const isAllSelected = productArray.every(p => (p.count > 0 ? p.check : true))
      const newCheckState = !isAllSelected

      for (const key in products) {
        const product = products[key]
        if (product.count > 0) {
          product.check = newCheckState
        }
      }
    },

    // 添加店铺名称
    addShopName (state, payload) {
      const { shopId, shopName } = payload
      if (!state.cartList[shopId]) {
        state.cartList[shopId] = { shopName: '', productList: {} }
      }
      state.cartList[shopId].shopName = shopName
    }
  },
  plugins: [persistencePlugin]
})
