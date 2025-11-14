<template>
  <div class="nearby-stores">
    <h3 class="nearby-stores__title">附近店铺</h3>
    <div class="nearby-stores__item">
      <img
        class="nearby-stores__item__icon"
        src="../.././assets/storeicons/near.png"
      />
      <div class="nearby-stores__item__content">
        <p class="nearby-stores__item__content__title">沃尔玛</p>
        <div class="nearby-stores__item__content__tags">
          <span class="nearby-stores__item__content__tags__sold"
            >已售 9000+</span
          >
          <span class="nearby-stores__item__content__tags__threshold"
            >起送 $6.99</span
          >
          <span class="nearby-stores__item__content__tags__basis"
            >基础运费 $0.99</span
          >
        </div>
        <p class="nearby-stores__item__content__ads">
          VIP尊享满89元送4元运费券（每月3张）
        </p>
      </div>
    </div>

    <div class="nearby-stores__item">
      <img
        class="nearby-stores__item__icon"
        src="../.././assets/storeicons/near.png"
      />
      <div class="nearby-stores__item__content">
        <p class="nearby-stores__item__content__title">沃尔玛</p>
        <div class="nearby-stores__item__content__tags">
          <span class="nearby-stores__item__content__tags__sold"
            >已售 9000+</span
          >
          <span class="nearby-stores__item__content__tags__threshold"
            >起送 $6.99</span
          >
          <span class="nearby-stores__item__content__tags__basis"
            >基础运费 $0.99</span
          >
        </div>
        <p class="nearby-stores__item__content__ads">
          VIP尊享满89元送4元运费券（每月3张）
        </p>
      </div>
    </div>

    <div class="nearby-stores__item">
      <img
        class="nearby-stores__item__icon"
        src="../.././assets/storeicons/near.png"
      />
      <div class="nearby-stores__item__content">
        <p class="nearby-stores__item__content__title">沃尔玛</p>
        <div class="nearby-stores__item__content__tags">
          <span class="nearby-stores__item__content__tags__sold"
            >已售 9000+</span
          >
          <span class="nearby-stores__item__content__tags__threshold"
            >起送 $6.99</span
          >
          <span class="nearby-stores__item__content__tags__basis"
            >基础运费 $0.99</span
          >
        </div>
        <p class="nearby-stores__item__content__ads">
          VIP尊享满89元送4元运费券（每月3张）
        </p>
      </div>
    </div>

    <div class="nearby-stores__item">
      <img
        class="nearby-stores__item__icon"
        src="../.././assets/storeicons/near.png"
      />
      <div class="nearby-stores__item__content">
        <p class="nearby-stores__item__content__title">沃尔玛</p>
        <div class="nearby-stores__item__content__tags">
          <span class="nearby-stores__item__content__tags__sold"
            >已售 9000+</span
          >
          <span class="nearby-stores__item__content__tags__threshold"
            >起送 $6.99</span
          >
          <span class="nearby-stores__item__content__tags__basis"
            >基础运费 $0.99</span
          >
        </div>
        <p class="nearby-stores__item__content__ads">
          VIP尊享满89元送4元运费券（每月3张）
        </p>
      </div>
    </div>

    <div class="nearby-stores__item">
      <img
        class="nearby-stores__item__icon"
        src="../.././assets/storeicons/near.png"
      />
      <div class="nearby-stores__item__content">
        <p class="nearby-stores__item__content__title">沃尔玛</p>
        <div class="nearby-stores__item__content__tags">
          <span class="nearby-stores__item__content__tags__sold"
            >已售 9000+</span
          >
          <span class="nearby-stores__item__content__tags__threshold"
            >起送 $6.99</span
          >
          <span class="nearby-stores__item__content__tags__basis"
            >基础运费 $0.99</span
          >
        </div>
        <p class="nearby-stores__item__content__ads">
          VIP尊享满89元送4元运费券（每月3张）
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NearbyStores'
}
</script>

<style lang="scss">
@import "../.././style/viriables.scss";
@import "../.././style/mixins.scss";
.nearby-stores {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    padding: 0;
    font-size: 0.18rem;
    font-weight: 500;
    line-height: 0.25rem;
    color: $content-font-color;
  }
  &__item {
    display: flex;
    padding: 0.12rem 0 0 0;
    &__icon {
      width: 0.56rem;
      height: 0.56rem;
      margin-right: 0.16rem;
    }
    &__content {
      flex: 1;
      height: 0.56rem;
      padding-bottom: 0.27rem;
      color: $content-font-color;
      border-bottom: 1px solid #e1e1e1;
      &__title {
        font-size: 0.16rem;
        line-height: 0.22rem;
        margin: 0 0 0.08rem 0; // p元素 清除自带高度
      }
      &__tags {
        font-size: 0.13rem;
        line-height: 0.18rem;
        width: 2.5rem;
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
}
</style>
