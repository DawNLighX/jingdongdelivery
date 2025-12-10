<template>
  <div class="layout">
    <!-- 搜索栏 -->
    <div class="search-area">
      <div class="search-area__cancel-btn iconfont" @click="handleBack">&#xe66a;</div>
      <div class="search-area__content">
        <span class="search-area__content__icon iconfont">&#xe62b;</span>
        <input
          class="search-area__content__input"
          placeholder="请输入商品名称搜索"
          type="search"
          @keyup.enter="handleSearch"
          v-model="keyword"
          ref="inputRef"
        />
      </div>
    </div>

    <!-- 搜索结果占位 -->
    <div class="search-result-placeholder">
      <div class="placeholder-icon iconfont">&#xe643;</div>
      <p class="placeholder-text">搜索"{{ keyword || '' }}"的结果将在这里展示</p>
      <p class="placeholder-hint">（本页面仅展示搜索功能，实际数据展示在其他页面实现）</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'SearchList',

  setup () {
    const router = useRouter()
    const route = useRoute()
    const inputRef = ref(null)
    const keyword = ref(route.query.keyword || '')

    // 自动聚焦输入框
    onMounted(() => {
      inputRef.value?.focus()
    })

    const handleSearch = () => {
      const value = keyword.value.trim()
      if (!value) return

      // 实际项目中这里会调用搜索API
      console.log(`搜索关键词: ${value}`)

      // 如果需要在URL中更新关键词
      router.replace({ query: { keyword: value } })

      // 失焦隐藏键盘（移动端）
      inputRef.value?.blur()
    }

    const handleBack = () => {
      router.back()
    }

    return {
      keyword,
      inputRef,
      handleSearch,
      handleBack
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.layout {
  position: relative;
  height: 100vh;
  background-color: #ffffff;
  padding: 0.16rem 0.18rem;
}

.search-area {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  margin-bottom: 0.2rem;
  height: 0.32rem;

  &__cancel-btn {
    font-size: 0.24rem;
    color: #666666;
    cursor: pointer;
  }

  &__content {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: $search-background;
    border-radius: 0.16rem;
    padding: 0 0.1rem;
    height: 100%;

    &__icon {
      font-size: 0.16rem;
      color: #b7b7b7;
      margin-right: 0.08rem;
    }

    &__input {
      flex: 1;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      font-size: 0.14rem;
      color: $content-font-color;
      caret-color: $content-font-color;

      &::placeholder {
        color: #b7b7b7;
      }
    }
  }
}

// 搜索结果占位样式
.search-result-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 0.68rem);
  text-align: center;
  padding: 0 0.2rem;

  .placeholder-icon {
    font-size: 1rem;
    color: #f0f0f0;
    margin-bottom: 0.2rem;
  }

  .placeholder-text {
    font-size: 0.16rem;
    color: #666666;
    margin-bottom: 0.1rem;
    line-height: 1.4;
  }

  .placeholder-hint {
    font-size: 0.12rem;
    color: #999999;
    line-height: 1.4;
  }
}
</style>
