<template>
  <div class="admin-system-container">
    <aside class="sideBar" :class="{ 'sideBar-collapse': collapse }">
      <SideBar class="sideBar-container" />
    </aside>
    <section @click.prevent="showSettings = !showSettings" class="sideBar-mask" v-if="showSettings"
      :class="{ 'show-settings': showSettings }">
    </section>
    <section class="right-section" :class="{ 'collapse': collapse }">
      <div class="nav-container" :class="{
        'fixHeader': fixHeader, 'collapse': collapse,
        'both': fixHeader && collapse,
        'only-collapse': !fixHeader && collapse,
        'fixTagsView': fixTagsView
      }">
        <Header v-model:showSettings="showSettings" />
        <TagsView />
      </div>
      <Main class="main-container" :class="{ 'fixHeader': fixHeader, 'onlyFixHeader': fixHeader && !showTagsView }" />
    </section>
    <Teleport to="body">
      <Transition name="settings">
        <Settings v-if="showSettings" />
      </Transition>
    </Teleport>
  </div>
</template>

<script>
import useGetters from '@/store/hooks/useGetters'
import { Header, Main, Settings, SideBar, TagsView } from './Components'
import { ref } from 'vue'

export default {
  name: 'LayoutPage',
  components: {
    Header, Main, Settings, SideBar, TagsView
  },
  setup () {
    const showSettings = ref(false)
    const settingsGetters = useGetters('settings', ['collapse', 'fixHeader', 'showTagsView', 'fixTagsView'])
    // const screenGetters = useGetters('screen', ['device', 'sideBar'])

    return {
      ...settingsGetters,
      // ...screenGetters,
      showSettings
    }
  }
}
</script>

<style lang="scss">
body {
  &.showSettings {
    overflow: hidden !important;
  }
}
</style>

<style lang='scss' scoped>
.admin-system-container {

  .sideBar-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: $showSettings;
    background: rgba($color: #000000, $alpha: .3);

    &.show-settings {
      opacity: 1;
      z-index: 150;
    }
  }

  .right-section {
    transition: $collapse;

    .nav-container {
      position: relative;
      top: 0;
      left: 0;
      transition: $collapse;

      &.fixHeader {
        position: fixed;
        right: 0;
        left: $sideBarWidth;
        top: 0;
        width: calc(100% - #{$sideBarWidth});
        box-shadow: $header-shadow;
      }

      &.collapse {
        width: calc(100% - #{$collapseWidth});
      }

      &.both {
        left: $collapseWidth;
      }

      &.only-collapse {
        width: 100%;
      }

      Header {
        height: 50px;
        background: #fff;
      }
    }

    .main-container {
      position: relative;
      top: 0;
      padding: 10px;
      transition: top .28s;
      background: #f5f7f9;

      &.fixHeader {
        top: $navHeight;
      }

      &.onlyFixHeader {
        top: calc($navHeight - $tagsViewHeight);
      }

      &.fixTagsView {
        top: $tagsViewHeight;
      }
    }
  }

  Settings {
    height: 100%;
    width: $settingsWidth;
  }
}
</style>
