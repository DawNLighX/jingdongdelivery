<template>
  <div class="layout">
    <div class="search-area">
      <div class="search-area__cancel-btn iconfont" @click="handleSearchCancel()">&#xe66a;</div>
      <div class="search-area__content">
        <span class="search-area__content__icon iconfont">&#xe62b;</span>
        <input
          class="search-area__content__input"
          placeholder="请输入商品名称搜索"
          type="search"
          @keyup.enter="handleSearch"
          v-model="inputValue"
          ref="inputRef"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SearchList',
  emits: ['search'],

  setup (props, { emit }) {
    const inputValue = ref('')
    const inputRef = ref(null)
    const router = useRouter()

    const handleSearch = () => {
      const value = inputValue.value.trim()
      if (!value) return
      emit('search', value)
      inputValue.value = '' // 清空输入框
      inputRef.value?.blur() // 失焦隐藏键盘
      router.push(`/searchList?keyword=${value}`)
    }

    const handleSearchCancel = () => {
      router.back()
    }

    return {
      inputValue,
      inputRef,
      handleSearch,
      handleSearchCancel
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

.search-area {
  margin-bottom: 0.12rem;
  height: 0.32rem;
  display: flex;

  &__cancel-btn {
    flex: 1;
    line-height: 0.32rem;
    color: #666666;
    font-size: 0.25rem;
  }

  &__content {
    display: flex;
    align-items: center;
    line-height: 0.32rem;
    background-color: $search-background;
    border-radius: 0.16rem;
    width: 3.1rem;

    &__icon {
      width: 0.36rem;
      font-size: 0.16rem;
      margin-left: 0.06rem;
      margin-right: 0.02rem;
      text-align: center;
      color: #b7b7b7;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__input {
      line-height: 0.32rem;
      font-size: 0.14rem;
      color: $placeholder-caret-color;
      width: 2.1rem;
      padding-right: 0.2rem;
      border: none;
      outline: none;
      background: transparent;
      display: block;
      caret-color: $placeholder-caret-color;

      -webkit-tap-highlight-color: transparent;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      // 确保输入框内容垂直居中
      height: 100%;
      padding: 0;
      color: $content-font-color;
    }
  }
}
</style>
