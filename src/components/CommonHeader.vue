<template>
  <header class="header">
    <span class="header__back iconfont" @click="handleGoBack()">&#xe66a;</span>
    <span class="header__title">我的地址</span>
    <span class="header__oprate" @click="handleOprate()">新建</span>
  </header>
  <div class="layout"></div>
</template>

<script>
export default {
  name: 'MineAddress',
  setup () {
    return {}
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

.header {
  @include commonheader;
  display: flex;
  justify-content: space-between;

  &__back {
    margin-left: 0.18rem;
    font-size: 0.25rem;
    width: 0.28rem;
    text-align: left;
    color: #666666;
  }

  &__oprate {
    margin-right: 0.18rem;
    font-size: 0.14rem;
    width: 0.28rem;
  }
}

.layout {
  @include commonlayout;
}
</style>
