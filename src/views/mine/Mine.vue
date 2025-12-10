<template>
  <div class="layout">
    <div class="user-info">
      <div class="user-profile">
        <div class="user-profile__photo">
          <img />
        </div>
        <div class="user-profile__nickname">
          DawNLighX
        </div>
        <div class="user-profile__id">
          ID：1069643013{{ userId }}
        </div>
      </div>
      <div class="user-assets">
        <div class="user-assets__red-packet">
          <span class="user-assets__title">
            红包
          </span>
          <span class="user-assets__content">
            {{ 188 }}
          </span>
        </div>

        <div class="user-assets__coupons">
          <span class="user-assets__title">
            优惠券
          </span>
          <span class="user-assets__content">
            {{ 18 }}张
          </span>
        </div>

        <div class="user-assets__credits">
          <span class="user-assets__title">
            鲜豆
          </span>
          <span class="user-assets__content">
            {{ 19999 }}
          </span>
        </div>

        <div class="user-assets__loan">
          <span class="user-assets__title">
            白条
          </span>
          <span class="user-assets__content">
            {{ 8000 }}
          </span>
        </div>
      </div>
    </div>

    <div class="user-panel">

    </div>

  </div>
  <MainDocker />
</template>

<script>
import MainDocker from '../../components/MainDocker.vue'

export default {
  name: 'Mine',
  components: {
    MainDocker
  },
  setup () {

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
    $jingdong-green 1.0rem,
    #ffffff 2.4rem
  );
}

.user-info {
  margin-top: 1.08rem;
  box-sizing: content-box;
  height: 2.03rem;
  width: 3.39rem;
  background-color: #ffffff;
  border-radius: 0.08rem;
  box-shadow: 0 0.08rem 0.1rem 0 rgba(100, 100, 100, 0.1);
  z-index: 1000;
  position: absolute;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.user-profile {
  position: relative;
  width: 100%;
  height: 1.26rem;
  border-bottom: #f1f1f1 0.01rem solid;

  &__photo {
    position: absolute;
    top: -0.47rem;
    left: 50%;
    transform: translateX(-50%);
    width: 0.94rem;
    height: 0.94rem;
    border-radius: 50%;
    background-color: #dddddd;
  }

  &__nickname {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.59rem;
    min-width: 0.94rem;
    height: 0.36rem;
    line-height: 0.36rem;
    text-align: center;
    font-size: 0.24rem;
    color: #262628;
    letter-spacing: 0.0019rem;
  }

  &__id {
    width: 0.94rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.97rem;
    width: 1.62rem;
    height: 0.17rem;
    line-height: 0.17rem;
    font-size: 0.14rem;
    color: #C1C0C9;
    text-align: center;
  }
}

.user-assets {
  width: 100%;
  height: 0.76rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 0.80rem;
  }

  &__title{
    height: 0.17rem;
    line-height: 0.17rem;
    font-size: 0.12rem;
    color: #C1C0C9;
    text-align: center;
  }

  &__content{
    height: 0.28rem;
    line-height: 0.28rem;
    font-size: 0.2rem;
    color: #262628;
    text-align: center;
  }
}

.user-panel {
  box-sizing: content-box;
  height: 1.46rem;
  width: 3.39rem;
  background-color: #ffffff;
  border-radius: 0.08rem;
  box-shadow: 0 0.08rem 0.1rem 0 rgba(100, 100, 100, 0.1);
  z-index: 1000;
  position: absolute;
  margin-top: 3.27rem;

  display: flex;
  align-items: center;
  flex-direction: column;
}

</style>
