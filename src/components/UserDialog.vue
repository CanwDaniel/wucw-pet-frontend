<template>
  <el-dialog v-model="visible" :title="dialogTitle" width="500" @close="close">
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
        <el-upload class="avatar-uploader" :action="baseURL" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formData.avatar" :src="formData.avatar" class="avatar">
          <i v-else class="avatar-uploader-icon"></i>
        </el-upload>
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
import { ElMessage } from 'element-plus';

const url = `http://localhost:3000`;
const baseURL = `${url}/user/upload`;

const dialogTitle = ref('新增');

const form = ref<InstanceType<typeof ElForm> | null>(null);

const formData = reactive({
  userid: '',
  username: '',
  password: '',
  usertype: 1,
  phone: '',
  gender: 1,
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
  avatar: [
    { required: true, message: '头像不能为空', trigger: 'change' }
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
  form.value?.clearValidate();
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
      usertype: 1,
      phone: '',
      gender: 1,
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

const handleAvatarSuccess = (file: any) => {
  formData.avatar = `${url}/${file.data}`;
}
const beforeAvatarUpload = (file: any) => {
  const imgType = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const isType = imgType.includes(file.type);
  const isLt3M = file.size / 1024 / 1024 < 3;

  if (!isType) {
    ElMessage({ type: 'success', message: '上传图片的格式只能是 PNG, JPG, GIF, WEBP' });
  }
  if (!isLt3M) {
    ElMessage({ type: 'success', message: '上传头像图片大小不能超过 3MB' });
  }

  return isType && isLt3M;
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  position: relative;

  &::before {
    content: "+";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    font-weight: 200;
  }
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>