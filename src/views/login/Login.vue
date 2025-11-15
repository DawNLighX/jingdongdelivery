<template>
  <div class="layout">
    <img class="layout__img" src="../../assets/icons/京东到家.png" />
    <div class="layout__input">
      <input
        class="layout__input__username"
        type="username"
        placeholder="请输入手机号"
      />
    </div>
    <div class="layout__input">
      <input
        class="layout__input__password"
        type="password"
        placeholder="请输入密码"
      />
    </div>
    <div class="layout__login-btn" @click="handleLogin">登录</div>
    <div class="layout__link">
      <span class="layout__link__register-btn">立即注册</span>
      <span class="layout__link__middle">|</span>
      <span class="layout__link__forget-btn">忘记密码</span>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  // eslint-disable-next-line quotes, comma-dangle
  name: "Login",
  // eslint-disable-next-line semi
  setup () {
    const router = useRouter()
    const handleLogin = () => {
      localStorage.isLogin = true
      router.push({ name: 'Home' })
    }
    return { handleLogin }
  }
}
</script>

<style lang="scss" scoped>
@import "../.././style/viriables.scss";
.layout {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    height: 1.2rem;
    width: 1.2rem;
  }
  &__input {
    box-sizing: border-box;
    background: #ffffff;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    margin: 0 auto;
    padding: 0 0.16rem 0;
    width: 2.95rem;
    height: 0.48rem;
    margin-bottom: 0.16rem;
    display: flex;
    align-items: center;
    &:focus-within {
      border-color: $jingdong-green;
      box-shadow: 0 0 0 0.02rem rgba($jingdong-green, 0.1);
    }
    input {
      line-height: 0.46rem;
      height: 100%;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      box-sizing: border-box;
      font-size: 0.16rem; /* 优化字体大小 */
      color: #222222; /* 确保文字颜色足够深 */
      /* 交互 */
      -webkit-appearance: none;
      border-radius: 0;
      background: transparent;
      outline: none;
      caret-color: $placeholder-caret-color;
      -webkit-tap-highlight-color: transparent; /* 针对 WebKit 内核的浏览器 */
      &::placeholder {
        color: $placeholder-caret-color;
        font-size: 0.14rem;
      }
    }
  }
  &__login-btn {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: rgb(9, 156, 9);
    box-shadow: 0 0.04rem 0.08rem 0 rgba(9, 156, 9, 0.32);
    border-radius: 0.06rem;
    width: 2.95rem;
    height: 0.48rem;
    line-height: 0.48rem;
    text-align: center;
    font-size: 0.16rem;
    color: #ffffff;
  }
  &__link {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
    letter-spacing: 0;
    text-align: center;
    height: 0.2rem;
    line-height: 0.2rem;
    &__register-btn {
      width: 0.56rem;
      margin-right: 0.13rem;
    }
    &__forget-btn {
      width: 0.56rem;
      margin-left: 0.13rem;
    }
  }
}
</style>
