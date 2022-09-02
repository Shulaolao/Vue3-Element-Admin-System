<template>
  <div class="settings-container">
    <el-scrollbar>

      <!-- 界面主题 -->
      <el-container direction="vertical">
        <el-header height="30px">
          <el-divider direction="horizontal" content-position="left">
            <span class="function-title">
              界面主题 Theme
            </span>
          </el-divider>
        </el-header>
        <el-container direction="vertical">
          <el-main height="200px">
          </el-main>
        </el-container>
      </el-container>

      <!-- 界面字体 -->
      <el-container direction="vertical">
        <el-header height="">
          <el-divider direction="horizontal" content-position="left">
            <span class="function-title">
              界面字体 Font
            </span>
          </el-divider>
        </el-header>
        <el-container direction="horizontal">
          <el-container direction="vertical">
            <el-main height="">
            </el-main>
          </el-container>
        </el-container>
      </el-container>

      <!-- 界面功能、界面显示 -->
      <el-container direction="vertical" v-for="(item, index) in settingsList" :key="index">
        <el-header height="30px">
          <el-divider direction="horizontal" content-position="left">
            <span class="function-title">
              {{ item.title }}
            </span>
          </el-divider>
        </el-header>
        <el-container direction="vertical">
          <el-main>
            <div class="switch-item" v-for="(subitem, subindex) in item.switchArr" :key="subindex">
              <span class="switch-title">{{ subitem.title }}</span>
              <el-switch v-model="subitem.value" :inactive-color="variables.menuBgColor" inline-prompt
                :active-value="true" :inactive-value="false" :inactive-text="subitem.inactiveText"
                :active-text="subitem.activeText" @change="subitem.event" size="large"
                :disabled="subitem.title === '固定多页签'" >
              </el-switch>
            </div>
          </el-main>
        </el-container>
      </el-container>

    </el-scrollbar>
  </div>
</template>

<script setup>
import variables from '@/assets/styles/variables.module.scss'
import useActions from '@/store/hooks/useActions'
import { reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const { fixTagsView, fixHeader, showLogo, showBread, showReload, showTagsView } = store.state.settings

const settingsA = useActions('settings', ['setFixHeader', 'setFixTagsView', 'setShowReload', 'setShowLogo', 'setShowBread', 'setShowTagsView'])

const changeHeaderFix = () => {
  // store.dispatch('settings/setFixHeader')
  // 比传统调用更简洁些
  settingsA.setFixHeader()
}

const changeTagsView = () => {
  settingsA.setFixTagsView()
}

const handleReload = () => {
  settingsA.setShowReload()
}

const handleLogo = () => {
  settingsA.setShowLogo()
}

const handleBreadcrumb = () => {
  settingsA.setShowBread()
}

const handleTagsView = () => {
  settingsA.setShowTagsView()
}

const settingsList = reactive([
  {
    title: '界面功能',
    switchNum: 2,
    switchArr: [
      {
        title: '固定导航顶栏',
        activeText: 'Y',
        inactiveText: 'N',
        value: fixHeader,
        event: changeHeaderFix
      },
      {
        title: '固定多页签',
        activeText: 'Y',
        inactiveText: 'N',
        value: fixTagsView,
        event: changeTagsView
      }
    ]
  },
  {
    title: '界面显示',
    switchNum: 3,
    switchArr: [
      {
        title: '显示Logo',
        activeText: 'Y',
        value: showLogo,
        event: handleLogo
      },
      {
        title: '显示重载页面按钮',
        activeText: 'Y',
        inactiveText: 'N',
        value: showReload,
        event: handleReload
      },
      {
        title: '显示面包屑导航',
        activeText: 'Y',
        inactiveText: 'N',
        value: showBread,
        event: handleBreadcrumb
      },
      {
        title: '显示多页签',
        activeText: '显示',
        inactiveText: 'N',
        value: showTagsView,
        event: handleTagsView
      }
    ]
  }
])
</script>

<style lang='scss' scoped>
.settings-container {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 200;
  width: $settingsWidth;
  height: 100%;
  background: #fff;

  .el-scrollbar {
    padding: 20px 10px;

    .el-container {
      .el-header {
        .function-title {
          font-size: 16px;
          font-weight: 600;
        }
      }

      .el-main {
        .switch-item {
          display: flex;
          justify-content: space-around;

          .switch-title {
            width: 160px;
            font-size: 16px;
            line-height: 40px;
          }

          .el-switch {}
        }
      }
    }
  }
}
</style>
