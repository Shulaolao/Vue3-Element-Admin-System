<template>
  <section class="roles-container">
    <div ref="footer" class="table-container">
      <span>Admin Account</span>
      <el-table :data="state.adminCount" border stripe v-loading="accountLoading">
        <el-table-column v-for="col in adminColumn" :key="col.name" :prop="col.name" :label="col.name">
        </el-table-column>
      </el-table>
    </div>
    <div class="table-container">
      <span>Admin List</span>
      <div class="settings-box">
        <el-tooltip content="固定 name 列" placement="top" effect="dark">
          <el-switch v-model="fixed" :active-value="true" :inactive-value="false">
          </el-switch>
        </el-tooltip>
        <el-tooltip content="高亮当前行" placement="top" effect="dark">
          <el-switch v-model="highlight" :active-value="true" :inactive-value="false">
          </el-switch>
        </el-tooltip>
        <el-tooltip content="显示斑马纹" placement="top" effect="dark">
          <el-switch v-model="stripe" :active-value="true" :inactive-value="false">
          </el-switch>
        </el-tooltip>
      </div>
      <el-table :data="state.adminList" border :stripe="stripe" :highlight-current-row="highlight" :max-height="500"
        v-loading="listLoading">
        <el-table-column v-for="col in tableColumn" :prop="col.name" :key="col.name" :label="col.name"
          :sortable="col?.sortable" :width="col?.width" :fixed="col?.fixed">
        </el-table-column>
        <el-table-column label="operation" :width="240">
          <template #default="scope">
            <el-popconfirm
              :title="`Are you to change ${scope.row.name}'s permission to '${scope.row.role === 'common' ? 'super' : 'common'}'?`"
              confirmButtonText="confirm" cancelButtonText="cancel" confirmButtonType="primary" cancelButtonType="text"
              iconColor="#ee4f12" :hideIcon="false" v-for="btn in permissionBtn.slice(0, 1)" :key="btn.name"
              @confirm="confirm(scope)" @cancel="cancel(scope.row.name)">
              <template #reference>
                <el-button v-permission="['superAdmin']" :color="btn.color" type="primary" size="small">{{ btn.label }}
                </el-button>
              </template>
            </el-popconfirm>
            <el-button v-for="btn in permissionBtn.slice(1)" :color="btn.color" type="primary" :key="btn.name"
              size="small" @click="btn.event(scope)" v-permission="['superAdmin']">
              {{ btn.label }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="sizeChange" @current-change="currentChange" v-model:current-page="currentPage"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="all" background>
      </el-pagination>
    </div>
  </section>
</template>

<script setup>
import { getAdminMenu } from '@/api/permission.js'
import { ElMessage } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const state = reactive({
  adminList: null,
  adminCount: null,
  all: null
})

const fixed = ref(false)
const highlight = ref(false)
const stripe = ref(true)

const accountLoading = computed(() => {
  return !state.adminCount
})
const listLoading = computed(() => {
  return !state.adminList
})

const adminColumn = [
  {
    name: 'super'
  },
  {
    name: 'common'
  },
  {
    name: 'all'
  }
]

getAdminMenu(store.state.user.token).then(res => {
  const { data } = res
  if (res.status === 200 && data.code === 20000) {
    state.adminCount = [{ ...data.data.account, all: data.data.adminAll }]
    store.dispatch('permission/setAdminList', data.data.adminList)
    state.all = data.data.adminAll
  }
}).catch(err => {
  console.log(err)
})

const pageSize = ref(10)
const currentPage = ref(1)
const all = computed(() => {
  return store.state.permission.adminList.length
})

const sizeChange = (val) => {
  pageSize.value = val
}

const currentChange = (val) => {
  currentPage.value = val
}

state.adminList = computed(() => {
  const list = store.state.permission.adminList.slice((currentPage.value - 1) * pageSize.value + 1, currentPage.value * pageSize.value)
  return list.map(item => {
    return {
      ...item,
      depart: item.department.depart,
      identify: item.department.identify
    }
  })
})

const tableColumn = reactive([
  {
    name: 'id',
    width: 160,
    sortable: true
  },
  {
    name: 'name',
    width: 160,
    fixed: fixed
  },
  {
    name: 'role',
    width: 160
  },
  {
    name: 'gender',
    width: 160
  },
  {
    name: 'createTime',
    sortable: true,
    width: 240
  },
  {
    name: 'depart',
    width: 160
  },
  {
    name: 'identify',
    width: 160
  }
])

const handleRoles = (scope) => {
  console.log(scope)
}

const handleInfo = () => {
  ElMessage.info('该功能有待开发')
}

const handleDelete = (scope) => { }

const permissionBtn = reactive([
  {
    label: '修改权限',
    color: '',
    event: (row) => handleRoles(row)
  },
  {
    label: '修改信息',
    color: '#0096c7',
    event: {
      click: () => handleInfo()
    }
  },
  {
    label: '删除成员',
    color: '#fc5404',
    event: {
      click: () => handleDelete()
    }
  }
])

const confirm = (scope) => {
  const { name, id } = scope.row
  state.adminList.map(item => {
    if (item.name === name && item.id === id) {
      item.role = item.roles === 'common' ? 'super' : 'common'
    }
    return item
  })
}
const cancel = (name) => {
  ElMessage.info("You're cancel to change the" + name + "'s role")
}

</script>

<style lang='scss' scoped>
.roles-container {
  padding: 20px;

  .table-container {
    position: relative;
    margin: 10px 0;
    padding: 20px;
    background: #fff;

    span {
      font-weight: 600;
      font-size: 18px;
    }

    .settings-box {
      position: absolute;
      right: 20px;
      top: 10px;

      .el-switch {
        margin: 0 10px;
      }
    }

    &:deep(.el-button) {
      width: 60px;
    }
    .el-pagination {
      justify-content: center;
      margin: 20px;
      margin-left: -120px;
    }
  }
}
</style>
