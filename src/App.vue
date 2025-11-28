<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['Home']">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script>

export default {
  name: 'App'
}
</script>
