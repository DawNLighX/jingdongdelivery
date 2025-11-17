<template>
  <div class="layout">
    <img class="layout__img" src="../../assets/icons/京东到家.png" />
    <div class="layout__input">
      <input
        class="layout__input__username"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="layout__input">
      <input
        class="layout__input__password"
        type="password"
        placeholder="请输入密码"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="layout__login-btn" @click="handleLogin">登录</div>
    <div class="layout__link">
      <span class="layout__link__register-btn" @click="handleToRegister"
        >立即注册</span
      >
      <span class="layout__link__middle">|</span>
      <span class="layout__link__forget-btn">忘记密码</span>
    </div>
    <Toast :message="toastMessage" :show="show" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request.js'
import Toast, { toastEffect } from '../../components/Toast.vue'

const loginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '' })

  const handleLogin = async () => {
    try {
      const { username, password } = data

      if (!username && !password) {
        showToast('用户名与密码不能为空！')
        return false
      }

      if (!password) {
        showToast('密码不能为空！')
        return false
      }

      if (!username) {
        showToast('用户名不能为空！')
        return false
      }

      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)

  return { handleLogin, username, password }
}

const toRegisterEffect = () => {
  const router = useRouter()
  const handleToRegister = () => {
    router.push({ name: 'Register' })
  }
  return { handleToRegister }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = toastEffect()
    const { handleLogin, username, password } = loginEffect(showToast)
    const { handleToRegister } = toRegisterEffect()
    // const handleLogin = () => {
    //   localStorage.isLogin = true
    //   router.push({ name: 'Home' })
    // }
    return { handleLogin, handleToRegister, username, password, show, toastMessage }
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
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none
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
