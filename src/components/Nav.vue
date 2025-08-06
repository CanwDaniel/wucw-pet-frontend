<template>
  <div id="nav">
    <el-segmented class="nav-segmented" v-model="currentTab" :options="tabs" @change="changeTab" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 路由名称映射表
const routeNameMap: Record<string, string> = {
  'home': 'Home',
  'about': 'About',
  'settings': 'Settings'
}

const tabs = ['Home', 'About', 'Settings']

// 根据当前路由名称获取对应的标签名称
const currentTab = computed(() => {
  const currentRouteName = router.currentRoute.value.name as string
  return routeNameMap[currentRouteName] || 'Home'
})

const changeTab = (tab: string) => {
  // 根据标签名称获取对应的路由名称
  const routeName = Object.keys(routeNameMap).find(key => routeNameMap[key] === tab)
  if (routeName) {
    router.push({ name: routeName })
  }
}
</script>

<style lang="scss">
#nav {
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  z-index: 999;

  .nav-segmented {
    --el-segmented-item-selected-color: #000000;
    --el-segmented-item-selected-bg-color: #fff;
    --el-border-radius-base: 26px;
    background-color: rgba($color: #000000, $alpha: 0.8);
    color: #fff;
    padding: 10px 20px;
  }

  .el-segmented__item .el-segmented__item-label {
    font-size: 16px;
    font-weight: 700;
    padding: 6px;
    transition: none;
  }
}
</style>
