<template>
  <div class="shop">
    <img class="shop__icon" :src="item.imgUrl" />
    <div :class="{'shop__content': true }">
      <p class="shop__content__title">{{ item.name }}</p>
      <div class="shop__content__tags">
        <span>月售 <span class="shop__content__tag">{{ item.sales }}</span></span>
        <span>起送 <span class="shop__content__tag">&yen;{{ item.expressLimit }}</span></span>
        <span>基础运费 <span class="shop__content__tag">&yen;{{ item.expressPrice }}</span></span>
      </div>
      <p class="shop__content__ads">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'hideBorder'],
  name: 'ShopInfo'
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";
.shop {
  display: flex;
  padding: 0;
  &__icon {
    width: 0.56rem;
    height: 0.56rem;
    margin-right: 0.16rem;
  }
  &__content {
    flex: 1;
    height: 0.56rem;
    padding-bottom: 0rem;
    color: $content-font-color;
    &__title {
      font-size: 0.16rem;
      font-weight: 600;
      height: 0.22rem;
      margin: 0 0 0.08rem 0; // p元素 清除自带高度
    }
    &__tags {
      font-size: 0.13rem;
      color: #888888;
      line-height: 0.18rem;
      width: 2.6rem;
      display: grid;
      grid-template-columns: 1fr 1fr 1.5fr;
    }
    &__ads {
      font-size: 0.13rem;
      color: $jingdong-red;
      margin: 0.08rem 0 0 0;
    }
  }
}
</style>
