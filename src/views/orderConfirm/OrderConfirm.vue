<template>
  <div class="layout">
    <OrderHeader />
    <OrderProducts />
    <OrderDocker />
  </div>
</template>

<script>
import OrderHeader from './OrderHeader.vue'
import OrderDocker from './OrderDocker.vue'
import OrderProducts from './OrderProducts.vue'

export default {
  name: 'OrderConfirm',
  components: { OrderHeader, OrderDocker, OrderProducts }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.layout {
  /* 定位 */
  position: relative;
  min-height: 100vh; /* 确保撑满整个视口 */
  box-sizing: border-box;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  /* 盒模型 */
  padding: 0 0.18rem 0.7rem 0.18rem;
  background-color: #ffffff;

  background: linear-gradient(
    to bottom,
    $jingdong-green 0,
    $jingdong-green 0.8rem,
    #f5f5f5 1.43rem
  );
}

</style>
