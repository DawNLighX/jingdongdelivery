<template>
  <div class="layout">
    <img class="layout__img" src="../../assets/icons/京东到家.png" />
    <div class="layout__input">
      <input
        class="layout__input__username"
        type="username"
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
    <div class="layout__input">
      <input
        class="layout__input__password"
        type="password"
        placeholder="请再次确认密码"
        v-model="ensurement"
      />
    </div>
    <div class="layout__register-login-btn" @click="handleRegister">注册并登录</div>
    <div class="layout__link" @click="handleToLogin">
      <span class="layout__link__middle">已有账号？去登录</span>
    </div>
    <Toast :message="toastMessage" :show="show" />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request.js'
import Toast, { toastEffect } from '../../components/Toast.vue'

const registerEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ username: '', password: '', ensurement: '' })

  const handleRegister = async () => {
    try {
      const { username, password, ensurement } = data

      if (!username) {
        showToast('用户名不能为空')
        return false
      }

      if (!password) {
        showToast('密码不能为空')
        return false
      }

      if (!ensurement) {
        showToast('请确认密码')
        return false
      }

      if (password !== ensurement) {
        showToast('两次密码输入不一致')
        return false
      }

      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password, ensurement } = toRefs(data)

  return { handleRegister, username, password, ensurement }
}

const toLoginEffect = () => {
  const router = useRouter()
  const handleToLogin = () => {
    router.push({ name: 'Login' })
  }
  return { handleToLogin }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = toastEffect()
    const { handleRegister, username, password, ensurement } = registerEffect(showToast)
    const { handleToLogin } = toLoginEffect()

    return { handleRegister, handleToLogin, username, password, ensurement, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";

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
      -moz-appearance: none;
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

  &__register-login-btn {
    margin: 0.32rem 0.4rem 0.16rem 0.4rem;
    background: $color-login;
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
  }
}
</style>
