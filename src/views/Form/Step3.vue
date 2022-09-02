<template>
  <div class="step3">
    <el-card shadow="never" :body-style="{ padding: '20px' }">
      <template #header>
        <SvgIcon icon-name="paySuccess" :width="50" :height="50" color="green" />
      </template>
      <el-main height="50px">
        <div style="font-size: 24px;">操作成功</div>
        <span style="font-size: 16px;">预计两小时内到账</span>
      </el-main>
    </el-card>
    <el-main>
      <div class="paySuccess-info">
        <span>付款账户:</span><span class="info-text">{{ payAccount }}</span>
      </div>
      <div class="paySuccess-info">
        <span>收款账户:</span><span class="info-text">{{ collectAccount }}</span>
      </div>
      <div class="paySuccess-info">
        <span>收款人姓名:</span><span class="info-text">{{ collectName }}</span>
      </div>
      <div class="paySuccess-info">
        <span>转账金额:</span><span class="info-text">{{ amount }}</span>
      </div>
    </el-main>
  </div>
</template>

<script setup>
import SvgIcon from '@/icons/SvgIcon.vue'
import { useStore } from 'vuex'

const store = useStore()
const { payAccount, collectAccount, collectName, amount } = store.state.components.stepForm
</script>

<style lang='scss' scoped>
.el-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-main {
  margin: 20px 300px;
  font-size: 18px;
  border: 1px solid #999;

  .paySuccess-info {
    position: relative;

    .info-text {
      position: absolute;
      right: 10px;
    }
  }
}
</style>
