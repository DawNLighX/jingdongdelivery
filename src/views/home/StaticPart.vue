<template>
  <header class="position">
    <div class="position__icon position__icon--locate iconfont">&#xe61f;</div>
    <div class="position__content">保定市徐水区 保险公司家属院</div>
    <div class="position__icon position__icon--notice iconfont">&#xe637;</div>
  </header>

  <search class="search" role="search">
    <span class="search__icon iconfont">&#xe62b;</span>
    <span class="search__input"><input type="text" /></span>
  </search>

  <div class="banner"><img src="../.././assets/images/banner.jpg" /></div>

  <div class="icons">
    <div
      class="icons__item"
      v-for="(item, index) in iconsList"
      :key="index"
    >
      <img class="icons__item__img" :src="item.imgUrl" />
      <p class="icons__item__desc">{{ item.text }}</p>
    </div>
  </div>

  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      {
        text: '超市便利',
        imgUrl: require('@/assets/icons/超市@2x.png')
      },
      {
        text: '菜市场',
        imgUrl: require('@/assets/icons/菜市场@2x.png')
      },
      {
        text: '水果店',
        imgUrl: require('@/assets/icons/水果店@2x.png')
      },
      {
        text: '鲜花绿植',
        imgUrl: require('@/assets/icons/鲜花@2x.png')
      },
      {
        text: '医药健康',
        imgUrl: require('@/assets/icons/医药健康@2x.png')
      },
      {
        text: '家居时尚',
        imgUrl: require('@/assets/icons/家居@2x.png')
      },
      {
        text: '烘焙蛋糕',
        imgUrl: require('@/assets/icons/蛋糕@2x.png')
      },
      {
        text: '签到',
        imgUrl: require('@/assets/icons/签到@2x.png')
      },
      {
        text: '大牌免运',
        imgUrl: require('@/assets/icons/大牌免运@2x.png')
      },
      {
        text: '红包套餐',
        imgUrl: require('@/assets/icons/红包@2x.png')
      }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
@import "../.././style/viriables.scss";
@import "../.././style/mixins.scss";

.position {
  /* grid布局 */
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;

  /* 盒模型 */
  padding: 0.12rem 0;
  line-height: 0.22rem;

  /* 文本 */
  color: #ffffff;
  font-weight: 500;
  .position__icon {
    /* 文本 */
    font-size: 0.2rem;
  }
  .position__content {
    /* 盒模型 */
    max-width: 2.4rem;
    margin-left: 0.08rem;

    /* 文本 */
    font-size: 0.14rem;

    /* 溢出省略... */
    @include ellipsis;
  }
}

.search {
  /* 布局 */
  display: flex;
  align-items: center;

  /* 盒模型 */
  height: 0.32rem;
  padding: 0 0.12rem;
  margin-bottom: 0.12rem;
  box-sizing: border-box;

  /* 视觉 */
  background-color: #f8f8f8;
  border-radius: 0.16rem;
  border: none;

  .search__icon {
    /* 布局 */
    display: flex;
    align-items: center;
    justify-content: center;

    /* 文本 */
    font-size: 0.18rem;
    color: $placeholder-caret-color;

    /* 盒模型 */
    margin-right: 0.12rem;
    line-height: 1;
  }
  .search__input {
    /* 布局 */
    display: block;
    flex: 1;

    /* 文本 */
    font-size: 0.14rem;
  }
  .search__input input {
    /* 布局 */

    /* 盒模型 */
    width: 2.5rem;
    height: 100%;
    padding: 0;
    box-sizing: border-box;
    border: none;

    /* 文本 */
    font-size: 0.14rem;
    line-height: 0.32rem;

    /* 交互 */
    background: transparent;
    outline: none;
    display: block;
    caret-color: $placeholder-caret-color;
    -webkit-tap-highlight-color: transparent; /* 针对 WebKit 内核的浏览器 */
  }
}

.banner {
  /* 布局 */
  display: block;

  /* 盒模型 */
  height: 0;
  width: 100%;
  padding-bottom: 25.4%; // 利用内边距撑开盒子
  overflow: hidden;

  img {
    /* 布局 */
    display: block;

    /* 盒模型 */
    width: 100%;
    height: auto;
    max-width: 100%;
  }
}

.icons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .16rem;
  &__item {
    width: 20%;
    margin-top: 0.16rem;
    &__img {
      display: block;
      margin: 0 auto;
      width: 0.4rem;
      height: 0.4rem;
    }
    &__desc {
      line-height: 0.17rem;
      font-size: 0.12rem;
      margin: 0 auto;
      margin-top: 0.06rem;
      text-align: center;
      color: $content-font-color;
      font-weight: 500;
    }
  }
}

.gap {
  height: 0.1rem;
  background-color: #f8f8f8;
  margin: 0 -0.18rem;
}
</style>
