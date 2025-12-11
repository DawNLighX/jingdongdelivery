<template>
  <div class="layout">
    <StaticPart></StaticPart>
    <NearbyStores></NearbyStores>
  </div>
  <MainDocker></MainDocker>
</template>

<script>
import MainDocker from '../../components/MainDocker'
import NearbyStores from './NearbyStores'
import StaticPart from './StaticPart'

export default {
  name: 'Home',
  components: {
    StaticPart, NearbyStores, MainDocker
  },
  mounted () {
    // 强制滚动到顶部
    window.scrollTo(0, 0)
  },
  activated () {
    // 每次激活时都滚动到顶部
    this.$nextTick(() => {
      window.scrollTo(0, 0)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.layout {
  @include commonlayout;
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
