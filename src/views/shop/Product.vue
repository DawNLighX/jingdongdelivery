<template>
  <div class="product">
    <nav class="product__cats">
      <div
        :class="{
          'cats-item': true,
          'cats-item--active': currentTab === item.tab ? true : false,
        }"
        v-for="item in cats"
        :key="item.tab"
        @click="handelCatsClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </nav>
    <main class="product__info">
      <div class="info-item" v-for="item in productList" :key="item._id">
        <span class="item-img">
          <img :src="item.imgUrl">
        </span>
        <span class="item-detail">
          <span class="item-detail__title">{{ item.name }}</span>
          <span class="item-detail__sold">月售 {{ item.sales }} 件</span>
          <span class="item-detail__price">
            <span class="price-now"
              ><span class="price-yen">&yen;</span>{{ item.price }}</span
            >
            <span class="price-origin"
              ><span class="price-yen">&yen;</span>{{ item.oldPrice }}</span
            >
            <span class="price-amount">
              <span :class="{
                'price-amount__minus':true,
                'price-amount__minus--disable':cartList?.[shopId]?.productList?.[item._id]?.count > 0 ? true : false,
                'iconfont':true}"
                @click="changeItem(shopId, shopName, item._id, item, -1)"
              >&#xe607;</span>
              <span :class="{
                'price-amount__num':true,
                'price-amount__num--disable':cartList?.[shopId]?.productList?.[item._id]?.count > 0 ? true : false}"
              >{{cartList?.[shopId]?.productList?.[item._id]?.count || 0}}</span>
              <span class="price-amount__add iconfont"
                @click="changeItem(shopId, shopName, item._id, item, 1)"
              >&#xe606;</span>
            </span>
          </span>
        </span>
      </div>
    </main>
  </div>
</template>

<script>
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref, toRefs, watchEffect } from 'vue'

const cats = [
  {
    name: '全部商品',
    tab: 'all'
  },
  {
    name: '秒杀',
    tab: 'seckill'
  },
  {
    name: '新鲜水果',
    tab: 'fruit'
  },
  {
    name: '新鲜蔬菜',
    tab: 'vegetables'
  }
]

const tabEffect = () => {
  const currentTab = ref(cats[0].tab)
  const handelCatsClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handelCatsClick }
}

const listEffect = (currentTab, shopId) => {
  const data = reactive({ productList: [] })
  const getProductData = async (tab) => {
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length) {
      data.productList = result.data
    }
  }
  watchEffect(() => {
    getProductData()
  })
  const { productList } = toRefs(data) // 保证数据的响应式连接
  return { productList, shopId }
}

const cartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const changeItem = (shopId, shopName, productId, productInfo, num) => {
    store.commit('changeItem', { shopId, shopName, productId, productInfo, num })
  }
  const addShopName = (shopId, shopName) => {
    store.commit('addShopName', { shopId, shopName })
  }
  return { cartList, changeItem, addShopName }
}

export default {
  name: 'Product',
  props: ['shopName'],
  setup (props) {
    const route = useRoute()
    const shopId = route.params.id

    const { currentTab, handelCatsClick } = tabEffect()
    const { productList } = listEffect(currentTab, shopId)
    const { cartList, changeItem, addShopName } = cartEffect()
    // const { productList } = toRefs(data)
    // onMounted(() => {
    //   addShopName(shopId, props.shopName)
    // })
    const handleChangeItem = (shopId, shopName, productId, productInfo, num) => {
      changeItem(shopId, shopName, productId, productInfo, num)
    }

    return { cats, productList, currentTab, cartList, shopId, handelCatsClick, changeItem: handleChangeItem, addShopName }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.product {
  display: flex;
  position: absolute;
  width: 100%;
  padding-top: 0.24rem;
  top: 1.33rem;
  bottom: 0.5rem;
  justify-content: space-between;

  overscroll-behavior: contain;
  touch-action: pan-y;
  overflow: hidden;

  &__cats {
    width: 0.76rem;
    color: $content-font-color;
    background-color: $search-background;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    scrollbar-width: none;
    -ms-overflow-style: none;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;

    -webkit-tap-highlight-color: transparent;
      // 保持统一样式
    -webkit-appearance: none;
    -moz-appearance: none;    // Firefox
    appearance: none;
  }

  &__info {
    flex: 1;
    color: $content-font-color;
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

.cats-item {
  line-height: 0.4rem;
  text-align: center;
  font-size: 0.14rem;

  &--active {
    background: #ffffff;
  }
}

.info-item {
  display: flex;
  gap: 0.16rem;
  line-height: 0.68rem;
  text-align: center;
  font-size: 0.14rem;
  border-bottom: 0.01rem solid #f1f1f1;
  padding: 0.12rem 0;
  margin: 0 0.18rem 0 0.16rem;

  .item-img {
    width: 0.68rem;
    height: 0.68rem;
    background-color: $search-background;
    img {
      width: 0.68rem;
      height: 0.68rem;
    }
  }

  .item-detail {
    flex: 1;
    height: 0.68rem;
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

    &__sold {
      line-height: 0.16rem;
      height: 0.16rem;
      font-size: 0.12rem;
      display: flex;
      align-items: center;
    }

    &__price {
      height: 0.2rem;
      display: flex;
      align-items: center;
    }
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
  color: $placeholder-caret-color;

  .price-yen {
    font-size: 0.09rem;
  }
}
.price-amount {
  width: 0.68rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-tap-highlight-color: transparent;

  &__minus {
    font-size: 0.20rem;
    color: $gray-300;
    visibility: hidden;

    &--disable {
      visibility: visible;
    }
  }

  &__num {
    font-size: 0.14rem;
    visibility: hidden;
    &--disable {
      visibility: visible;
    }
  }

  &__add {
    font-size: 0.20rem;
    color: $green-300;
  }
}
</style>
