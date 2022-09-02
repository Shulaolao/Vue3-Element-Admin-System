import permission from './permission/permission'
// import draggable from './drag/draggable' // 用 dialog 自带属性 draggable 替换

const directives = {
  permission
  // draggable
}

// 使用 myDirectives(app) 来注册
// const myDirectives = (app) => {
//   Object.keys(directives).forEach((item) => {
//     app.directive(item, directives[item])
//   })
// }

// 使用 app.use(myDirectives) 来注册
const myDirectives = {
  // install 也可以是一个插件的函数
  install (app, options) {
    Object.keys(directives).forEach((item) => {
      app.directive(item, directives[item])
    })
  }
}

// 批量全局注册自定义指令
export default myDirectives
