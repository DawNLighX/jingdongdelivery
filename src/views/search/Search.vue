<template>
  <div class="layout">
    <SearchArea @search="handleSearch" />

    <div class="search-history" v-if="history.length">
      <div class="search-history__header">
        <span class="search-history__header__title">搜索历史</span>
        <span class="search-history__header__clear-history" @click="handleHistoryClear()">清除搜索历史</span>
      </div>
      <div class="search-history__content">
        <span
          class="search-history__content__item"
          v-for="(item, index) in history"
          :key="index"
          @click="handleHistoryClick(item)"
        >
          {{ item }}
        </span>
      </div>
    </div>

    <div class="search-hot">
      <div class="search-hot__header">
        <span class="search-hot__header__title">热门搜索</span>
      </div>
      <div class="search-hot__content">
        <span
          class="search-hot__content__item"
          v-for="(item, index) in hotWordList"
          :key="index"
          @click="handleHotClick(item)"
        >
          {{ item }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SearchArea from './SearchArea'
import { useRouter } from 'vue-router'
import { get } from '../../utils/request'

const useHotWordListEffect = () => {
  const hotWordList = ref([])

  const getHotWordList = async () => {
    const result = await get('api/search/hot-words')
    if (result?.errno === 0 && result?.data?.length) {
      hotWordList.value = result.data
    }
  }
  return { hotWordList, getHotWordList }
}

export default {
  name: 'Search',
  components: {
    SearchArea
  },
  setup () {
    const router = useRouter()
    const history = ref(JSON.parse(localStorage.getItem('history') || '[]'))

    const { hotWordList, getHotWordList } = useHotWordListEffect()
    getHotWordList()

    const handleSearch = (searchValue) => {
      const trimmedValue = searchValue.trim()
      if (!trimmedValue) return

      // 移除已存在的重复项
      const existingIndex = history.value.findIndex(item => item === trimmedValue)
      if (existingIndex !== -1) {
        history.value.splice(existingIndex, 1)
      }

      // 添加到数组开头（最近搜索在最前）
      history.value.unshift(trimmedValue)

      // 限制历史记录数量（最多10条）
      if (history.value.length > 10) {
        history.value = history.value.slice(0, 10)
      }

      localStorage.setItem('history', JSON.stringify(history.value))
    }

    const handleHistoryClear = () => {
      if (history.value.length === 0) return
      history.value = []
      localStorage.setItem('history', '[]')
    }

    const handleHistoryClick = (keyword) => {
      router.push(`/searchList?keyword=${keyword}`)
    }

    const handleHotClick = (keyword) => {
      handleSearch(keyword)
      router.push(`/searchList?keyword=${keyword}`)
    }

    return {
      history,
      hotWordList,
      getHotWordList,
      handleSearch,
      handleHistoryClear,
      handleHistoryClick,
      handleHotClick
    }
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
  height: 100%;

  background-color: #ffffff;

  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  /* 盒模型 */
  padding: 0.16rem 0.18rem;
}

.search-history,
.search-hot {
  width: 100%;
  padding: 0.12rem 0;

  &__header {
    line-height: 0.22rem;
    height: 0.22rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__title {
      line-height: 0.22rem;
      height: 0.22rem;
      font-size: 0.16rem;
      font-weight: 600;
      color: $content-font-color;
    }

    &__clear-history {
      line-height: 0.22rem;
      height: 0.22rem;
      font-size: 0.14rem;
      color: $content-font-color;
    }
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 0.10rem;
    width: 100%;
    min-height: 1.16rem;
    max-height: 1.16rem;
    overflow-y: hidden;
    padding-top: 0.12rem;

    &__item {
      padding: 0.08rem 0.1rem;
      background-color: #F5F5F5;
      height: 0.16rem;
      line-height: 0.16rem;
      font-size: 0.14rem;
      color: #666666;
    }
  }
}
</style>
