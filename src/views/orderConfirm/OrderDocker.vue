<template>
  <footer class="docker">
    <span class="docker__total">
      <span class="docker__total__text">实付金额：</span>
      <span class="docker__total__num">&yen;{{ totalPrice }}</span>
    </span>
    <div class="docker__order" @click="handleSubmitOrder()">提交订单</div>
  </footer>

  <!-- 支付确认弹窗 -->
  <div class="mask" v-if="payConfirmShow">
    <div class="mask__toast">
      <span class="mask__toast__question">确认支付？</span>
      <span class="mask__toast__description">
        订单有效期<span class="countdown">{{ countdown }}</span>分钟，请及时完成支付
      </span>
      <div class="mask__toast__btn">
        <div class="btn-cancel" @click="closePayConfirm">再想想</div>
        <div class="btn-confirm" @click="handlePayOrder">确认支付</div>
      </div>
    </div>
  </div>

  <!-- 订单取消弹窗（独立出来） -->
  <div class="mask" v-if="cancelConfirmShow">
    <div class="mask__toast">
      <span class="mask__toast__question">确定要取消订单？</span>
      <span class="mask__toast__description">取消后需要重新下单哦</span>
      <div class="mask__toast__btn">
        <div class="btn-cancel" @click="cancelConfirmShow = false">继续支付</div>
        <div class="btn-confirm" @click="handleCancelOrder">确定取消</div>
      </div>
    </div>
  </div>

  <Toast :message="toastMessage" :show="show" />
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onUnmounted } from 'vue'
import { useStore } from 'vuex'

import Toast, { toastEffect } from '../../components/Toast.vue'
import { post } from '../../utils/request.js'

// 购物车相关计算逻辑
const cartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const cartList = store.state.cartList

  // 计算总价
  const totalPrice = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) count += product.count * product.price
      }
    }
    return Number(count.toFixed(2))
  })

  // 计算总数量
  const totalAmount = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        if (product.check) count += product.count
      }
    }
    return count
  })

  // 获取选中的商品列表
  const selectedProducts = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    return Object.values(productList).filter(item => item.check && item.count > 0)
  })

  return { totalPrice, totalAmount, selectedProducts }
}

// 支付确认弹窗逻辑
const usePayConfirm = (showToast, totalAmount) => {
  const payConfirmShow = ref(false)
  const cancelConfirmShow = ref(false)
  const countdown = ref(15) // 15分钟倒计时
  const route = useRoute()

  let timer = null

  // 提交订单点击事件
  const handleSubmitOrder = (path) => {
    if (totalAmount.value === 0) {
      showToast('请先选择商品后再进行支付！')
      return
    }

    const addressId = route.query.id

    if (!addressId) {
      showToast('请先选择地址后再进行支付！')
      return
    }

    payConfirmShow.value = true
    startCountdown()
  }

  // 关闭支付确认
  const closePayConfirm = () => {
    payConfirmShow.value = false
    stopCountdown()
  }

  // 开始倒计时
  const startCountdown = () => {
    countdown.value = 15
    timer = setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      } else {
        // 超时自动关闭
        closePayConfirm()
        showToast('订单已超时，请重新下单')
      }
    }, 60000) // 每分钟更新一次
  }

  // 停止倒计时
  const stopCountdown = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  // 显示取消订单确认
  const showCancelConfirm = () => {
    payConfirmShow.value = false
    cancelConfirmShow.value = true
  }

  // 组件卸载时清理定时器
  onUnmounted(() => {
    stopCountdown()
  })

  return {
    payConfirmShow,
    cancelConfirmShow,
    countdown,
    handleSubmitOrder,
    closePayConfirm,
    showCancelConfirm,
    stopCountdown
  }
}

// 订单处理逻辑
const useOrderHandler = (showToast, shopId, selectedProducts, shopName, addressId, totalPrice, totalAmount) => {
  const store = useStore()
  const router = useRouter()

  // 支付订单
  const handlePayOrder = async () => {
    try {
      if (selectedProducts.value.length === 0) {
        showToast('没有选中的商品')
        return
      }

      const products = selectedProducts.value.map(product => ({
        id: product._id,
        num: product.count,
        price: product.price,
        name: product.name,
        imgUrl: product.imgUrl
      }))

      // 计算总价
      const totalPrice = selectedProducts.value.reduce(
        (sum, product) => sum + product.price * product.count, 0
      ).toFixed(2)

      const result = await post('/api/order', {
        addressId, // 这里应该从地址管理获取真实地址ID
        shopId,
        shopName: shopName.value,
        isCanceled: false,
        products,
        totalPrice
      })

      if (result?.errno === 0) {
        showToast('支付成功！即将跳转至订单页面')

        // 只清除已购买的商品，保留未选中的
        clearPurchasedItems(shopId, selectedProducts.value)

        setTimeout(() => {
          router.push({
            name: 'Order',
            query: {
              orderId: result.data?.orderId,
              from: 'payment'
            }
          })
        }, 1500)
      } else {
        showToast(result?.message || '支付失败，请重试')
      }
    } catch (error) {
      showToast('网络异常，请检查连接后重试！')
      console.error('支付失败：', error)
    }
  }

  // 取消订单
  const handleCancelOrder = () => {
    showToast('订单已取消')
    setTimeout(() => {
      router.push({ name: 'Home' }) // 返回首页
    }, 1500)
  }

  // 只清除已购买的商品
  const clearPurchasedItems = (shopId, purchasedProducts) => {
    const cartList = JSON.parse(localStorage.cartList || '{}')

    if (cartList[shopId]?.productList) {
      purchasedProducts.forEach(product => {
        delete cartList[shopId].productList[product._id]
      })

      // 如果该店铺购物车已空，删除整个店铺
      if (Object.keys(cartList[shopId].productList).length === 0) {
        delete cartList[shopId]
      }

      localStorage.cartList = JSON.stringify(cartList)

      // 更新 Vuex store
      store.commit('clearPurchasedItems', {
        shopId,
        productIds: purchasedProducts.map(p => p._id)
      })
    }
  }

  return { handlePayOrder, handleCancelOrder }
}

