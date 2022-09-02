<template>
  <div>
    <el-container direction="vertical">
      <el-row :gutter="20">
        <el-col :span="24" :offset="0">
          <el-row :gutter="20">
            <el-col :span="24" :offset="0">
              <el-header height="40">
                工作台
              </el-header>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0" class="nowInfo-container">
              <el-image :src="avatar" fit="fill" :lazy="true"></el-image>
              <div class="welcome-box">
                <div class="greeting-text">{{ dayDivision }}好! {{ nickname }}, 又是美好的一天开始啦!</div>
                <span>
                  <SvgIcon icon-name="location" /> {{ $store.state.user.city }}
                </span><span>今天天气 {{ user.weather }}</span> <span>风级
                  {{ user.windPower }}</span> <span>温度
                  {{ user.temp }}</span>
                <span>湿度 {{ user.humidity }}</span>
              </div>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-row :gutter="20" justify="center" align="middle">
                <el-col :span="7" :offset="1">
                  <div class="project-box">项目数</div>
                  <span>18</span>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="message-box">消息</div>
                  <span>16</span>
                </el-col>
                <el-col :span="7" :offset="1">
                  <div class="todo-box">待办</div>
                  <span>24</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="0"></el-col>
        <el-col :span="12" :offset="0"></el-col>
      </el-row>
    </el-container>
    <el-main>
      <el-row :gutter="20">
        <el-col :span="12" :offset="0" class="project-container">
          <el-header height="40">项目</el-header>
          <el-row :gutter="20" class="project-detail">
            <el-col :span="12" :offset="0" style="padding: 0;">
              <div class="project-item" v-for="item in projectList.slice(0, 3)" :key="item.name">
                <div class="project-item-header">
                  <SvgIcon :icon-name="item.icon" :width="30" :height="30" />
                  <span>{{ item.name }}</span>
                </div>
                <div class="project-item-introduce">{{ item.introduce }}</div>
                <div class="project-item-footer">
                  <span class="footer-right">{{ item.author }}</span>
                  <span class="footer-left">{{ item.finishTime }}</span>
                </div>
              </div>
            </el-col>
            <el-col :span="12" :offset="0" style="padding: 0;">
              <div class="project-item" v-for="item in projectList.slice(3, 6)" :key="item.name">
                <div class="project-item-header">
                  <SvgIcon :icon-name="item.icon" :width="30" :height="30" />
                  <span>{{ item.name }}</span>
                </div>
                <div class="project-item-introduce">{{ item.introduce }}</div>
                <div class="project-item-footer">
                  <span class="footer-right">{{ item.author }}</span>
                  <span class="footer-left">{{ item.finishTime }}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="11" :offset="0" class="operation-box">
          <el-header height="40px">快捷操作</el-header>
          <div class="operation-container">
            <div class="operation-item" v-for="item in quicklyList" :key="item.name">
              <Router-link :to="item.path">
                <SvgIcon :icon-name="item.icon" :color="item.color" :width="30" :height="30" />
                <span>{{ item.name }}</span>
              </Router-link>
            </div>
          </div>
          <el-carousel type="card" height="240px" direction="horizontal" :initial-index="0" :autoplay="true"
            :interval="3000" :loop="true" trigger="hover" indicator-position="outside" arrow="hover">
            <el-carousel-item v-for="(img, index) in imgsList" :key="index">
              <img :src="img" alt="">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>

<script setup>
import { getWeather } from '@/api/user'
import useGetters from '@/store/hooks/useGetters'
import { getNowTime } from '@/utils/utils'
import { toRefs } from 'vue'
import { useStore } from 'vuex'
import SvgIcon from '@/icons/SvgIcon.vue'
import imgsList from './img'

const store = useStore()
const { avatar, nickname } = toRefs(store.state.user)

const { dayDivision } = getNowTime()

// getCity().then(res => {
//   console.log(res)
//   const { data } = res
//   if (res.status === 200 && data.code === 1) {
//     const { city } = data.data
//     store.commit('user/Set_City', city)
//   }
// })

if (!store.state.user.weather) {
  getWeather(store.state.user.city).then(res => {
    const { data } = res
    if (res.status === 200 & data.code === 1) {
      const { weather, windPower, temp, humidity } = data.data
      store.commit('user/Set_WeatherInfo', { weather, windPower, temp, humidity })
    }
  }).catch(err => {
    console.log(err)
    store.commit('user/Set_WeatherInfo', { weather: '晴天多云', windPower: '2级', temp: '25°C', humidity: '30%' })
  })
}

const user = useGetters('user', ['weather', 'windPower', 'temp', 'humidity'])

