<template>
  <div class="search-container" :class="{ 'show': showSelect }">
    <el-tooltip :hide-after="10" content="search for page" placement="left" effect="dark">
      <SvgIcon icon-name="search" class="svg-icon" :width="iconSize.width" @click.stop="click" :height="iconSize.height" />
    </el-tooltip>
    <el-select ref="headerSearchSelect" v-model="searchText" :placeholder="$t('searchPlaceholder')" clearable remote filterable
      class="show-select" :remote-method="querySearch" @change="change">
      <el-option v-for="item in options" :key="item.item.path" :label="item.item.title.join(' > ', ',')" :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { watch, ref, onMounted, computed } from 'vue'
import SvgIcon from '@/icons/SvgIcon.vue'
import Fuse from 'fuse.js'
import path from 'path-browserify'
import useGetters from '@/store/hooks/useGetters'

const headerSearchSelect = ref(null)
const searchText = ref('')
const iconSize = {
  width: 18,
  height: 18
}

const showSelect = ref(false)
const searchPool = ref([])
const fuse = ref(null)
const options = ref([])

const click = () => {
  showSelect.value = !showSelect.value
  if (showSelect.value) {
    headerSearchSelect.value && headerSearchSelect.value.focus()
  }
}

const hidden = () => {
  showSelect.value = false
  headerSearchSelect.value && headerSearchSelect.value.blur()
  options.value = []
  searchText.value = ''
}

const initFuse = list => {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    // 加权搜索
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
}

const flattenArr = (routes = [], basePath = '/', prefixTitle = []) => {
  let res = []

  for (const router of routes) {
    if (router?.hidden) continue

    const data = {
      path: path.resolve(basePath, router.path),
      title: [...prefixTitle]
    }

    if (router.meta && router.meta.title) {
      data.title = [...data.title, router.meta.title]

      if (router.redirect !== 'noRedirect') {
        res.push(data)
      }
    }

    if (router?.children) {
      const tempRoutes = flattenArr(router.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

const querySearch = (value) => {
  if (value.trim() !== '') {
    options.value = fuse.value.search(value)
  } else {
    options.value = []
  }
}

const change = (value) => {
  console.log(value)
}

const permissionGetters = useGetters('permission', ['routes'])

const routes = computed(() => permissionGetters.routes)

onMounted(() => {
  // console.log(routes)
  // console.log(routes.value)
  // console.log(routes.value.value)
  // routes.value.value 才能拿到 routes 的值
  // 原因：vuex useMapper 的封装
  searchPool.value = flattenArr(routes.value.value)
})

watch(showSelect, async value => {
  if (value) {
    document.body.addEventListener('click', hidden)
  } else {
    document.body.removeEventListener('click', hidden)
  }
})
watch(searchPool, async (val) => { initFuse(val) })
watch(routes, async (value) => {
  searchPool.value = flattenArr(value.value)
})

</script>

<style lang='scss' scoped>
.search-container {
  position: relative;
  top: -2px;
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  transition: width .28s;

  .el-tooltip {
    display: inline-block;

    .svg-icon {
      display: inline-block;
      width: 24px;
      vertical-align: middle;
    }
  }

  .show-select {
    display: inline-block;
    vertical-align: middle;
    transition: all .2s;
    width: 0;
    height: 32px;
    overflow: hidden;
    border-radius: 0;
    margin: 0px 0px 0 6px;
  }

  &.show {

    .show-select {
      display: inline-block;
      width: 210px;
      margin: 0px 0px 0 6px;
    }
  }
}
</style>
