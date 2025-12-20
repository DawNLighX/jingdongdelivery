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
          v-model="houseNumber"
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
      <p class="content__delete" v-if="$route.query.id" @click="handleDelete()">
        删除地址
      </p>
    </main>
  </div>
  <Toast :message="toastMessage" :show="show" />
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { reactive, toRefs, onMounted } from 'vue'
import { post, get, patch, del } from '../../utils/request.js'
import { debounceUniversal } from '../../utils/debounce'
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
      houseNumber: '',
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
          formData.houseNumber = address.houseNumber || ''
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
    const handleSaveOriginal = async () => {
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

        if (!formData.houseNumber) {
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
          houseNumber: formData.houseNumber,
          name: formData.personname,
          phone: formData.phone
        }

        let result
        if (id) {
          // 编辑模式
          result = await patch(`/api/user/address/${id}`, requestData)
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
          showToast(result?.message || (id ? '更新失败' : '新建失败'))
        }
      } catch (e) {
        console.error('保存失败:', e)
        showToast('请求失败')
      }
    }

    // 删除地址
    const handleDeleteOriginal = async () => {
      if (!confirm('确定要删除该地址吗？')) {
        return
      }

      try {
        const result = await del(`/api/user/address/${id}`)

        if (result?.errno === 0) {
          showToast('地址删除成功')
          setTimeout(() => {
            router.push('/mineAddress')
          }, 1500)
        } else {
          showToast(result?.message || '删除失败')
        }
      } catch (e) {
        console.error('删除失败:', e)
        showToast('删除请求失败')
      }
    }

    // 使用防抖处理保存，防止重复提交（500ms 延迟）
    const handleSave = debounceUniversal(handleSaveOriginal, 500, false)

    // 使用防抖处理删除，防止重复提交（500ms 延迟）
    const handleDelete = debounceUniversal(handleDeleteOriginal, 500, false)

    // 组件挂载时加载地址数据（如果是编辑模式）
    onMounted(() => {
      loadSingleAddress()
    })

    // 使用toRefs将formData转换为ref，方便在模板中使用
    const { city, department, houseNumber, personname, phone } = toRefs(formData)

    return {
      handleGoBack,
      handleSave,
      handleDelete,
      city,
      department,
      houseNumber,
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

  &__delete {
    margin: 0.28rem 0.18rem 0;
    display: block;
    width: calc(100% - 0.36rem);
    padding: 0.12rem 0;
    text-align: center;
    background: linear-gradient(90deg, $green-700 0%, darken($green-700, 6%) 100%);
    border: none;
    border-radius: 0.08rem;
    color: #ffffff;
    font-size: 0.14rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(12,168,12,0.18);
    transition: transform 0.12s ease, box-shadow 0.12s ease, opacity 0.12s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
      opacity: 0.95;
      box-shadow: 0 2px 4px rgba(0,0,0,0.08);
    }
  }
}
</style>
