<template>
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

<script>
export default {
  name: 'Docker'
}
</script>

<style lang="scss">
@import "../.././style/viriables.scss";
@import "../.././style/mixins.scss";

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
