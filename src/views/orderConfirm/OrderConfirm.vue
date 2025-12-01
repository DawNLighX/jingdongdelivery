<template>
  <div class="layout">
    <div class="header">
      <div class="header__return-icon iconfont" @click="handleGoBack()">
        &#xe66a;
      </div>
      <div class="header__title">确认订单</div>
      <div class="header__address">
        <div class="header__address__info">
          <div class="info-title">收货地址</div>
          <div class="info-location">北京市朝阳区望京SOHO T3 1001室</div>
          <span class="info-name">张三（先生）</span>
          <span class="info-phone">13800138000</span>
        </div>
        <span class="header__address__select iconfont">&#xe66b;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

const goBackEffect = () => {
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }
  return { handleGoBack }
}

export default {
  name: 'OrderConfirm',
  setup () {
    const { handleGoBack } = goBackEffect()
    return { handleGoBack }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

.layout {
  /* 定位 */
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
    #ffffff 1.43rem
  );

  position: relative;
}

.header {
  height: 1.8rem;
  left: 0;
  width: 100%;
  position: relative;
  margin-bottom: 0.16rem;

  &__return-icon {
    left: 0;
    top: 0.25rem;
    font-size: 0.25rem;
    color: #ffffff;
    line-height: 0.22rem;
    position: absolute;
    z-index: 1000;
  }

  &__title {
    top: 0.25rem;
    width: 100%;
    font-size: 0.16rem;
    color: #ffffff;
    text-align: center;
    line-height: 0.22rem;
    position: absolute;
  }

  &__address {
    margin-top: 0.68rem;
    padding: 0.16rem;
    box-sizing: content-box;
    height: 0.79rem;
    width: 3.07rem;
    background-color: #ffffff;
    border-radius: 0.06rem;
    box-shadow: 0 0.01rem 0.02rem rgba(0, 0, 0, 0.1);
    z-index: 1000;
    position: absolute;

    display: flex;
    align-items: center;
    &__info {
      flex: 1;
      height: 100%;
    }
    &__select {
      line-height: 1;
      font-size: 0.2rem;
      color: #666666;
      margin-left: auto;
    }
  }
}

.info-title {
  line-height: 0.22rem;
  color: #333333;
  font-size: 0.16rem;
  margin-bottom: 0.14rem;
  font-weight: 600;
}

.info-location {
  line-height: 0.2rem;
  height: 0.2rem;
  color: #333333;
  font-size: 0.14rem;
  margin-bottom: 0.06rem;
}

.info-name,
.info-phone {
  display: inline-block;
  line-height: 0.17rem;
  height: 0.17rem;
  color: #666666;
  font-size: 0.12rem;
  margin-right: 0.06rem;
  width: 0.8rem;
}
</style>
