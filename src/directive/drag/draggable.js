// import { nextTick } from 'vue'

// const draggable = {
//   mounted (el, binding, vNode) {
//     const [element, child] = binding.value
//     nextTick(() => {
//       const dragDom = el.querySelector('.el-dialog')
//       const childDom = el.querySelector('.el-dialog__header')
//       console.log(el, element, child)
//       console.log(dragDom, childDom)
//     })
//     const dragDom = el.querySelector(element)
//     const childDom = el.querySelector(child)
//     childDom.style.cursor = 'move'

//     dragDom.addEventListener('mousedown', (E) => {
//       const rect = dragDom.getBoundingClientRect()
//       const { top: domTop, left: domLeft } = rect

//       const childLeft = domLeft - childDom.offsetLeft
//       const childTop = domTop - childDom.offsetTop
//       // const offsetLeft = E.clientX - childDom.offsetLeft
//       // const offsetTop = E.clientY - childDom.offsetTop

//       const minDragLeft = dragDom.childLeft
//       const minDragTop = dragDom.childTop

//       const maxDragLeft = E.clientX
//       const maxDragTop = E.clientY

//       document.addEventListener('mousemove', (e) => {
//         let left = e.clientX - childLeft
//         let top = e.clientY - childTop

//         if (-(left) > minDragLeft) {
//           left = -minDragLeft
//         } else if (left > maxDragLeft) {
//           left = maxDragLeft
//         }

//         if (-(top) > minDragTop) {
//           top = -minDragTop
//         } else if (top > maxDragTop) {
//           top = maxDragTop
//         }

//         dragDom.style.left = left
//         dragDom.style.top = top
//       })

//       document.addEventListener('mouseup', () => {
//         document.addEventListener('mousedown', null)
//         document.addEventListener('mousemove', null)
//       })
//     })
//   },
//   beforeUnmount () {
//     document.addEventListener('mouseup', null)
//   }
// }

// export default draggable
