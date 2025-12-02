<template>
  <div class="layout">
    <StaticPart></StaticPart>
    <NearbyStores></NearbyStores>
  </div>
  <Docker></Docker>
</template>

<script>
import Docker from './Docker.vue'
import NearbyStores from './NearbyStores.vue'
import StaticPart from './StaticPart.vue'

export default {
  name: 'Home',
  components: {
    StaticPart, NearbyStores, Docker
  },
  data () {
    return {
      scrollPosition: 0 // 保存滚动位置
    }
  },
  activated () {
    // 从商家页面返回时恢复滚动位置
    this.$nextTick(() => {
      window.scrollTo(0, this.scrollPosition)
    })
  },
  beforeRouteLeave (to, from, next) {
    // 点击商家时保存当前位置
    if (to.name === 'Shop') {
      this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop
    }
    next()
  },
  mounted () {
    // 组件挂载时也恢复位置（防止刷新后丢失）
    this.$nextTick(() => {
      if (this.scrollPosition > 0) {
        window.scrollTo(0, this.scrollPosition)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.layout {
  /* 定位 */
  position: relative;
  left: 0;
  right: 0;
  top: 0;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  /* 盒模型 */
  padding: 0 0.18rem 0.7rem;
  background-color: #ffffff;

  background: linear-gradient(
    to bottom,
    $jingdong-green 0,
    $jingdong-green 0.5rem,
    #ffffff 1rem
  );
}
</style>
