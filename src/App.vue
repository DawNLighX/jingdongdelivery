<template>
  <div class="layout">
    <header class="position">
      <div class="position__icon position__icon--locate iconfont">&#xe61f;</div>
      <div class="position__content">保定市徐水区 保险公司家属院东单元202</div>
      <div class="position__icon position__icon--notice iconfont">&#xe637;</div>
    </header>
    <search class="search" role="search">
      <span class="search__icon iconfont">&#xe62b;</span>
      <span class="search__input"><input type="text" /></span>
    </search>
    <div class="banner"><img src="./assets/images/banner.jpg" /></div>
    <div>123123</div>
  </div>

  <footer class="docker">
    <div class="docker__item active">
      <span class="docker__item__icon iconfont">&#xe6b8;</span>
      <span class="docker__item__title">首页</span>
    </div>
    <div class="docker__item">
      <span class="docker__item__icon iconfont">&#xe6af;</span>
      <span class="docker__item__title">购物车</span>
    </div>
    <div class="docker__item">
      <span class="docker__item__icon iconfont">&#xe60e;</span>
      <span class="docker__item__title">订单</span>
    </div>
    <div class="docker__item">
      <span class="docker__item__icon iconfont">&#xe78b;</span>
      <span class="docker__item__title">我的</span>
    </div>
  </footer>
</template>

<style lang="scss">
@import "./style/viriables.scss";
@import "./style/mixins.scss";
.layout {
  /* 定位 */
  position: relative;
  left: 0;
  right: 0;
  top: 0;

  /* 盒模型 */
  padding: 0 0.18rem 0.7rem;
}

.position {
  /* grid布局 */
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;

  /* 盒模型 */
  padding: 0.12rem 0;
  line-height: 0.22rem;

  /* 文本 */
  color: $content-font-color;

  .position__icon {
    /* 文本 */
    font-size: 0.2rem;
  }
  .position__content {
    /* 盒模型 */
    max-width: 2.4rem;
    margin-left: 0.08rem;

    /* 文本 */
    font-size: 0.15rem;

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
  background-color: #eeeeee;
  border-radius: 0.16rem;

  .search__icon {
    /* 布局 */
    display: flex;
    align-items: center;
    justify-content: center;

    /* 文本 */
    font-size: 0.18rem;
    color: #aaaaaa;

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

.docker {
  /* 定位 */
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;

  /* 布局 */
  display: flex;
  align-items: center;
  justify-content: space-around;

  /* 盒模型 */
  width: 100%;
  height: 0.52rem;
  box-sizing: border-box;
  padding: 0 0.18rem;
  padding-bottom: env(safe-area-inset-bottom); //安全区域适配
  border-top: 0.01rem solid #f8f8f8;

  /* 视觉 */
  background: rgba(255, 255, 255, 0.9);
  color: $content-font-color;
  backdrop-filter: blur(0.15rem);
  -webkit-backdrop-filter: blur(0.15rem); //毛玻璃
}

.docker__item {
  /* 布局 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;

  /* 盒模型 */
  flex: 1;
  height: 100%;

  /* 交互 */
  cursor: pointer;

  /* 动画 */
  transition: color 0.2s ease;

  .docker__item__icon {
    /* 盒模型 */
    margin-top: 0.05rem;

    /* 文本 */
    font-size: 0.24rem;
    line-height: 1;
  }

  .docker__item__title {
    /* 盒模型 */
    margin-top: 0.05rem;

    /* 文本 */
    font-size: 0.11rem;
  }

  &.active {
    /* 文本 */
    color: $jingdong-red;
  }
}
</style>