const projectList = [
  {
    icon: 'github',
    name: 'Github',
    introduce: '是一个面向开源及私有软件项目的托管平台。',
    author: '开源君',
    finishTime: '2021-07-10'
  },
  {
    icon: 'vue',
    name: 'Vue',
    introduce: '渐进式 JavaScript 框架',
    author: '学不动也要学',
    finishTime: '2021-10-25'
  },
  {
    icon: 'html5',
    name: 'Html5',
    introduce: 'HTML5是互联网的下一代标准。',
    author: '撸码也是一种艺术',
    finishTime: '2022-01-19'
  },
  {
    icon: 'angular',
    name: 'Angular',
    introduce: '现代 Web 开发平台，百万粉丝热捧。',
    author: '铁粉君',
    finishTime: '2022-03-09'
  },
  {
    icon: 'react',
    name: 'React',
    introduce: '用于构建用户界面的 JavaScript 库',
    author: '技术牛',
    finishTime: '2022-04-11'
  },
  {
    icon: 'js',
    name: 'Js',
    introduce: '路是走出来的，而不是空想出来的。',
    author: '瓦要变强',
    finishTime: '2022-06-10'
  }
]

const quicklyList = [
  {
    icon: 'dashboard',
    name: '主控台',
    path: '/Permission/MasterStation',
    color: '#f286c4'
  },
  {
    icon: 'rolesPermission',
    name: '角色权限',
    path: '/Permission/RolesPermission',
    color: '#62e884'
  },
  {
    icon: 'form',
    name: '表单',
    path: '/Form/DragForm',
    color: '#51c4f1'
  },
  {
    icon: 'excel',
    name: '表格',
    path: '/ExcelVariable/ExportExcel',
    color: '#dbee98'
  },
  {
    icon: 'document',
    name: '内嵌文档',
    path: '/InlineDoc/InlineProject',
    color: '#6b7280'
  },
  {
    icon: 'pieChart',
    name: 'EChart 图表',
    path: '/EChartsCool/ComplexChart',
    color: '#bf9eee'
  }
]

</script>

<style lang='scss' scoped>
.el-container {
  width: 100%;
  height: 100%;
  padding: 10px 10px 20px 10px;
  background: #fff;

  .el-header {
    font-size: 22px;
    line-height: 40px;
  }

  .nowInfo-container {
    display: flex;

    .el-image {
      height: 60px;
      width: 60px;
      margin-left: 20px;
      border-radius: 50%;
      background: #f4f4f4;
      box-shadow: -3px 3px 4px #bebebe,
        3px -3px 4px #ffffff;
    }

    .welcome-box {
      .greeting-text {
        height: 24px;
        margin: 10px auto 5px 10px;
        line-height: 24px;
        font-size: 20px;
      }

      span {
        height: 20px;
        margin-right: 10px;
        transition: all .5s;

        &:hover {
          text-shadow: 3px 3px 4px #999;
        }
      }
    }
  }

  .project-box,
  .message-box,
  .todo-box {
    font-size: 18px;
  }
}

.el-main {
  height: 700px;
  padding-top: 14px;

  .project-container {
    background: #fff;
    margin-right: 30px;

    .project-detail {
      background: #fff;

      .project-item {
        height: 140px;
        padding: 10px 20px 20px;
        border: 1px solid #f3f3f3;
        user-select: none;
        transition: all .5s;

        &:hover {
          box-shadow: -2px 2px 3px #bebebe,
            -2px -2px 3px #ffffff;
        }

        .project-item-header {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-bottom: 5px;

          .svg-icon {
            margin: 0 10px;
          }

          span {
            height: 40px;
            font-size: 18px;
            line-height: 40px;
          }
        }

        .project-item-introduce {
          height: 40px;
          line-height: 20px;
          margin-bottom: 5px;
        }
      }
    }
  }

  .el-header {
    line-height: 40px;
    font-size: 18px;
    border-bottom: 1px solid #d3d3d3;
  }

  .operation-box {
    height: 220px;
    background: #fff;
    cursor: pointer;

    .operation-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 80px);

      .operation-item {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #f3f3f3;
        transition: all .5s;

        &:hover {
          box-shadow: -2px 2px 3px #bebebe,
            -2px -2px 3px #ffffff;
        }

        a {
          display: block;
          text-align: center;
          color: black;
          font-size: 16px;

          .svg-icon {
            display: block;
            margin: auto;
          }
        }
      }
    }

    .el-carousel {
      margin-top: 60px;

      img {
        height: 100%;
        width: 400px;
      }
    }
  }
}
</style>
