<template>
  <footer class="docker">
    <span class="docker__total">
      <span class="docker__total__text">实付金额：</span>
      <span class="docker__total__num">&yen;{{ totalPrice }}</span>
    </span>
    <div class="docker__order" @click="showPayConfirm()">提交订单</div>
  </footer>
  <div class="mask" v-if="payConfirmShow">
    <div class="mask__toast">
      <span class="mask__toast__question">确认要离开收银台？</span>
      <span class="mask__toast__description">请您尽快完成支付，否则订单将被取消</span>
      <div class="mask__toast__btn">
        <div class="btn-cancel" @click="showPayConfirm()">取消订单</div>
        <div class="btn-confirm">确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const cartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const cartList = store.state.cartList

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

  return { totalPrice }
}

const showPayConfirmEffect = () => {
  const payConfirmShow = ref(false)
  const showPayConfirm = () => {
    payConfirmShow.value = !payConfirmShow.value
  }

  return { payConfirmShow, showPayConfirm }
}

export default {
  name: 'OrderDocker',
  setup () {
    const { totalPrice } = cartEffect()
    const { payConfirmShow, showPayConfirm } = showPayConfirmEffect()
    return { totalPrice, payConfirmShow, showPayConfirm }
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
  border-top: 1px solid #f1f1f1;
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

    display: flex;
    flex-direction: column;

    &__question {
      margin-top: 0.24rem;
      text-align: center;
      font-size: 0.18rem;
      height: 0.25rem;
      line-height: 0.25rem;
      color: $content-font-color;
    }

    &__description {
      margin-top: 0.08rem;
      margin-bottom: 0.24rem;
      text-align: center;
      font-size: 0.14rem;
      height: 0.2rem;
      line-height: 0.2rem;
      color: #666666;
    }

    &__btn {
      display: flex;
      justify-content: center;
      gap:0.24rem;
      text-align: center;
      height: 0.32rem;

      div {
        width: 0.8rem;
        height: 0.32rem;
        line-height: 0.32rem;
        font-size: 0.14rem;
        border-radius: .16rem;
        border: 1px solid $green-500;
        text-align: center;
        -webkit-tap-highlight-color: transparent;
      }

      .btn-cancel{
        color: $green-500;
      }

      .btn-confirm{
        color:#ffffff;
        background: $green-500;
      }
    }
  }
}
</style>
