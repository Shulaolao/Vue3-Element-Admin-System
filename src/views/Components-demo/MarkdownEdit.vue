<template>
  <div class="markdownEdit-container">
    <div id="toast-ui-editor">
    </div>
    <div id="chart-area"></div>
  </div>
</template>

<script setup>
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'
// 导入所有语言
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js'
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import colorSyntax from '@toast-ui/editor-plugin-color-syntax'
import '@toast-ui/chart/dist/toastui-chart.css'
import chartPlugin from '@toast-ui/editor-plugin-chart'

import { onMounted, ref } from 'vue'

const content = ref('')
const theme = ref('')

// const createElSwitch = () => {
//   const div = document.createElement('div')
//   const icon = "<svg width='20px' height='32px'><use xlink:href='#icon-theme' /></svg>"
//   div.innerHTML = icon
//   return div
// }

const initMarkdown = () => {
  const editor = new Editor(options.value)
  // editor.addCommand(String, 'theme', handleTheme)
  // editor.insertToolbarItem({ groupIndex: 0, itemIndex: 0 }, {
  //   name: 'theme',
  //   el: createElSwitch(),
  //   tooltip: 'reload to change theme',
  //   command: 'theme'
  // })
  editor.getMarkdown()
}

const options = ref({})

// 点击工具栏皮肤实现 theme 切换
// const handleTheme = (val) => {
// console.log(val)
// console.log(1)
// options.value.theme = theme.value === 'dark' ? 'dark' : ''
// }

onMounted(() => {
  options.value = {
    el: document.querySelector('#toast-ui-editor'),
    height: '500px',
    initialValue: content.value,
    initialEditType: 'wysiwyg', // 'wysiwyg' 所见即所得; 'markdown' 编辑视图分离
    // previewHighlight: true,
    autofocus: true,
    theme: theme,
    placeholder: 'Writing your text here',
    plugins: [[codeSyntaxHighlight, { highlighter: Prism }], [colorSyntax], [chartPlugin, { minHeight: 100, minWidth: 100, maxHeight: 200, maxWidth: 200 }]],
    toolbarItems: [
      ['heading', 'bold', 'italic', 'strike'],
      ['hr', 'quote'],
      ['ul', 'ol', 'task', 'indent', 'outdent'],
      ['table', 'image', 'link'],
      ['code', 'codeblock']
      // [{
      //   name: 'theme',
      //   el: createElSwitch(),
      //   tooltip: 'reload to change theme',
      //   command: changeTheme()
      // }]
    ]
  }
  initMarkdown(options.value)
})

</script>

<style lang='scss' scoped>
.markdownEdit-container {
  height: 100%;
  width: 100%;
  padding: 10px;
  background: #fff;
}
</style>
