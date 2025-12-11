<template>
  <header class="header">
    <span class="header__back iconfont" @click="handleGoBack()">&#xe66a;</span>
    <span class="header__title">新建收货地址</span>
    <span class="header__oprate" @click="handleSave()">保存</span>
  </header>
  <div class="layout">

  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'

const useAddressListEffect = () => {
  const addressList = ref([])

  const getAddressList = async () => {
    try {
      const result = await get('/api/user/address')
      if (result?.errno === 0 && result?.data?.length) {
        addressList.value = result.data
      } else {
        // 如果没有数据，设置空数组
        addressList.value = []
      }
    } catch (error) {
      addressList.value = error.message
      addressList.value = [] // 出错时也设置为空
    }
  }
  return { addressList, getAddressList }
}

export default {
  name: 'MineAddressCreate',
  setup () {
    const router = useRouter()

    const handleGoBack = () => {
      router.back()
    }

    const { addressList, getAddressList } = useAddressListEffect()
    getAddressList()
    return { handleGoBack, addressList, getAddressList }
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
