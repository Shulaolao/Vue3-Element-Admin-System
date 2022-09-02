<template>
  <el-container direction="vertical" class="stepForm">
    <el-header height="120px">
      <div>分步表单</div>
      <span>将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</span>
    </el-header>
    <el-container direction="vertical">
      <el-card shadow="never" :body-style="{ padding: '30px 120px' }">
        <el-steps :active="currentForm" direction="horizontal" :align-center="true"
            process-status="wait" finish-status="success">
          <el-step v-for="item in StepsList"
            :key="item.title"
            :title="item.title"
            :description="item.description">
            <template #icon>
              <SvgIcon :icon-name="item.icon" :width="30" :height="30" />
            </template>
          </el-step>
        </el-steps>
      </el-card>
      <el-container direction="vertical">
        <el-main height="100px">
          <Step1 v-if="currentForm === 0" @nextStep="nextStep" />
          <Step2 v-else-if="currentForm === 1" @lastStep="lastStep" @nextStep="nextStep" />
          <Step3 v-else @lastStep="lastStep" @nextStep="nextStep" />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import SvgIcon from '@/icons/SvgIcon.vue'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

const currentForm = ref(0)

const StepsList = reactive([
  {
    title: '填写转账信息',
    description: '确保填写正确',
    icon: 'edit'
  },
  {
    title: '确认转账信息',
    description: '确认转账信息',
    icon: 'check'
  },
  {
    title: '完成转账',
    description: '恭喜您，转账成功',
    icon: 'paySuccess'
  }
])
const lastStep = () => {
  currentForm.value -= 1
}
const nextStep = () => {
  currentForm.value += 1
}

</script>

<style lang='scss' scoped>
.stepForm {
  padding: 10px;
  .el-header {
    padding: 20px;
    background: #fff;
    font-size: 20px;
    div {
      font-weight: 600;
    }
    span {
      font-size: 16px;
    }
  }
  .el-container {
    margin: 10px 0;
    background: #fff;
  }
}
</style>
