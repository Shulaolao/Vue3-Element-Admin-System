<template>
  <div class="tagsView-container" id="tagsView-container" v-show="{'showTagsView': showTagsView}"
    :class="{ 'fix': fixTagsView, 'onlyFix': fixTagsView && !collapse, 'fix-collapse': collapse && fixTagsView, 'showTagsView': showTagsView }">
    <ScrollPane class="scroll-container">
      <VueDraggableNext v-model="viewsList" animation="300" item-key="title" class="draggable-container"
        @start="onStart" @end="onEnd" ghost-class="ghost" chosen-class="chosenClass" :force-fallback="true">
        <el-tag v-for="(tag, index) in viewsList" :key="index" color="white" size="default" effect="light"
          :closable="tag.title === $t('routes.WorkTable') ? false : true" @close="closeTag(tag)" class="tag-view-item"
          @click.stop="goNewPath(tag)">
          <router-link :to="tag.path" :class="{ 'activeTag': $route.meta.title === tag.title }">
            {{ tag.title }}
          </router-link>
        </el-tag>
      </VueDraggableNext>
    </ScrollPane>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScrollPane from './scrollPane.vue'
import { VueDraggableNext } from 'vue-draggable-next'
import useGetters from '@/store/hooks/useGetters'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const settings = useGetters('settings', ['fixTagsView', 'collapse', 'showTagsView', 'fixTop'])
const { collapse, showTagsView, fixTagsView } = settings

const tagsTitle = computed(() => {
  return viewsList.value.map(item => item.title)
})

const viewsList = ref([
  {
    title: t('routes.WorkTable'),
    path: '/WorkTable'
  }
])

onMounted(() => {
  if (route.meta.title !== t('routes.WorkTable')) {
    viewsList.value.push({ title: route.meta.title, path: route.fullPath })
  }
})

const onStart = () => {
  console.log('drag start')
}
const onEnd = () => {
  console.log('drag end')
}

watch(route, () => {
  if (route?.meta.title && route?.fullPath && !tagsTitle.value.includes(route.meta.title)) {
    viewsList.value.push({
      title: route.meta.title,
      path: route.fullPath
    })
  }
})

const closeTag = (tag) => {
  if (tag.title !== t('routes.WorkTable')) {
    viewsList.value = viewsList.value.filter(item => {
      return item.title !== tag.title
    })
  }
}

const goNewPath = (tag) => {
  router.push(tag.path)
}

const store = useStore()

const onScroll = (el) => {
  const distance = el.target.scrollTop || document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
  if (fixTagsView && distance > 50) {
    store.dispatch('settings/setFixTop')
  }
}
window.addEventListener('scroll', onScroll, true)

</script>

<style lang='scss'>
.tagsView-container {
  position: relative;
  height: 0;
  width: 100%;
  padding: auto;
  background: #f5f7f9;
  transition: all .28s;

  &.showTagsView {
    height: $tagsViewHeight;
  }

  &.fix {
    position: fixed;
  }

  &.onlyFix {
    left: $sideBarWidth;
  }

  &.fix-collapse {
    left: $collapseWidth;
  }

  .scroll-container {
    white-space: nowrap;
    padding: auto 80px auto 80px;

    .draggable-container {
      display: flex;
      height: 100%;
    }

    .ghost {
      border: 1px dashed #409ef1 !important;
      ;
    }

    .chosenClass {
      background-color: #f2f2f2 !important;
      box-shadow: none !important;
      background: #fff !important;
    }

    span.tag-view-item {
      margin: auto 4px;
      border: 0;
      height: $tagsHeight;
      border-radius: 10px;
      background: #fafafa;
      box-shadow: inset 5px 5px 14px #c5c5c5, inset -5px -5px 14px #e3e3e3;

      span>a {
        color: #555;

        &.activeTag {
          color: #3e9eff !important;
        }
      }

      svg {
        color: #333 !important;
      }

      // 图标样式穿透问题导致的无效，把 scoped 去掉即可
      i.el-tag__close {
        transition: all 1s;
        &:hover {
          background-color: #e3e3e3;
        }
      }
    }
  }
}
</style>
