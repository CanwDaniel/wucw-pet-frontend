<template>
  <div id="settings">
    <el-table v-loading="table.loading" :data="table.data">
      <el-table-column v-for="col of table.column" :key="col.prop" :prop="col.prop" :label="col.label"
        :formatter="col.formater" :min-width="col.minWidth">
        <template #default="scope">
          <div v-if="col.prop === 'avatar'">
            <el-image style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" :src="scope.row.avatar">
            </el-image>
          </div>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" min-width="130">
        <template #default="scope">
          <el-button link type="primary" :disabled="add" size="small"
            @click="handleClick('add', scope.row)">添加</el-button>

          <el-button link type="primary" :disabled="update" size="small"
            @click="handleClick('update', scope.row)">更新</el-button>

          <el-button link type="danger" :disabled="del" size="small"
            @click="handleClick('delete', scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <UserDialog ref="userDialogRef" v-model="visible" @submit="addAndUpdateUser"></UserDialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { userListRequest, userDelRequest, userRequest } from '@/utils/apis/api/user';
import type { UserRequestType } from '@/utils/apis/types/user.d';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUserInfo } from '@/utils/auth'
import UserDialog from '@/components/UserDialog.vue';

const { permissions } = getUserInfo();
const add = !permissions.includes('add');
const del = !permissions.includes('delete');
const update = !permissions.includes('update');

const table = reactive({
  loading: true,
  data: [],
  column: [
    {
      label: '用户名称',
      prop: 'username',
    },
    {
      label: '用户类型',
      prop: 'usertype',
      formater: (row: any) => {
        return row.usertype == 1 ? '管理员' : '普通用户';
      },
    },
    {
      label: '电话',
      prop: 'phone',
      minWidth: 100,
    },
    {
      label: '性别',
      prop: 'gender',
      formater: (row: any) => {
        return row.gender == 0 ? '女' : '男';
      },
    },
    {
      label: '出生日期',
      prop: 'birthday',
      minWidth: 100,
    },
    {
      label: '头像',
      prop: 'avatar',
    }
  ],
});

const visible = ref(false);
const userDialogRef = ref<InstanceType<typeof UserDialog> | null>(null)

const handleClick = (data: string, row: any) => {
  switch (data) {
    case 'add':
      userDialogRef.value!.open('新增', { ...row, password: '' });
      break;
    case 'update':
      userDialogRef.value!.open('更新', { ...row, password: '' });
      break;
    case 'delete':
      delUser(row.userid);
      break;
  }
}

const addAndUpdateUser = (data: UserRequestType) => {
  let obj;
  let tips;
  if (!data.userid) {
    tips = '添加成功'
    const { username, password, usertype, phone, gender, birthday, avatar } = data;
    obj = { username, password, usertype, phone, gender, birthday, avatar };
  } else {
    tips = '更新成功'
    obj = data;
  }

  table.loading = true;

  userRequest(obj).then(res => {
    ElMessage({ type: 'success', message: tips });
    getUserList();
  }).catch((error) => {
    ElMessage({ type: 'error', message: error.response.data.message });
  }).finally(() => {
    table.loading = false;
  })
}

const getUserList = (username: string = '', pageNo: number = 1, pageSize: number = 10) => {
  userListRequest({ username, pageNo, pageSize }).then((res: any) => {
    table.loading = true;

    if (res.code === 200) {
      table.data = res.data.user;
    }
  }).finally(() => {
    table.loading = false;
  })
}

const delUser = (userid: string) => {
  ElMessageBox.confirm(
    '确认删除该用户?',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    table.loading = true;

    userDelRequest({ userid }).then((res: any) => {
      ElMessage({ type: 'success', message: '删除成功' });
      getUserList();
    }).catch((error) => {
      ElMessage({ type: 'error', message: error.response.data.message });
    })
  }).finally(() => {
    table.loading = false;
  })
}

onMounted(() => {
  getUserList();
})

</script>

<style scoped lang="scss">
#settings {
  height: 100%;
  padding: 120px 240px 0;
}

@media (max-width: 1040px) {
  #settings {
    padding: 120px 120px 0;
  }
}
</style>