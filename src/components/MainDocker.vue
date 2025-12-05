<template>
  <footer class="docker">
    <div
      v-for="(item, index) in dockerList"
      :class="{
        'docker__item': true,
        'docker__item--active': currentIndex === index
      }"
      :key="item.icon"
      @click="handleItemClick(index, item)"
    >
      <router-link :to="item.to">
        <span class="docker__item__icon iconfont" v-html="item.icon"></span>
        <span class="docker__item__title">{{ item.text }}</span>
      </router-link>
    </div>
  </footer>
</template>

<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'MainDocker',
  props: {
    // 可以接收外部传入的导航配置
    navList: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const route = useRoute()
    const currentIndex = ref(0)

    // 默认的导航配置
    const defaultDockerList = [
      { icon: '&#xe6b8;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe6af;', text: '购物车', to: { name: 'Cart' } },
      { icon: '&#xe60e;', text: '订单', to: { name: 'Order' } },
      { icon: '&#xe78b;', text: '我的', to: { name: 'Mine' } } // 建议修改为实际的路由名
    ]

    // 使用传入的 navList 或默认配置
    const dockerList = props.navList.length > 0 ? props.navList : defaultDockerList

    // 根据当前路由自动激活对应的导航项
    const updateActiveIndex = () => {
      const currentRouteName = route.name
      const index = dockerList.findIndex(item =>
        item.to.name === currentRouteName ||
        (item.to.path && route.path.startsWith(item.to.path))
      )
      if (index !== -1) {
        currentIndex.value = index
      }
    }

    // 初始化时和路由变化时更新激活状态
    updateActiveIndex()
    watch(() => route.fullPath, updateActiveIndex)

    // 点击处理
    const handleItemClick = (index, item) => {
      currentIndex.value = index
      // 可以触发自定义事件
      // emit('item-click', { index, item })
    }

    return {
      dockerList,
      currentIndex,
      handleItemClick
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";

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
  padding-bottom: constant(safe-area-inset-bottom); // iOS 旧版本兼容
  border-top: 0.01rem solid #f8f8f8;

  /* 视觉 */
  -webkit-tap-highlight-color: transparent;
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
