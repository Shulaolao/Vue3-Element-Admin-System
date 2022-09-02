<template>
  <el-form :model="form" ref="step2" label-width="100px" :inline="false" size="default">
    <el-form-item label="付款账户" disabled>
      <el-input v-model="form.payAccount"></el-input>
    </el-form-item>
    <el-form-item label="收款账户" size="default">
      <el-input v-model="form.collectAccount" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item label="收款人姓名" size="default">
      <el-input v-model="form.collectName" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item label="转账金额" size="default">
      <el-input v-model="form.amount" size="default" clearable></el-input>
    </el-form-item>
    <el-form-item label="支付密码" size="default">
      <el-input v-model="payPassword" size="default" clearable type="password" ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handlePay" :loading="payLoading">确认并付款</el-button>
      <el-button @click="handleLast">上一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const emits = defineEmits(['lastStep', 'nextStep'])

const form = reactive({
  payAccount: '',
  collectAccount: '',
  collectName: '',
  amount: 0
})

const payLoading = ref(false)

form.payAccount = store.state.components.stepForm.payAccount
form.collectAccount = store.state.components.stepForm.collectAccount
form.collectName = store.state.components.stepForm.collectName
form.amount = store.state.components.stepForm.amount
console.log(form)

const payPassword = ref('123456')

const handlePay = () => {
  payLoading.value = true
  setTimeout(() => {
    ElMessage.success('成功转账')
    payLoading.value = false
    emits('nextStep')
  }, 2000)
}
const handleLast = () => {
  emits('lastStep')
}
</script>

<style lang='scss' scoped>

</style>
