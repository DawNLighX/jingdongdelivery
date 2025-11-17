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
