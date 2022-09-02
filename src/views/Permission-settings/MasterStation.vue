<template>
  <div class="eCharts-container">
    <section class="tabs">
      <div class="tab-item" v-for="(item, index) in tabsList" :key="index">
        <div class="visit-container" v-if="item.name === 'Visits'">
          <div class="tab-item-label">
            <div class="left-label">{{ item.name }}</div>
            <div class="right-label">
              <el-switch v-model="opacityChart" :active-value="1" :inactive-value="0" active-text="月"
                inactive-text="日" inline-prompt @change="handleChart" style="--el-switch-off-color: #13ce66">
              </el-switch>
            </div>
          </div>
          <div class="tab-item-main">
            <div>{{ item.day }}</div>
            <span>日同比{{ item.compare }}%</span>
          </div>
          <div class="tab-item-footer">
            <span>{{ item.account }}</span>
            <span>总</span>
          </div>
        </div>
        <div class="others-container" v-else>
          <div class="tab-item-label">
            <div class="left-label">{{ item.name }}</div>
            <div class="right-label">日</div>
          </div>
          <div class="tab-item-main">
            <div>{{ item.day }}</div>
            <span>日同比{{ item.compare }}%</span>
          </div>
          <div class="tab-item-footer">
            <span>{{ item.account }}</span>
            <span>总</span>
          </div>
        </div>
      </div>
    </section>
    <BarChart id="days" :xData="daysData.xData"
      :yData="daysData.yData" xAxis="日期" yAxis="日访问量" :yMax="daysData.yMax" />
    <BarChart id="months" :xData="monthsData.xData"
      :yData="monthsData.yData" xAxis="月份" yAxis="月访问量" :yMax="monthsData.yMax" />
  </div>
</template>

<script setup>
import { getMaster } from '@/api/master'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import BarChart from '@/components/ECharts/BarChart.vue'

const store = useStore()

const daysData = reactive({
  xData: [],
  yData: [],
  yMax: null
})
const monthsData = reactive({
  xData: [],
  yData: [],
  yMax: null
})

const opacityChart = ref(0)

const tabsList = reactive([
  {
    name: 'Visits',
    day: Math.floor(Math.random() * 200 + 20) + '人次',
    account: 0,
    compare: Math.floor(Math.random() * 100)
  }, {
    name: 'Messages',
    day: Math.floor(Math.random() * 50 + 5),
    account: 0,
    compare: Math.floor(Math.random() * 100)
  }, {
    name: 'Sale',
    day: '￥' + Math.floor(Math.random() * 200000 + 2000),
    account: 0,
    compare: Math.floor(Math.random() * 100)
  }, {
    name: 'Orders',
    day: Math.floor(Math.random() * 2000 + 200) + '个',
    account: 0,
    compare: Math.floor(Math.random() * 100)
  }, {
    name: 'Users',
    days: 0,
    account: 0,
    compare: Math.floor(Math.random() * 100)
  }
])

getMaster(store.state.user.token).then(res => {
  const { data } = res
  if (res.status === 200 && data.code === 20000) {
    const { users, visits, messages, orders, sale } = data.data
    const { days, months } = visits
    daysData.xData = days.map(item => {
      return item.Day
    })
    daysData.yData = days.map(item => {
      return item.num
    })
    daysData.yMax = Math.max.apply(Math, daysData.yData) + 20
    monthsData.xData = months.map(item => {
      return item.Month
    })
    monthsData.yData = months.map(item => {
      return item.num
    })
    monthsData.yMax = Math.max.apply(Math, monthsData.yData) + 1000
    tabsList[0].account = visits.all
    tabsList[1].account = messages
    tabsList[2].account = orders
    tabsList[3].account = '￥' + sale
    tabsList[4].account = users.super + users.common
    tabsList[4].day = users.super + users.common + '位'
  }
})

const handleChart = (newVal) => {
  opacityChart.value = newVal
}

</script>

<style lang='scss' scoped>
.eCharts-container {
  background: #f5f7f9;
  padding: 20px 10px;

  section.tabs {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 200px;
    grid-column-gap: 20px;
    margin: 0 30px 20px;

    .tab-item {
      position: relative;
      height: 200px;
      background: #fff;
      border-radius: 3px;

      .tab-item-label {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: relative;
        height: 50px;
        font-size: 20px;
        border-bottom: 1px solid #e3e3e3;

        .left-label {
          position: absolute;
          padding: 10px;
          left: 0;
        }

        .right-label {
          position: absolute;
          right: 0;
          padding: 10px;
        }
      }

      .tab-item-main {
        padding: 10px 20px 10px;
        font-size: 30px;

        span {
          font-size: 16px;
        }
      }

      .tab-item-footer {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 0;
        height: 40px;
        width: 100%;
        border-top: 1px solid #e3e3e3;
      }
    }
  }
}
</style>
