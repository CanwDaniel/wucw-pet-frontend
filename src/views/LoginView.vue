<template>
  <div id="login" ref="loginRef">
    <div class="login-container">
      <div class="login-form">
        <div class="login-header">
          <h2 class="title">Login</h2>
        </div>

        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="form" @submit.prevent="handleLogin"
          @keyup.enter.native="handleLogin">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名" size="large" clearable>
              <template #prefix>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" size="large" show-password
              clearable>
              <template #prefix>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="form-options">
              <el-checkbox v-model="rememberMe">记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="large" class="login-btn" :loading="loading" @click="handleLogin">
              {{ loading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
          <p>还没有账户？ <el-link type="primary" :underline="false">立即注册</el-link></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';
import { addSettingRoute } from '@/router/index';
import { gsap } from "gsap";

import * as THREE from 'three';
import BIRDS from 'vanta/src/vanta.birds';

const router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)
const rememberMe = ref(false)

const loginRef = ref(null)

onMounted(() => {
  loginRef.value = BIRDS({
    el: loginRef.value,
    THREE: THREE,
  })

  loginBoxAnimate();
})

const loginBoxAnimate = () => {
  gsap.fromTo(".login-form",
    { yPercent: 200, duration: 1 },
    { yPercent: 0, duration: 1 })
}

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度应在 3 到 20 个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度应在 6 到 20 个字符之间', trigger: 'blur' }
  ]
}

// 处理登录
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    // 表单验证
    await loginFormRef.value.validate()

    loading.value = true

    // 调用用户 store 的登录方法
    const result = await userStore.login({
      username: loginForm.username,
      password: loginForm.password
    })

    if (result.success) {
      // ElMessage.success('登录成功！')
      addSettingRoute();
    } else {
      throw result.error
    }

    if (rememberMe.value) {
      localStorage.setItem('username', result.data.userlist.username)
    }

    router.push('/');
  } catch (error: any) {
    if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message)
    } else if (error.message) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('登录失败，请检查用户名和密码')
    }
  } finally {
    loading.value = false
  }
}

// 页面加载时检查是否有保存的用户名
const initSavedUsername = () => {
  const savedUsername = localStorage.getItem('username')
  if (savedUsername) {
    loginForm.username = savedUsername
    rememberMe.value = true
  }
}

// 组件挂载时初始化
initSavedUsername()
</script>

<style scoped lang="scss">
#login {
  min-height: 100vh;
  background: #07192f;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 20px 20px 100px;
  box-sizing: border-box;

  .vanta-canvas {
    width: 100%;
    height: 100%;
  }
}

.login-container {
  width: 100%;
  max-width: 400px;
  height: 500px;
  overflow: hidden;
}

.login-form {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);

  a:hover,
  a:active {
    text-decoration: none;
  }

  :deep(.el-link__inner) {
    color: #fff;

    &:hover {
      color: #764ca3;
    }
  }
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  .title {
    font-size: 28px;
    font-weight: 600;
    color: #fff;
    margin: 0 0 8px 0;
  }
}

.form {
  .el-form-item {
    margin-bottom: 20px;

    :deep(.el-checkbox__label) {
      color: #fff;

      &:active {
        color: #fff;
      }
    }
  }

  .el-input {
    .el-input__wrapper {
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      &.is-focus {
        box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
      }
    }
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
}

.login-footer {
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;

  p {
    margin: 0;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

// 响应式设计
@media (max-width: 480px) {
  .login-form {
    padding: 24px;
  }

  .login-header .title {
    font-size: 24px;
  }
}
</style>