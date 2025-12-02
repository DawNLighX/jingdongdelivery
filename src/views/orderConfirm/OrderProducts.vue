<template>
  <div class="products">
    <div class="products__title">
      {{ shopName }}
      <span>（共 <b>{{ totalAmount }}</b> 件商品）</span>
    </div>
    <div class="products__list">
      <div
        :class="{
          'info-item': true,
          'info-item--disable': item.count <= 0,
        }"
        v-for="item in productList"
        :key="item._id"
      >
        <span class="item-img">
          <img :src="item.imgUrl" />
        </span>
        <span class="item-detail">
          <span class="item-detail__title">{{ item.name }}</span>
          <span class="item-detail__price">
            <span class="unit-price"
              ><span class="price-yen">&yen;</span>{{ item.price }}&nbsp;</span
            >
            <span class="unit-amount">*&nbsp;{{ item.count }}</span>
          </span>
        </span>
        <span class="price-total">
          &yen;{{ (item.price * item.count).toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const cartEffect = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const cartList = store.state.cartList

  const totalAmount = computed(() => {
    const productList = cartList[shopId]?.productList
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    return Object.values(productList)
  })

  const shopName = computed(() => {
    return route.query.shopName || store.state.cartList[shopId]?.shopName || ''
  })

  return { totalAmount, productList, shopName }
}

export default {
  name: 'OrderProducts',
  setup () {
    const { totalAmount, productList, shopName } = cartEffect()
    return { totalAmount, productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.products {
  background: #ffffff;
  min-height: 0.92rem;
  max-height: 3.73rem;
  padding: 0.16rem;
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
    max-block-size: 3.34rem; // 332.69
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
  margin-bottom: 0.16rem;

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

  &--disable {
    display: none;
  }
}
</style>
