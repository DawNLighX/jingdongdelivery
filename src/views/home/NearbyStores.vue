<template>
  <div class="nearby-stores">
    <h3 class="nearby-stores__title">附近店铺</h3>
    <ShopInfo
      v-for="item in nearbyList"
      :key="item._id"
      :item="item"
      :shopImages="shopImages"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request.js'

import luosenImg from '@/assets/storeicons/罗森.jpeg'
import qiyaoyaoImg from '@/assets/storeicons/711.jpeg'
import jingdongImg from '@/assets/storeicons/京东便利店.jpg'
import haoxianglaiImg from '@/assets/storeicons/好想来.jpeg'
import woermaImg from '@/assets/storeicons/walmart.png'

import ShopInfo from '@/components/ShopInfo.vue'

const nearbyStoresEffect = () => {
  const nearbyList = ref([])
  const shopImages = {
    luosen: luosenImg,
    qiyaoyao: qiyaoyaoImg,
    jingdong: jingdongImg,
    haoxianglai: haoxianglaiImg,
    woerma: woermaImg
  }
  const getNearbyList = async () => {
    const result = await get('/377491097')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { shopImages, nearbyList, getNearbyList }
}

export default {
  components: { ShopInfo },
  name: 'NearbyStores',
  setup () {
    const { shopImages, nearbyList, getNearbyList } = nearbyStoresEffect()
    getNearbyList()
    return { nearbyList, shopImages }
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
</style>
