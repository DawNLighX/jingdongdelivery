<template>
  <header class="header">
    <span class="header__back iconfont" @click="handleGoBack()">&#xe66a;</span>
    <span class="header__title">{{ $route.query.id ? '编辑收货地址' : '新建收货地址' }}</span>
    <span class="header__oprate" @click="handleSave()">保存</span>
  </header>
  <div class="layout">
    <main class="content">
      <p class="content__item">
        <span class="content__item__title">所在城市：</span>
        <input
          class="content__item__input"
          placeholder="如 河北省保定市徐水区"
          v-model="city"
        />
      </p>
      <p class="content__item">
        <span class="content__item__title">小区/大厦/学校：</span>
        <input
          class="content__item__input"
          placeholder="如 河北农业大学"
          v-model="department"
        />
      </p>
      <p class="content__item">
        <span class="content__item__title">楼号-门牌号：</span>
        <input
          class="content__item__input"
          placeholder="如 东单元202"
          v-model="doorNumber"
        />
      </p>
      <p class="content__item">
        <span class="content__item__title">收货人：</span>
        <input
          class="content__item__input"
          placeholder="请填写收货人的姓名"
          v-model="personname"
        />
      </p>
      <p class="content__item">
        <span class="content__item__title">联系电话：</span>
        <input
          class="content__item__input"
          placeholder="请填写收货手机号"
          v-model="phone"
        />
      </p>
    </main>
  </div>
  <Toast :message="toastMessage" :show="show" />
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs, onMounted } from 'vue'
import { post, get } from '../../utils/request.js'
import Toast, { toastEffect } from '../../components/Toast.vue'

export default {
  name: 'MineAddressCreate',
  components: { Toast },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const id = route.query.id

    // 只有一个data对象
    const formData = reactive({
      city: '',
      department: '',
      doorNumber: '',
      personname: '',
      phone: ''
    })

    // Toast相关
    const { show, toastMessage, showToast } = toastEffect()

    // 加载单个地址数据
    const loadSingleAddress = async () => {
      if (!id) return
      try {
        const result = await get(`/api/user/address/${id}`)
        if (result?.errno === 0 && result?.data) {
          const address = result.data
          formData.city = address.city || ''
          formData.department = address.department || ''
          formData.doorNumber = address.houseNumber || ''
          formData.personname = address.name || ''
          formData.phone = address.phone || ''
        }
      } catch (error) {
        console.error('加载失败:', error)
      }
    }

    // 返回首页
    const handleGoBack = () => {
      router.back()
    }

    // 保存地址
    const handleSave = async () => {
      try {
        // 验证表单
        if (!formData.city) {
          showToast('请填写省市县！')
          return false
        }

        if (!formData.department) {
          showToast('请填写小区/大厦/学校！')
          return false
        }

        if (!formData.doorNumber) {
          showToast('请填写楼号-门牌号！')
          return false
        }

        if (!formData.personname) {
          showToast('请填写收货人姓名！')
          return false
        }

        if (!formData.phone) {
          showToast('请填写收货人电话号码！')
          return false
        }

        const requestData = {
          city: formData.city,
          department: formData.department,
          doorNumber: formData.doorNumber,
          name: formData.personname,
          phone: formData.phone
        }

        let result
        if (id) {
          // 编辑模式
          result = await post('/api/user/address', requestData)
        } else {
          // 新建模式
          result = await post('/api/user/address', requestData)
        }

        if (result?.errno === 0) {
          showToast(id ? '地址更新成功' : '地址新建成功')
          setTimeout(() => {
            router.push('/mineAddress')
          }, 1500)
        } else {
          showToast(result?.errmsg || (id ? '更新失败' : '新建失败'))
        }
      } catch (e) {
        console.error('保存失败:', e)
        showToast('请求失败')
      }
    }

    // 组件挂载时加载地址数据（如果是编辑模式）
    onMounted(() => {
      loadSingleAddress()
    })

    // 使用toRefs将formData转换为ref，方便在模板中使用
    const { city, department, doorNumber, personname, phone } = toRefs(formData)

    return {
      handleGoBack,
      handleSave,
      city,
      department,
      doorNumber,
      personname,
      phone,
      show,
      toastMessage
    }
  },

  mounted () {
    window.scrollTo(0, 0)
  },
  activated () {
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
  padding: 0.6rem 0 0.8rem;
}

.content {
  background-color: #fff;
  &__item {
    margin: 0;
    height: 0.44rem;
    line-height: 0.44rem;
    display: flex;
    padding: 0 0.18rem;
    border-bottom: 0.01rem solid #f1f1f1 ;

    &__title {
      font-size: 0.14rem;
      color: #666666;
    }

    &__input {
      flex: 1;
      line-height: 0.44rem;
      font-size: 0.14rem;
      width: 2.1rem;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: transparent;
      display: block;
      caret-color: $placeholder-caret-color;
      -webkit-tap-highlight-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 100%;
      padding: 0;
      color: #3F3F3F;
    }
  }
}
</style>
