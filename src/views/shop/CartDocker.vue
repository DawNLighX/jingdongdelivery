<template>
  <div class="cart-list">
    <div class="cart-list__top-bar">
      <span></span>
      <span class="cart-list__top-bar__clear">清空购物车</span>
    </div>
    <div class="cart-list__scroll-area">
      <div
        :class="{'info-item':true,
        'info-item--disable': !(item.count > 0)
        }"
        v-for="item in productList"
        :key="item._id"
      >
        <span
          class="item-check iconfont"
          v-html="item.check ? '&#xe652;' : '&#xe651;'"
          @click="chooseCartItem(shopId, item._id)"
        >
        </span>
        <span class="item-img">
          <img :src="item.imgUrl">
        </span>
        <span class="item-detail">
          <span class="item-detail__title">{{ item.name }}</span>
          <span class="item-detail__price">
            <span class="price-now"
              ><span class="price-yen">&yen;</span>{{ item.price }}</span
            >
            <span class="price-origin"
              ><span class="price-yen">&yen;</span>{{ item.oldPrice }}</span
            >
          </span>
        </span>
        <span class="price-amount">
          <span
            class="price-amount__minus iconfont"
            @click="changeItem(shopId, item._id, item, -1)"
          >&#xe607;</span>
          <span class="price-amount__num">{{item.count || 0}}</span>
          <span class="price-amount__add iconfont" @click="changeItem(shopId, item._id, item, 1)">&#xe606;</span>
        </span>
      </div>
    </div>
  </div>
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

const cartEffect = () => {
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
        if (product.check) count += (product.count * product.price)
      }
    }
    return Number(count.toFixed(2))
  })

  const productList = computed(() => {
    const productList = Object.values(cartList[shopId] || {})
    return productList
  })

  const changeItem = (shopId, productId, productInfo, num) => {
    store.commit('changeItem', { shopId, productId, productInfo, num })
  }

  const chooseCartItem = (shopId, productId) => {
    store.commit('chooseCartItem', { shopId, productId })
  }

  return { totalAmount, totalPrice, productList, shopId, cartList, changeItem, chooseCartItem }
}

export default {
  name: 'CartDocker',
  setup () {
    const { totalAmount, totalPrice, productList, shopId, cartList, changeItem, chooseCartItem } = cartEffect()
    return { totalAmount, totalPrice, productList, shopId, cartList, changeItem, chooseCartItem }
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
  border-top: 1px solid #f1f1f1;
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

.cart-list {
  position: fixed;
  bottom: .50rem;
  left: 0;
  z-index: 500;

  width: 100%;
  height: 1.93rem;
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom); //安全区域适配

  background-color: #ffffff;
  color: $content-font-color;

  &__top-bar {
    line-height: .52rem;
    height: .52rem;
  }

  &__scroll-area {
    border-top: 1px solid #f1f1f1;
    height: 1.4rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
}

.info-item {
  display: flex;
  line-height: 0.46rem;
  text-align: center;
  font-size: 0.14rem;
  padding: 0;
  margin: 0.16rem 0.18rem 0.16rem 0rem;

  .item-check{
    width: 0.54rem;
    height: 0.46rem;
    font-size: .20rem;
    color: $jingdong-green;
    -webkit-tap-highlight-color: transparent;
  }
  .item-img {
    width: 0.46rem;
    height: 0.46rem;
    margin-right: 0.16rem;
    background-color: $search-background;
  }

  .item-detail {
    flex: 1;
    height: 0.46rem;
    display: flex;
    gap: 0.06rem;
    flex-direction: column;
    overflow: hidden;
    span {
      text-align: left;
      line-height: 0.2rem;
    }
    &__title {
      line-height: 0.2rem;
      height: 0.2rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      @include ellipsis;
    }
    &__price {
      height: 0.2rem;
      display: flex;
      align-items: center;
    }
  }
  &--disable {
    display: none;
  }
}

.price-now {
  margin-right: 0.06rem;
  font-weight: 600;
  color: $jingdong-red;
  height: 0.2rem;
  display: flex;
  align-items: baseline;
  .price-yen {
    font-size: 0.12rem;
  }
}
.price-origin {
  flex: 1;
  font-size: 0.1rem;
  text-decoration: line-through;
  display: flex;
  align-items: baseline;
  color:#888888;
  .price-yen {
    font-size: 0.09rem;
  }
}
.price-amount {
  width: .68rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  &__minus {
    font-size: 0.20rem;
    color: #888888;
  }
  &__num {
    font-size: 0.14rem;
  }
  &__add {
    font-size: 0.20rem;
    color: $jingdong-green;
  }
}
</style>
