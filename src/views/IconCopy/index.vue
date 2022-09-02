<template>
  <div>
    <header>Click to Copy quickly!</header>
    <section>
      <el-tabs type="border-card" tab-position="top">
        <!-- Project Icon -->
        <el-tab-pane class="title-panel">
          <template #label>
            <el-icon>
              <Pointer />
            </el-icon>
            <span>Project Icons</span>
          </template>
          <div v-for="svg in svgList" :key="svg.name" class="icon-item" @click="copySvgIcon(svg.name)">
            <SvgIcon :width="30" :height="60" :icon-name=svg.name />
            <span>{{ svg.name }}</span>
          </div>
        </el-tab-pane>
        <!-- Element-Plus Icon -->
        <el-tab-pane class="title-panel">
          <template #label>
            <el-icon>
              <ElementPlus />
            </el-icon>
            <span>Element-Plus Icons</span>
          </template>
          <div v-for="icon in elIconList" :key="icon.name" class="icon-item" @click="copyElIcon(icon.iconElName)">
            <el-icon>
              <component :is="icon.iconElName" />
            </el-icon>
            <span>{{ icon.name }}</span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive } from 'vue'
import SvgIcon from '@/icons/SvgIcon.vue'

// 导入所有本地 svg
const svgs = require.context('@/icons/svg', false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys()
}

// 匹配 ./().svg 中间名字部分string
const reg = /\.\/(.*)\.svg/
const svgList = requireAll(svgs).map(svg => {
  return {
    name: svg.match(reg)[1]
  }
})

const elIconList = reactive([])
for (const [key, icon] of Object.entries(ElementPlusIconsVue)) {
  elIconList.push({
    name: icon.__file.split('.')[0],
    iconElName: key
  })
}

const copyElIcon = (iconElName) => {
  // navigator 的 clipboard API
  navigator.clipboard.writeText(`<el-icon><${iconElName} /></el-icon>`).then(() => {
    ElMessage.success('Success Copy!')
  }).catch(err => {
    ElMessage.error(err)
  })
}

const copySvgIcon = (iconName) => {
  // navigator 的 clipboard API
  navigator.clipboard.writeText(
    `<svg-icon><use :xlink:href='#svg-${iconName}' /></svg-icon>`
  ).then(() => {
    ElMessage.success('Success Copy!')
  }).catch(err => {
    ElMessage.error(err)
  })
}

</script>

<style lang='scss' scoped>
header {
  display: flex;
  align-items: center;
  height: 60px;
  margin: 30px 20px 10px;
  padding-left: 20px;
  font-weight: 500;
  background: #eef1f6;
}

section {
  margin: 0 20px;

  .el-tabs {
    height: 100%;

    .title-panel {
      .el-icon {
        height: 20px;
        width: 20px;
      }
    }

    .el-tab-pane {
      height: 100%;

      .icon-item {
        display: inline-block;
        width: 124px;
        height: 100px;
        padding: 5px;
        text-align: center;
        margin: 4px;
        transition: all .5s;

        &:hover {
          background: #f2f6fc;
        }

        .el-icon {
          height: 60px;
          width: 100%;
          padding: auto;

          svg {
            width: 30px;
            height: 30px;
            margin: auto;
          }
        }

        span {
          display: block;
          text-align: center;
        }
      }
    }
  }
}
</style>
