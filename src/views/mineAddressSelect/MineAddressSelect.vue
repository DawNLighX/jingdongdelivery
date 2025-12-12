<template>
  <header class="header">
    <span class="header__back iconfont" @click="handleGoBack()">&#xe66a;</span>
    <span class="header__title">请选择收货地址</span>
    <span class="header__oprate" @click="handleGoOprate()">新建</span>
  </header>
  <div class="layout">
    <!-- 加载状态 -->
    <div v-if="loading" class="empty-state loading-state">
      <div class="loading-spinner"></div>
      <p>加载地址中...</p>
    </div>

    <!-- 无地址状态 -->
    <div v-else-if="!addressList || addressList.length === 0" class="empty-state">
      <div class="empty-state__icon iconfont">&#xe66d;</div>
      <p class="empty-state__text">暂无收货地址</p>
      <p class="empty-state__subtext">添加地址以方便购物</p>
      <button class="empty-state__btn" @click="handleGoOprate">新建地址</button>
    </div>

    <!-- 有地址列表 -->
    <div v-else>
      <div class="address" v-for="item in addressList" :key="item._id" @click="handelSelectAddress(item._id)">
        <div class="address__info">
          <div class="address__info__personal">
            <span class="personal-name">{{item.name}}</span>
            <span class="personal-phone">{{item.phone}}</span>
          </div>
          <div class="address__info__location">{{item.city}} {{ item.department }} {{ item.houseNumber }}</div>
        </div>
        <span class="address__edit iconfont" @click="handleEditAddress(item._id)">&#xe66b;</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'

const useAddressListEffect = () => {
  const addressList = ref([])
  const loading = ref(true)

  const getAddressList = async () => {
    try {
      loading.value = true
      const result = await get('/api/user/address')
      if (result?.errno === 0 && result?.data?.length) {
        addressList.value = result.data
      } else {
        addressList.value = []
      }
    } catch (error) {
      console.error('获取地址失败:', error)
      addressList.value = []
    } finally {
      loading.value = false
    }
  }

  return { addressList, loading, getAddressList }
}

export default {
  name: 'MineAddressSelect',
  setup () {
    const router = useRouter()
    const route = useRoute()

    const handleGoBack = () => {
      router.back()
    }

    const handleGoOprate = () => {
      router.push('/mineAddressCreate')
    }

    const handleEditAddress = (id) => {
      router.push(`/mineAddressCreate?id=${id}`)
    }

    const handelSelectAddress = (id) => {
      const path = route.query.path
      router.push(`${path}?id=${id}`)
    }

    const { addressList, loading, getAddressList } = useAddressListEffect()
    getAddressList()
    return { handleGoBack, handleGoOprate, addressList, loading, getAddressList, handleEditAddress, handelSelectAddress }
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
    color: $content-font-color;
  }
}

.layout {
  @include commonlayout;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0;
  text-align: center;

  &__icon {
    font-size: 0.6rem;
    color: #d8d8d8;
    margin-bottom: 0.16rem;
  }

  &__text {
    font-size: 0.16rem;
    color: #999;
    margin-bottom: 0.08rem;
    font-weight: 500;
  }

  &__subtext {
    font-size: 0.12rem;
    color: #ccc;
    margin-bottom: 0.24rem;
  }

  &__btn {
    width: 1.2rem;
    height: 0.36rem;
    background: $green-500;
    color: #ffffff;
    border: none;
    border-radius: 0.18rem;
    font-size: 0.14rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: darken($green-500, 10%);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

.loading-state {
  .loading-spinner {
    width: 0.4rem;
    height: 0.4rem;
    border: 0.03rem solid #f3f3f3;
    border-top: 0.03rem solid $green-500;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 0.16rem;
  }

  p {
    font-size: 0.14rem;
    color: #999;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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
      width: 2.87rem;
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
        width: 1rem;
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
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 2;
      -webkit-box-orient: vertical;
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
