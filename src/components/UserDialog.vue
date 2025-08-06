<template>
  <el-dialog v-model="visible" :title="dialogTitle" width="500">
    <el-form ref="form" :model="formData" :rules="rules" label-width="auto">
      <el-form-item label="用户ID" prop="userid">
        <el-input v-model="formData.userid" disabled />
      </el-form-item>

      <el-form-item label="用户名称" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名称" />
      </el-form-item>

      <el-form-item label="用户密码" prop="password">
        <el-input v-model="formData.password" type="password" show-password placeholder="请输入用户密码" />
      </el-form-item>

      <el-form-item label="用户类型" prop="usertype">
        <el-select v-model="formData.usertype" placeholder="请选择用户类型">
          <el-option label="管理员" :value="0" />
          <el-option label="普通用户" :value="1" />
        </el-select>
      </el-form-item>

      <el-form-item label="电话号码" prop="phone">
        <el-input v-model="formData.phone" placeholder="请输入电话号码" />
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-select v-model="formData.gender" placeholder="请选择性别">
          <el-option label="男" :value="1" />
          <el-option label="女" :value="0" />
        </el-select>
      </el-form-item>

      <el-form-item label="出生日期" prop="birthday">
        <el-date-picker v-model="formData.birthday" format="YYYY/MM/DD" value-format="YYYY-MM-DD" type="date"
          placeholder="请选择出生日期" />
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <el-input v-model="formData.avatar" placeholder="请上传头像" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">
          关闭
        </el-button>
        <el-button type="primary" @click="save">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import type { ElForm } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const dialogTitle = ref('新增');

const form = ref<InstanceType<typeof ElForm> | null>(null);

const formData = reactive({
  userid: '',
  username: '',
  password: '',
  usertype: '',
  phone: '',
  gender: '',
  birthday: '',
  avatar: ''
});

interface RuleForm {
  username: string
  password: string
  usertype: string
  phone: string
  gender: string
  birthday: string
  avatar: string
}

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入用户密码', trigger: 'blur' }
  ],
  usertype: [
    { required: true, message: '请选择用户类型', trigger: 'change' }
  ],
  phone: [
    { required: true, message: '请输入电话号码', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ],
  birthday: [
    { required: true, message: '请选择出生日期', trigger: 'change' }
  ],
})

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['update:modelValue', 'submit'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val)
  }
})

const close = () => {
  visible.value = false;
  form.value?.resetFields();
}

const open = (title: string, row: any) => {
  dialogTitle.value = title;
  visible.value = true;

  if (title === '更新') {
    Object.assign(formData, row);
  } else {
    Object.assign(formData, {
      userid: '',
      username: '',
      password: '',
      usertype: '',
      phone: '',
      gender: '',
      birthday: '',
      avatar: ''
    });
  }
}
const save = () => {
  if (form.value) {
    form.value.validate((valid: boolean) => {
      if (valid) {
        visible.value = false;
        emits('submit', { ...formData });
      }
    })
  }
}

defineExpose({
  close,
  open,
  save
})
</script>

<style lang="scss">
.el-date-editor.el-input,
.el-date-editor.el-input__wrapper {
  width: 100%;
  height: 100%;
}
</style>