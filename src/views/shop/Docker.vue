<template>
  <footer class="docker">
      <div class="docker__cart">
        <span></span>
        <span></span>
      </div>
      <div class="docker__order">去结算</div>
  </footer>
</template>

<script>
export default {
  name: 'Docker'
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
  justify-content: space-between;

  /* 盒模型 */
  width: 100%;
  height: 0.50rem;
  box-sizing: border-box;
  padding-bottom: env(safe-area-inset-bottom); //安全区域适配

  /* 视觉 */
  background-color: rgba(255, 255, 255, 0.9);
  color: $content-font-color;
  backdrop-filter: blur(0.15rem);
  -webkit-backdrop-filter: blur(0.15rem); //毛玻璃
  &__cart {
    flex:1;
  }
  &__order {
    width:.98rem;
    line-height:.50rem;
    text-align: center;
    font-size: 14px;
    color: #FFFFFF;
    background-color: rgb(9, 156, 9);
  }
}
</style>
