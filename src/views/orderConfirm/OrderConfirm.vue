<template>
  <div class="layout">
    <OrderHeader />
    <OrderProducts />
    <OrderDocker />
  </div>
</template>

<script>
import OrderHeader from './OrderHeader'
import OrderDocker from './OrderDocker'
import OrderProducts from './OrderProducts'

export default {
  name: 'OrderConfirm',
  components: { OrderHeader, OrderDocker, OrderProducts }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.layout {
  @include commonlayout;
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
