<template>
  <div class="nearby-stores">
    <h3 class="nearby-stores__title">附近店铺</h3>
    <router-link
      v-for="item in nearbyList"
      :to="`/shop/${item._id}`"
      :key="item._id"
    >
    <div class="shopInfo-margin">
      <ShopInfo :item="item"/>
    </div>
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request.js'

import ShopInfo from '@/components/ShopInfo.vue'

const nearbyStoresEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  components: { ShopInfo },
  name: 'NearbyStores',
  setup () {
    const { nearbyList, getNearbyList } = nearbyStoresEffect()

    getNearbyList()

    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.nearby-stores__title {
  margin: 0.16rem 0 0.02rem 0;
  padding: 0;
  font-size: 0.18rem;
  font-weight: 500;
  line-height: 0.25rem;
  color: $content-font-color;
}

a {
  text-decoration: none;
}

.shopInfo-margin {
  height: .71rem;
  padding: 0.12rem 0;
  position: relative;
}

.shopInfo-margin::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 79%;
  height: 0.02rem;
  background: #F1F1F1;
  transform: scaleY(0.5);
}
</style>
