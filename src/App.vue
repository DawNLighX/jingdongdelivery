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

<style lang="scss">
.docker {
  display: flex;
  position: fixed;
  box-sizing: border-box;
  padding: 0 0.18rem;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0.52rem;
  align-items: center;
  justify-content: space-around;
  background-color: #ffffff;
  border-top: 1px solid #eee;
  padding-bottom: env(safe-area-inset-bottom); //安全区域适配
}

.docker__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  height: 100%;
  cursor: pointer;
  transition: color 0.2s ease;

  .docker__item__icon {
    margin-top: 0.06rem;
    font-size: 0.24rem;
    line-height: 1;
  }
  .docker__item__title {
    font-size: 0.11rem;
    margin-top: 0.04rem;
  }

  &.active {
    color: #e1251b; /* 京东红 */
  }
}
</style>
