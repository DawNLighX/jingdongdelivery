<template>
  <div class="nearby-stores">
    <h3 class="nearby-stores__title">附近店铺</h3>

    <div
      class="nearby-stores__item"
      v-for="item in nearbyList"
      :key="item.id"
    >
      <img
        class="nearby-stores__item__icon"
        :src="item.imgUrl"
      />
      <div class="nearby-stores__item__content">
        <p class="nearby-stores__item__content__title">{{ item.title }}</p>
        <div class="nearby-stores__item__content__tags">
          <span
            class="nearby-stores__item__content__tags_tag"
            v-for="(tag, tagIndex) in item.tags"
            :key="tagIndex"
          >{{ tag }}</span>
        </div>
        <p class="nearby-stores__item__content__ads">{{ item.desc }}</p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NearbyStores',
  setup () {
    const nearbyList = [
      {
        id: 1,
        title: '711 便利店',
        tags: ['月售 2000+', '起送 $2.49', '基础运费 $0.99'],
        desc: '满 69 可用 18 元优惠券',
        imgUrl: require('@/assets/storeicons/711.jpeg')
      },
      {
        id: 2,
        title: '京东便利店',
        tags: ['月售 9000+', '起送 $2.49', '基础运费 $0.99'],
        desc: '满 49 可用 12 元优惠券',
        imgUrl: require('@/assets/storeicons/京东便利店.jpg')
      },
      {
        id: 3,
        title: '沃尔玛',
        tags: ['月售 5000+', '起送 $6.99', '基础运费 $0.99'],
        desc: 'VIP享满 89 元送 4 元运费券（每月3张）',
        imgUrl: require('@/assets/storeicons/walmart.png')
      },
      {
        id: 4,
        title: '好想来',
        tags: ['月售 300+', '起送 $4.99', '基础运费 $0.99'],
        desc: '店铺VIP享 88 折优惠',
        imgUrl: require('@/assets/storeicons/好想来.jpeg')
      },
      {
        id: 5,
        title: '罗森',
        tags: ['月售 600+', '起送 $2.69', '基础运费 $0.99'],
        desc: '满 69 可用 15 元优惠券',
        imgUrl: require('@/assets/storeicons/罗森.jpeg')
      }
    ]
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import "../.././style/viriables.scss";
@import "../.././style/mixins.scss";
.nearby-stores {
  &__title {
    margin: 0.16rem 0 0.02rem 0;
    padding: 0;
    font-size: 0.18rem;
    font-weight: 500;
    line-height: 0.25rem;
    color: $content-font-color;
  }
  &__item {
    display: flex;
    padding: 0.12rem 0 0 0;
    &__icon {
      width: 0.56rem;
      height: 0.56rem;
      margin-right: 0.16rem;
    }
    &__content {
      flex: 1;
      height: 0.56rem;
      padding-bottom: 0.27rem;
      color: $content-font-color;
      border-bottom: 0.01rem solid #e1e1e1;
      &__title {
        font-size: 0.16rem;
        font-weight: 600;
        height:.22rem;
        margin: 0 0 0.08rem 0; // p元素 清除自带高度
      }
      &__tags {
        font-size: 0.13rem;
        color:$placeholder-caret-color;
        line-height: 0.18rem;
        width: 2.6rem;
        display: grid;
        grid-template-columns: 1fr 1fr 1.5fr;
      }
      &__ads {
        font-size: 0.13rem;
        color: $jingdong-red;
        margin: 0.08rem 0 0 0;
      }
    }
  }
}
</style>
