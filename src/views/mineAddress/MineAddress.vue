<template>
  <header class="header">
    <span class="header__back iconfont" @click="handleGoBack()">&#xe66a;</span>
    <span class="header__title">我的地址</span>
    <span class="header__oprate" @click="handleGoOprate()">新建</span>
  </header>
  <div class="layout">
    <div class="title">我的收货地址</div>
    <div class="address" v-for="item in addressList" :key="item._id">
      <div class="address__info">
        <div class="address__info__personal">
          <span class="personal-name">{{item.name}}</span>
          <span class="personal-phone">{{item.phone}}</span>
        </div>
        <div class="address__info__location">{{item.city}} {{ item.department }} {{ item.houseNumber }}</div>
      </div>
      <span class="address__edit iconfont">&#xe66b;</span>
    </div>
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
  name: 'MineAddress',
  setup () {
    const router = useRouter()

    const handleGoBack = () => {
      router.back()
    }

    const handleGoOprate = () => {
      router.push('/mineAddressCreate')
    }

    const { addressList, getAddressList } = useAddressListEffect()
    getAddressList()
    return { handleGoBack, handleGoOprate, addressList, getAddressList }
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

.title{
  font-size: 0.14rem;
  color: $content-font-color;
  line-height: 0.20rem;
  height: 0.20rem;
  margin-bottom: 0.12rem;
}

.address {
  padding: 0.18rem 0.16rem;
  margin-bottom: 0.16rem;
  box-sizing: content-box;
  height: 0.68rem;
  width: 3.07rem;
  background-color: #ffffff;
  border-radius: 0.06rem;
  box-shadow: 0 0.01rem 0.02rem rgba(0, 0, 0, 0.1);
  z-index: 1000;

  display: flex;
  align-items: center;

  &__info {
    flex: 1;
    height: 100%;

    &__personal {
      text-align: left;
      margin-bottom: 0.08rem;
      width: 1.76rem;
      display: flex;
      justify-content: space-between;

      .personal-name,
      .personal-phone {
        display: inline-block;
        line-height: 0.17rem;
        height: 0.17rem;
        color: #999999;
        font-size: 0.14rem;
        font-weight: 600;
      }

      .personal-name {
        width: 0.8rem;
      }

      .personal-phone {
        flex: 1;
      }
    }

    &__location {
      line-height: 0.2rem;
      height: 0.43rem;
      color: $content-font-color;
      font-size: 0.14rem;
      width: 2.6rem;
    }
  }

  &__edit {
    line-height: 1;
    font-size: 0.2rem;
    color: #666666;
    margin-left: auto;
  }
}

</style>
