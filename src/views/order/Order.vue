<template>
  <header class="header">我的订单</header>
  <div class="layout">
    <div class="empty-order" v-if="isEmpty">
      <div class="empty-order__icon">📦</div>
      <p class="empty-order__text">您还没有订单哦</p>
      <p class="empty-order__subtext">快去下单体验吧~</p>
      <button class="empty-order__btn" @click="goShopping">去购物</button>
    </div>

    <div class="order-item" v-for="(item, index) in list" :key="index">
      <div class="order-item__header">
        <span class="order-item__header__shop-name">{{ item.shopName }}</span>
        <span class="order-item__header__order-id">订单号：{{ item.orderId }}</span>
        <span class="order-item__header__status">{{ item.isCanceled? "已取消" : "已支付" }}</span>
      </div>
      <div class="order-item__content">
        <div class="order-item__content__product-logo">
          <span
            v-for="(imgItem, imgIndex) in item.products"
            :key="imgIndex"
          >
            <img :src="imgItem.product.img" />
          </span>
        </div>
        <div class="order-item__content__product-info">
          <span class="totalPrice">&yen;{{ item.totalPrice }}</span>
          <span class="totalAmount">共&nbsp;{{ item.totalAmount }}&nbsp;件</span>
        </div>
      </div>
    </div>

    <MainDocker />
  </div>
</template>

<script>
import MainDocker from '../../components/MainDocker.vue'
import { get } from '../../utils/request'
import { computed, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })

  const getOrderList = async () => {
    try {
      const result = await get('api/order')
      if (result?.errno === 0 && result?.data?.length) {
        const orderList = result.data
        orderList.forEach((order) => {
          const products = order.products || []
          let totalPrice = 0
          let totalAmount = 0
          products.forEach((productItem) => {
            totalPrice += productItem?.product.price * productItem?.orderSales || 0
            totalAmount += productItem?.orderSales || 0
          })
          order.totalPrice = (totalPrice).toFixed(2)
          order.totalAmount = totalAmount
        })
        data.list = result.data
      } else {
        // 如果没有数据，设置空数组
        data.list = []
      }
    } catch (error) {
      data.error = error.message
      data.list = [] // 出错时也设置为空
    } finally {
      data.loading = false
    }
  }
  getOrderList()
  const { list } = toRefs(data)

  return { list }
}

export default {
  name: 'Order',
  components: {
    MainDocker
  },
  setup () {
    const router = useRouter()
    const { list, totalPrice } = useOrderListEffect()
    // 判断是否为空
    const isEmpty = computed(() => {
      return !list.value || list.value.length === 0
    })

    // 去购物按钮事件
    const goShopping = () => {
      router.push('/')
    }

    return { list, totalPrice, isEmpty, goShopping }
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

.layout {
  /* 定位 */
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  min-height: calc(100vh - 1.1rem);

  background-color: #f5f5f5;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  /* 盒模型 */
  padding: 0.6rem 0.18rem 0.7rem;
}

.header {
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  height: 0.44rem;
  line-height: 0.44rem;
  background-color: #ffffff;
  text-align: center;
  font-size: 0.16rem;
  color: $content-font-color;
  z-index: 1000;
}

.empty-order {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  min-height: calc(100vh - 1.1rem - 1.2rem);

  &__icon {
    font-size: 1.2rem;
    margin-bottom: 0.2rem;
    opacity: 0.5;
  }

  &__text {
    font-size: 0.16rem;
    color: #999;
    margin-bottom: 0.1rem; // 与购物车保持一致
  }

  &__subtext {
    font-size: 0.14rem;
    color: #999;
    margin-bottom: 0.3rem; // 总间距与购物车一致
  }

  &__btn {
    padding: 0.1rem 0.4rem;
    background-color: $color-docker;
    color: white;
    border: none;
    border-radius: 0.2rem;
    font-size: 0.14rem;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
}

// 调整布局，当订单为空时
.layout:has(.empty-order) {
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-item {
  position: relative;
  margin-bottom: 0.16rem;
  width: 3.07rem;
  height: 0.84rem;
  padding: 0.16rem;
  background-color: #ffffff;
  border-radius: 0.06rem;
  box-shadow: 0 0.01rem 0.02rem rgba(0, 0, 0, 0.1);

  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 0.16rem;

    &__shop-name {
      flex: 1;
      line-height: 0.22rem;
      height: 0.22rem;
      font-size: 0.16rem;
      font-weight: 600;
      width: 1rem;
      @include ellipsis;
    }

    &__order-id {
      line-height: 0.22rem;
      height: 0.22rem;
      font-size: 0.12rem;
      color: #999999;
      width: 1.42rem;
    }

    &__status {
      width: 0.42rem;
      line-height: 0.22rem;
      height: 0.22rem;
      font-size: 0.14rem;
      color: #999999;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__product-logo {
        width: 2.2rem;
        display: flex;
        gap: 0.12rem;
        overflow-x: auto; /* 改为 auto，只在需要时显示滚动条 */
        overflow-y: hidden; /* 纵向隐藏 */
        white-space: nowrap; /* 防止换行 */
        -webkit-overflow-scrolling: touch; /* 移动端平滑滚动 */
        scrollbar-width: none; /* Firefox 隐藏滚动条 */
        -ms-overflow-style: none; /* IE/Edge 隐藏滚动条 */

        &::-webkit-scrollbar {
          display: none; /* Chrome/Safari 隐藏滚动条 */
        }

      span {
        width: 0.46rem;
        height: 0.46rem;
        box-shadow: 0 0.01rem 0.02rem rgba(0, 0, 0, 0.1);
        background-color: $search-background;
        object-fit: cover;
        flex-shrink: 0; /* 防止图片被压缩 */

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    &__product-info {
      flex: 1;

      height: 0.46rem;

      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-around;

      .totalPrice {
        font-size: 0.14rem;
        font-weight: 600;
        color: $jingdong-red;

        height: 0.2rem;
        line-height: 0.2rem;
      }

      .totalAmount {
        font-size: 0.12rem;
        color: $content-font-color;

        height: 0.14rem;
        line-height: 0.14rem;
      }
    }
  }
}
</style>
