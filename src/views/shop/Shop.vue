<template>
  <div class="layout">
    <div class="search">
      <div class="search__return iconfont" @click="handleGoBack">&#xe66a;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont" >&#xe62b;</span>
        <input class="search__content__input" placeholder="请输入商品名称搜索"/>
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

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
  components: { ShopInfo },
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
  margin: 0.14rem 0 0.04rem 0;
  height: 0.32rem;
  display: flex;
  &__return {
    width: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    font-size:.25rem;
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
    background-color: #f5f5f5;
    border-radius: .16rem;
    &__icon {
        width:.36rem;
        font-size: 0.16rem;
        margin-left: 0.04rem;
        text-align: center;
        color: #B7B7B7;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &__input {
        line-height:.32rem;
        font-size:.14rem;
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
        -moz-appearance: none;    // Firefox
        appearance: none;
        // 确保输入框内容垂直居中
        height: 100%;
        padding: 0;
        color: $content-font-color;
    }
  }
}
</style>
