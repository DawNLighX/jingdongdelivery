<template>
  <div class="product">
    <nav class="product__cats">
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
      <div class="product__cats__item">全部商品</div>
    </nav>
    <main class="product__info">
      <div class="product__info__item">我要O泡</div>
      <div class="product__info__item">我要O泡</div>
      <div class="product__info__item">我要O泡</div>
      <div class="product__info__item">我要O泡</div>
      <div class="product__info__item">我要O泡</div>
      <div class="product__info__item">我要O泡</div>
      <div class="product__info__item">我要O泡</div>
      <div class="product__info__item">我要O泡</div>
      <div class="product__info__item">我要O泡</div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Product'
}
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  position: absolute;
  background-color: #ddd;
  width: 100%;
  padding-top: 0.24rem;
  top: 1.33rem;
  bottom: .5rem;
  justify-content: space-between;
  &__cats {
    width:.76rem;
    background-color: #aaa;
    overflow-y: scroll;
    &__item {
      line-height: .4rem;
      text-align: center;
      font-size: .14rem;
      &--active {
        background: #ffffff;
      }
    }
  }
  &__info {
    flex: 1;
    background-color: #bbb;
    overflow-y: scroll;
    &__item {
      line-height: .68rem;
      text-align: center;
      font-size: .14rem;
      border-bottom: 0.01rem solid red;
      padding: .12rem 0;
      margin: 0 .18rem 0 .16rem;
      display: flex;
        &__img {
          width:.68rem;
          height:.68rem;
        }
    }
  }
}
</style>
