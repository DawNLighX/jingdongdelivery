<template>
  <header class="header">我的订单</header>
  <div class="layout">
    <!-- 加载状态 -->
    <div v-if="loading" class="empty-state loading-state">
      <div class="loading-spinner"></div>
      <p>加载订单中...</p>
    </div>

    <!-- 无订单状态 -->
    <div v-else-if="isEmpty" class="empty-state">
      <div class="empty-state__icon">📦</div>
      <p class="empty-state__text">您还没有订单哦</p>
      <button class="empty-state__btn" @click="goShopping">去购物</button>
    </div>

    <!-- 有订单列表 -->
    <div v-else>
      <div class="order-item" v-for="(item, index) in list" :key="index">
        <!-- 订单项内容保持不变 -->
        <div class="order-item__header">
          <span class="order-item__header__shop-name">{{ item.shopName }}</span>
          <span class="order-item__header__order-id">订单号：{{ item._id.slice(-12) }}</span>
          <span class="order-item__header__status">{{ item.isCanceled? "已取消" : "已支付" }}</span>
        </div>
        <div class="order-item__content">
          <div class="order-item__content__product-logo">
            <span
              v-for="(imgItem, imgIndex) in item.products"
              :key="imgIndex"
            >
              <img v-lazy="imgItem.product.imgUrl" alt="订单商品图" />
            </span>
          </div>
          <div class="order-item__content__product-info">
            <span class="totalPrice">&yen;{{ item.totalPrice }}</span>
            <span class="totalAmount">共&nbsp;{{ item.totalAmount }}&nbsp;件</span>
          </div>
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
  const data = reactive({
    list: [],
    loading: true, // 添加 loading 状态
    error: null
  })

  const getOrderList = async () => {
    try {
      data.loading = true // 开始加载
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
        data.list = []
      }
    } catch (error) {
      data.error = error.message
      data.list = []
    } finally {
      data.loading = false // 结束加载
    }
  }

  getOrderList()
  const { list, loading } = toRefs(data)

  return { list, loading, getOrderList }
}

export default {
  name: 'Order',
  components: {
    MainDocker
  },
  setup () {
    const router = useRouter()
    const { list, loading, getOrderList } = useOrderListEffect()

    // 判断是否为空（仅在非加载状态下）
    const isEmpty = computed(() => {
      return !loading.value && (!list.value || list.value.length === 0)
    })

    // 去购物按钮事件
    const goShopping = () => {
      router.push('/')
    }

    return {
      list,
      loading,
      isEmpty,
      goShopping,
      getOrderList // 如果需要手动刷新
    }
  },
  mounted () {
    window.scrollTo(0, 0)
  },
  activated () {
    this.$nextTick(() => {
      window.scrollTo(0, 0)
    })
    // 如果需要每次激活都重新获取数据
    // this.getOrderList()
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.layout {
  @include commonlayout;
}

.header {
  @include commonheader;
}

.empty-state {
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
    margin-bottom: 0.3rem;
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

// 加载状态样式
.loading-state {
  min-height: calc(100vh - 1.1rem - 1.2rem);

  .loading-spinner {
    width: 0.4rem;
    height: 0.4rem;
    border: 0.03rem solid #f3f3f3;
    border-top: 0.03rem solid $color-docker;  // 使用订单页主题色
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 0.16rem;
  }

  p {
    font-size: 0.14rem;
    color: #999;
  }
}

// 旋转动画
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// 订单项样式保持不变
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
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }

      span {
        width: 0.46rem;
        height: 0.46rem;
        box-shadow: 0 0.01rem 0.02rem rgba(0, 0, 0, 0.1);
        background-color: $search-background;
        object-fit: cover;
        flex-shrink: 0;

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
