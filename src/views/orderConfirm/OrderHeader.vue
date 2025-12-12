<template>
  <header class="header">
    <div class="header__return-icon iconfont" @click="handleGoBack()">
      &#xe66a;
    </div>
    <div class="header__title">确认订单</div>
    <div class="header__address">
      <div class="header__address__info"  @click="handleGoSelect()">
        <div class="info-title">收货地址</div>
        <div class="info-location">{{ hasAddress ? `${data.city} ${data.department} ${data.houseNumber}` : '请选择收货地址'}}</div>
        <div class="info-personal" v-if="hasAddress">
          <span class="personal-name">{{data.name}}</span>
          <span class="personal-phone">{{data.phone}}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeMount } from '@vue/runtime-core'
import { get } from '../../utils/request.js'

const goBackEffect = () => {
  const router = useRouter()
  const handleGoBack = () => {
    router.back()
  }
  return { handleGoBack }
}

export default {
  name: 'OrderHeader',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const data = reactive({})
    const addressId = route.query.id
    const handleGoSelect = () => {
      router.push(`/mineAddressSelect?path=${route.path}`)
    }

    onBeforeMount(async () => {
      try {
        if (addressId) {
          const result = await get(`/api/user/address/${addressId}`)
          if (result?.errno === 0 && result?.data) {
            data.city = result.data.city
            data.department = result.data.department
            data.houseNumber = result.data.houseNumber
            data.name = result.data.name
            data.phone = result.data.phone
          }
        }
      } catch (error) {
        console.error('获取地址失败:', error)
      }
    })

    const { handleGoBack } = goBackEffect()
    return { handleGoBack, handleGoSelect, hasAddress: !!addressId, data }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

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
  color: $content-font-color;
  font-size: 0.16rem;
  margin-bottom: 0.14rem;
  font-weight: 600;
}

.info-location {
  line-height: 0.2rem;
  height: 0.2rem;
  color: $content-font-color;
  font-size: 0.14rem;
  margin-bottom: 0.06rem;
  @include ellipsis;
}

.info-personal {
  text-align: left;
}

.personal-name,
.personal-phone {
  display: inline-block;
  line-height: 0.17rem;
  height: 0.17rem;
  color: $content-font-color;
  font-size: 0.12rem;
  font-weight: 600;
  margin-right: 0.06rem;
  width: 0.8rem;
}
</style>
