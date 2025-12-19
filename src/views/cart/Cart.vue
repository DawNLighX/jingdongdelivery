<template>
  <header class="header">我的购物车</header>

  <div class="layout">
    <!-- 加载动画 -->
    <div v-if="loading" class="empty-state loading-state">
      <div class="loading-spinner"></div>
      <p>加载购物车中...</p>
    </div>

    <div v-else>
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
          :class="{
            'info-item':true,
            'info-item--disable': product.count <= 0,
            }"
          v-for="product in cart.productList"
          :key="product._id"
        >
          <span class="item-img">
            <img v-lazy="product.imgUrl" alt="商品图片" />
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
  </div>
</template>

<script>
import MainDocker from '../../components/MainDocker'
import { useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { throttle } from '../../utils/throttle'

export default {
  name: 'Cart',
  components: {
    MainDocker
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const list = store.state.cartList

    // 模拟加载完成
    onMounted(() => {
      setTimeout(() => {
        loading.value = false
      }, 500)
    })

    // 计算购物车是否为空
    const isEmpty = computed(() => {
      return Object.keys(list).length === 0 || Object.values(list).every(cart => !cart.productList || Object.keys(cart.productList).length === 0)
    })

    // 计算总商品数量
    const totalCount = computed(() => {
      let total = 0
      for (const key in list) {
        const productList = list[key]?.productList || {}
        for (const productId in productList) {
          total += productList[productId].count || 0
        }
      }
      return total
    })

    // 购物车数量改变保存节流处理
    const handleCartChange = () => {
      // 数据已通过 Vuex mutation 自动保存到 localStorage
      console.log('购物车已保存')
    }
    const throttledCartChange = throttle(handleCartChange, 500)

    // 去逛逛按钮点击事件
    const goShopping = () => {
      router.push('/')
    }

    const handleCartClick = (key) => {
      // 在点击后执行节流的保存操作
      throttledCartChange()
      router.push(`/shop/${key}`)
    }
    console.log(list)
    return { list, handleCartClick, isEmpty, totalCount, goShopping, throttledCartChange }
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

/* 加载动画样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  text-align: center;
}

.loading-state {
  min-height: calc(100vh - 1.1rem);

  .loading-spinner {
    width: 0.4rem;
    height: 0.4rem;
    border: 0.03rem solid #f3f3f3;
    border-top: 0.03rem solid $jingdong-green;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 0.16rem;
  }

  p {
    font-size: 0.14rem;
    color: #999;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.layout {
  @include commonlayout;
}

.header {
  @include commonheader;
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

  &--disable {
    display: none;
  }

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

/* 加载动画样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0;
  text-align: center;
}

.loading-state {
  .loading-spinner {
    width: 0.4rem;
    height: 0.4rem;
    border: 0.03rem solid #f3f3f3;
    border-top: 0.03rem solid $jingdong-green;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 0.16rem;
  }

  p {
    font-size: 0.14rem;
    color: #999;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