export default {
  name: 'OrderDocker',
  components: { Toast },
  setup () {
    const route = useRoute()
    const store = useStore()
    const shopId = route.params.id
    const addressId = route.query.id

    // 获取店铺名称
    const shopName = computed(() => {
      return route.query.shopName || store.state.cartList[shopId]?.shopName || '未知店铺'
    })

    // Toast 相关
    const { show, toastMessage, showToast } = toastEffect()

    // 购物车计算
    const { totalPrice, totalAmount, selectedProducts } = cartEffect()

    // 支付确认弹窗
    const {
      payConfirmShow,
      cancelConfirmShow,
      countdown,
      handleSubmitOrder,
      closePayConfirm,
      showCancelConfirm
    } = usePayConfirm(showToast, totalAmount)

    // 订单处理
    const { handlePayOrder, handleCancelOrder } = useOrderHandler(
      showToast,
      shopId,
      selectedProducts,
      shopName,
      addressId,
      totalPrice,
      totalAmount
    )

    return {
      totalPrice,
      totalAmount,
      payConfirmShow,
      cancelConfirmShow,
      countdown,
      handleSubmitOrder,
      handlePayOrder,
      handleCancelOrder,
      closePayConfirm,
      showCancelConfirm,
      show,
      toastMessage
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.docker {
  /* 定位 */
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;

  /* 布局 */
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* 盒模型 */
  width: 100%;
  height: 0.5rem;
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom); //安全区域适配

  /* 视觉 */
  -webkit-tap-highlight-color: transparent;
  border-top: 0.01rem solid #f1f1f1;
  background-color: rgba(255, 255, 255, 0.9);
  color: $content-font-color;
  backdrop-filter: blur(0.15rem);
  -webkit-backdrop-filter: blur(0.15rem); //毛玻璃

  &__total {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 0.16rem;
    height: 100%;
    line-height: 1;
    margin-left: 0.24rem;

    &__text {
      font-size: 0.14rem;
      line-height: 1;
    }

    &__num {
      flex: 1;
      font-size: 0.18rem;
      font-weight: 600;
      color: $jingdong-red;
      line-height: 1;
    }
  }

  &__order {
    width: 0.98rem;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.14rem;
    color: #ffffff;
    background-color: $color-docker;

    &:active {
      opacity: 0.9;
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 50%透明度黑色 */
  z-index: 1001;

  &__toast {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3.01rem;
    height: 1.57rem;
    border-radius: 0.06rem;
    background: #FFFFFF;
    box-shadow: 0 0.04rem 0.16rem rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;

    &__question {
      margin-top: 0.24rem;
      text-align: center;
      font-size: 0.18rem;
      height: 0.25rem;
      line-height: 0.25rem;
      color: $content-font-color;
      font-weight: 500;
    }

    &__description {
      margin-top: 0.08rem;
      margin-bottom: 0.24rem;
      text-align: center;
      font-size: 0.14rem;
      height: 0.2rem;
      line-height: 0.2rem;
      color: #666666;

      .countdown {
        color: $jingdong-red;
        font-weight: 600;
        margin: 0 0.02rem;
      }
    }

    &__btn {
      display: flex;
      justify-content: center;
      gap: 0.24rem;
      text-align: center;
      height: 0.32rem;
      width: 100%;

      div {
        width: 1rem;
        height: 0.32rem;
        line-height: 0.32rem;
        font-size: 0.14rem;
        border-radius: 0.16rem;
        border: 0.01rem solid $green-500;
        text-align: center;
        -webkit-tap-highlight-color: transparent;
        cursor: pointer;
        transition: all 0.2s;

        &:active {
          transform: scale(0.98);
        }
      }

      .btn-cancel {
        color: $green-500;
        background: #FFFFFF;

        &:active {
          background: rgba($green-500, 0.1);
        }
      }

      .btn-confirm {
        color: #ffffff;
        background: $green-500;

        &:active {
          background: darken($green-500, 10%);
        }
      }
    }
  }
}
</style>
