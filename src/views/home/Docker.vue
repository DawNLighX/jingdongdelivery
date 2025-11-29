<template>
  <footer class="docker">
    <div v-for="(item, index) in dockerList"
    :class="{'docker__item': true, 'docker__item--active': index === 0}"
    :key="item.icon"
    >
      <router-link :to="item.to">
        <span class="docker__item__icon iconfont" v-html="item.icon"></span>
        <span class="docker__item__title">{{item.text}}</span>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe6b8;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe6af;', text: '购物车', to: { name: 'Cart' } },
      { icon: '&#xe60e;', text: '订单', to: { name: 'Home' } },
      { icon: '&#xe78b;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

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
  &__item {
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

    &__icon {
      /* 盒模型 */
      margin-top: 0.05rem;

      /* 文本 */
      font-size: 0.24rem;
      line-height: 1;
    }

    &__title {
      /* 盒模型 */
      margin-top: 0.05rem;

      /* 文本 */
      font-size: 0.11rem;
    }
  }

  &__item--active {
    /* 文本 */
    color: $jingdong-green;
  }
}
</style>
