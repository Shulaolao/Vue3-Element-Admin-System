<template>
  <el-form ref="step1" :model="form" :rules="rules" label-width="100px" :inline="false" size="default">
    <el-form-item label="付款账户" prop="payAccount">
      <el-select v-model="form.payAccount" value-key="name" placeholder="选择付款用户" clearable filterable>
        <el-option v-for="item in account" :key="item.name" :label="item.name" :value="item.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="收款账户" prop="collectAccount">
      <el-input v-model="form.collectAccount" placeholder="输入收款用户" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item label="收款人姓名" prop="collectName">
      <el-input v-model="form.collectName" placeholder="输入收款人姓名" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item label="转账金额" prop="amount">
      <el-input v-model="form.amount" placeholder="输入金额" size="default" clearable>
        <template #prefix>
          <SvgIcon icon-name="money" :width="18" :height="18" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleNext(step1)">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '@/icons/SvgIcon.vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['nextStep'])

const store = useStore()
const step1 = ref(null)

const form = reactive({
  payAccount: '',
  collectAccount: 'LiuTao@gmail',
  collectName: 'LiuTao',
  amount: 210
})

const account = reactive([
  {
    name: 'superAdmin@qq123.com'
  },
  {
    name: 'commonAdmin@qq163.com'
  }
])

const rules = reactive({
  payAccount: [
    { message: '输入付款账户', required: true, trigger: 'blur' }
  ],
  collectAccount: [
    { required: true, message: '请输入收款人账号', trigger: 'blur' }
  ],
  collectName: [
    { required: true, message: '请输入收款人', trigger: 'blur' }
  ],
  amount: [
    { required: true, message: '请输入金额', trigger: 'blur' }
  ]
})

const handleNext = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      store.dispatch('components/SetStepForm', form)
      emit('nextStep')
    } else {
      ElMessage.error('请输入转账账户')
      return false
    }
  })
}
</script>

<style lang='scss' scoped>
</style>
