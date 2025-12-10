<template>
  <header class="header">我的购物车</header>

  <div class="layout">
    <div class="empty-cart" v-if="isEmpty">
      <div class="empty-cart__icon">🛒</div>
      <p class="empty-cart__text">购物车还是空的哦~</p>
      <button class="empty-cart__btn" @click="goShopping">去逛逛</button>
    </div>

    <div
      :class="{
        'products':true,
        'products--disable': cart.total <= 0,
      }"
      v-for="(cart, key) in list"
      :key="key"
      @click="handleCartClick(key)"
    >
      <div class="products__title">
        {{ cart.shopName }}
        <span>（共 <b>{{ cart.total }}</b> 件商品）</span>
      </div>
      <div class="products__list">
        <div
          class="info-item"
          v-for="product in cart.productList"
          :key="product._id"
        >
          <span class="item-img">
            <img :src="product.imgUrl" />
          </span>
          <span class="item-detail">
            <span class="item-detail__title">{{ product.name }}</span>
            <span class="item-detail__price">
              <span class="unit-price"
                ><span class="price-yen">&yen;</span>{{ product.price }}&nbsp;</span
              >
              <span class="unit-amount">*&nbsp;{{ product.count }}</span>
            </span>
          </span>
          <span class="price-total">
            &yen;{{ (product.price * product.count).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>

    <MainDocker />
  </div>
</template>

<script>
import MainDocker from '../../components/MainDocker'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'Cart',
  components: {
    MainDocker
  },
  setup () {
    const router = useRouter()
    const list = JSON.parse(localStorage.cartList || '[]')

    for (const i in list) {
      let total = 0
      const cart = list[i]
      const productList = cart.productList
      for (const j in productList) {
        const product = productList[j]
        total += product.count
      }
      cart.total = total
    }

    // 计算购物车是否为空
    const isEmpty = computed(() => {
      if (list.length === 0) return true
      // 检查所有店铺的商品总数
      return Object.values(list).every(cart => cart.total <= 0)
    })

    // 计算总商品数量
    const totalCount = computed(() => {
      let total = 0
      for (const key in list) {
        total += list[key].total || 0
      }
      return total
    })

    // 去逛逛按钮点击事件
    const goShopping = () => {
      router.push('/')
    }

    const handleCartClick = (key) => {
      router.push(`/shop/${key}`)
    }
    console.log(list)
    return { list, handleCartClick, isEmpty, totalCount, goShopping }
  },
  mounted () {
    // 强制滚动到顶部
    window.scrollTo(0, 0)
  },
  activated () {
    // 每次激活时都滚动到顶部
    this.$nextTick(() => {
      window.scrollTo(0, 0)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.layout {
  /* 定位 */
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  min-height: calc(100vh - 1.1rem);

  background-color: #f5f5f5;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  /* 盒模型 */
  padding: 0.6rem 0.18rem 0.7rem;
}

.header {
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  height: 0.44rem;
  line-height: 0.44rem;
  background-color: #ffffff;
  text-align: center;
  font-size: 0.16rem;
  color: $content-font-color;
  z-index: 1000;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  min-height: calc(100vh - 1.1rem - 1.2rem);

  &__icon {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
    opacity: 0.5;
  }

  &__text {
    font-size: 0.16rem;
    color: #999;
    margin-bottom: 0.3rem;
  }

  &__btn {
    padding: 0.1rem 0.4rem;
    background-color: $color-docker;
    color: white;
    border: none;
    border-radius: 0.2rem;
    font-size: 0.14rem;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
}

// 调整布局，当购物车为空时
.layout:has(.empty-cart) {
  display: flex;
  justify-content: center;
  align-items: center;
}

.products {
  background: #ffffff;
  min-height: 0.92rem;
  max-height: 2.08rem;
  padding: 0.16rem;
  margin-bottom: 0.16rem;
  box-sizing: content-box;
  width: 3.07rem;
  border-radius: 0.06rem;
  box-shadow: 0 0.01rem 0.02rem rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &__title {
    line-height: 0.22rem;
    color: $content-font-color;
    font-size: 0.16rem;
    margin-bottom: 0.16rem;
    font-weight: 600;

    span {
      font-weight: 400;
      font-size: 0.14rem;
      color: #666666;
    }
  }

  &__list {
    max-height: 1.7rem;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  &--disable {
    display: none;
  }
}

.info-item {
  display: flex;
  line-height: 0.46rem;
  text-align: center;
  font-size: 0.14rem;
  padding: 0;
  margin-bottom: 0.16rem;

  .item-img {
    width: 0.46rem;
    height: 0.46rem;
    margin-right: 0.16rem;
    background-color: $search-background;

    img {
      width: 100%;
      height: 100%
    }
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

    .unit-price,
    .unit-amount {
      font-weight: 600;
      color: $jingdong-red;
      height: 0.2rem;
      display: flex;
      align-items: baseline;
    }
  }

  .price-yen {
    font-size: 0.12rem;
  }

  .price-total {
    width: 0.6rem;
    font-weight: 600;
    color: $jingdong-red;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
