<template>
  <router-view v-slot="{ Component }">
    <keep-alive :inlcude="['Home']">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>
</template>

<script>

export default {
  name: 'App'
}
</script>
