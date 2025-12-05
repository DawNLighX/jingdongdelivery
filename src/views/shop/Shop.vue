<template>
  <div class="layout">
    <div class="search">
      <div class="search__return iconfont" @click="handleGoBack">&#xe66a;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe62b;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称搜索"
        />
      </div>
    </div>
    <div class="shop-info-container">
      <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    </div>
  </div>
  <Product :shopName="item.name" />
  <CartDocker :shopName="item.name" />
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Product from './Product.vue'
import CartDocker from './CartDocker.vue'

const shopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const getItemData = async () => {
    const result = await get(`api/shop/${route.params.id}`)
    if (result.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getItemData }
}

const goBackEffect = () => {
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }
  return { handleGoBack }
}

export default {
  name: 'Shop',
  components: { ShopInfo, Product, CartDocker },
  setup () {
    const { item, getItemData } = shopInfoEffect()
    const { handleGoBack } = goBackEffect()

    getItemData()

    return { item, handleGoBack }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.layout {
  margin: 0 0.18rem;
  background-color: #fff;
}

.search {
  margin: 0.14rem 0 0.16rem 0;
  height: 0.32rem;
  display: flex;

  &__return {
    width: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.25rem;
    color: #666666;

    // 移除点击高亮效果
    -webkit-tap-highlight-color: transparent;
    // 防止文字被选中
    user-select: none;
  }

  &__content {
    display: flex;
    flex: 1;
    align-items: center;
    line-height: 0.32rem;
    background-color: $search-background;
    border-radius: 0.16rem;

    &__icon {
      width: 0.36rem;
      font-size: 0.16rem;
      margin-left: 0.04rem;
      text-align: center;
      color: #b7b7b7;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__input {
      line-height: 0.32rem;
      font-size: 0.14rem;
      color: $content-font-color;
      width: 2.4rem;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: transparent;
      display: block;
      caret-color: $placeholder-caret-color;
      // 移除点击高亮效果
      -webkit-tap-highlight-color: transparent;
      // 保持统一样式
      -webkit-appearance: none;
      -moz-appearance: none; // Firefox
      appearance: none;
      // 确保输入框内容垂直居中
      height: 100%;
      padding: 0;
      color: $content-font-color;
    }
  }
}

.shop-info-container {
  // 确保占位容器高度与 ShopInfo 一致
  min-height: 0.71rem;
}

:deep(.shop__content__tags) {
  font-weight: 600;
  .shop__content__tag {
    color: $content-font-color;
  }
}
</style>
