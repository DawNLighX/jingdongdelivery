<template>
  <footer class="docker">
    <div class="docker__cart">
      <div class="docker__cart__icon iconfont">&#xe636;</div>
      <div class="docker__cart__amount">{{totalAmount}}</div>
    </div>
    <span class="docker__total">
      <span class="docker__total__text">总计：</span>
      <span class="docker__total__num">&yen;{{totalPrice}}</span>
      <span class="docker__total__textDeli">免基础运费</span>
    </span>
    <div class="docker__order">去结算</div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'CartDocker',
  setup () {
    const store = useStore()
    const route = useRoute()
    const shopId = route.params.id
    const cartList = store.state.cartList
    const totalAmount = computed(() => {
      const productList = cartList[shopId]
      let count = 0
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          count += product.count
        }
      }
      return count
    })

    const totalPrice = computed(() => {
      const productList = cartList[shopId]
      let count = 0
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          count += (product.count * product.price)
        }
      }
      return count.toFixed(2)
    })

    return { totalAmount, totalPrice }
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
  background-color: rgba(255, 255, 255, 0.9);
  color: $content-font-color;
  backdrop-filter: blur(0.15rem);
  -webkit-backdrop-filter: blur(0.15rem); //毛玻璃
  &__cart {
    width: 0.76rem;
    height: 0.5rem;
    align-items: center;
    position: relative;
    &__icon {
      position: absolute;
      z-index: 0;
      font-size: 0.36rem;
      line-height: 0.36rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -48%);
      width: 0.36rem;
      height: 0.36rem;
      text-align: center;
      color: rgb(10, 176, 10);
    }
    &__amount {
      position: absolute;
      z-index: 111;
      min-width: 0.16rem;
      height: 0.16rem;
      line-height: 0.16rem;
      left: 60%;
      top: 8%;
      font-size: 0.12rem;
      color: #fff;
      border-radius: 50%;
      background-color: $jingdong-red;
      text-align: center;
    }
  }

  &__total {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 0.16rem;
    height: 100%;
    line-height: 1;
    &__text {
      font-size: 0.12rem;
      line-height: 1;
    }
    &__num {
      flex: 1;
      font-size: 0.18rem;
      font-weight: 600;
      color: $jingdong-red;
      line-height: 1;
    }
    &__textDeli {
      width: 0.6rem;
      font-size: 0.12rem;
      line-height: 1;
      padding-right: 0.12rem;
    }
  }

  &__order {
    width: 0.98rem;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.14rem;
    color: #ffffff;
    background-color: rgb(10, 176, 10);
  }
}
</style>
