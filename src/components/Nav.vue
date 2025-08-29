<template>
  <div id="nav">
    <el-segmented class="nav-segmented" v-model="currentTab" :options="tabs" @change="changeTab" />

    <!-- 用户信息区域 -->
    <div class="user-info">
      <el-dropdown @command="handleCommand">
        <div class="user-avatar">
          <el-avatar :size="32" :src="avatar">
            {{ username }}
          </el-avatar>
          <span class="username">{{ username }}</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item command="profile">个人资料</el-dropdown-item> -->
            <el-dropdown-item command="settings">设置</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { getUserInfo } from '@/utils/auth'

const router = useRouter()
const userStore = useUserStore()

const username = userStore.userInfo?.username || getUserInfo()?.username || '';
const avatar = userStore.userInfo?.avatar || getUserInfo()?.avatar || '';

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

// 处理下拉菜单命令
const handleCommand = async (command: string) => {
  switch (command) {
    case 'profile':
      // 跳转到个人资料页面
      router.push('/profile')
      break
    case 'settings':
      // 跳转到设置页面
      router.push('/settings')
      break
    case 'logout':
      // 确认登出
      try {
        await ElMessageBox.confirm(
          '确定要退出登录吗？',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        userStore.logout()
        router.push('/login')
      } catch {
        // 用户取消
      }
      break
  }
}
</script>

<style lang="scss">
#nav {
  position: fixed;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 20px;

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

  .user-info {
    .user-avatar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px;
      background-color: rgba($color: #000000, $alpha: 0.8);
      border-radius: 26px;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover,
      &:focus {
        border: none;
        outline: none;
        box-shadow: none;
      }

      .el-avatar--circle {
        --el-avatar-size: 30px !important;
      }

      .username {
        font-size: 16px;
        font-weight: 700;
      }

      .el-icon {
        font-size: 12px;
        transition: transform 0.3s ease;
      }
    }

    .el-dropdown:hover .user-avatar .el-icon {
      transform: rotate(180deg);
    }
  }
}
</style>
