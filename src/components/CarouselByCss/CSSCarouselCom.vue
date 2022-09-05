<template>
  <div class="cssCarouselCom-container" :style="{
    'width': imgWidth + 'px',
    'height': imgHeight + 'px',
  }">
    <!-- 控制转到第几张按钮 -->
    <input type="radio" name="dir" class="dir" v-for="(item, index) in addImgList" :key="index" :id="'imgLi' + index">

    <!-- 控制往左边轮播 -->
    <input type="radio" name="dir" class="dir" v-for="(item, index) in addImgList" :key="index" :id="'left' + index">

    <!-- 控制往右边轮播 -->
    <input type="radio" name="dir" class="dir" v-for="(item, index) in addImgList" :key="index" :id="'right' + index">

    <!-- 图片 -->
    <ul class="img-container" :style="{
      'flex-direction': slideMode,
      'width': slideMode === 'row' ? imgWidth + 'px' : '100%',
      'height': slideMode === 'row' ? '100%' : imgHeight + 'px',
      '--s': speed + 's', '--w': imgWidth, '--h': imgHeight,
      '--n': number, '--m': slideMode
    }"
      :class="{
        'movePlayRow': autoPlay && slideMode === 'row',
        'movePlayColumn': autoPlay && slideMode === 'column'
      }">
      <li v-for="(item, index) in addImgList" :key="index" :class="{
        'movePlayRow': autoPlay && slideMode === 'row',
        'movePlayColumn': autoPlay && slideMode === 'column',
      }" :style="{
  'width': slideMode === 'row' ? '100%' : imgWidth + 'px',
  'height': slideMode === 'row' ? imgHeight + 'px' : '100%'
}">
          <img :src="item.imgSrc" alt="" />
      </li>
    </ul>

    <!-- 播放上一个图片的按钮 -->
    <div class="pre-Box dir-Box"
      :style="{
        top: slideMode === 'row' ? 'auto' : 0, left: slideMode === 'row' ? 0 : 'auto',
        height: slideMode === 'row' ? .5 * imgHeight + 'px' : .1 * imgHeight + 'px',
        width: slideMode === 'row' ? .2 * imgWidth + 'px' : .5 * imgWidth + 'px'
      }">
      <label v-for="(item, index) in addImgList" :key="index" :for="'left' + index"
        :class="'preBtn' + index">
        <template>
          <SvgIcon icon-name="arrow-right" />
        </template>
      </label>
    </div>

    <!-- 播放下一个图片的按钮 -->
    <div class="nex-Box dir-Box"
      :style="{
        bottom: slideMode === 'row' ? 'auto' : 0, right: slideMode === 'row' ? 0 : 'auto',
        height: slideMode === 'row' ? .5 * imgHeight + 'px' : .1 * imgHeight + 'px',
        width: slideMode === 'row' ? .2 * imgWidth + 'px' : .5 * imgWidth + 'px'
      }">
      <label v-for="(item, index) in addImgList" :key="index" :for="'right' + index"
        :class="'nexBtn' + index">
        <template>
          <SvgIcon icon-name="arrow-left" />
        </template>
      </label>
    </div>

    <!-- 小点轮播 已隐藏 -->
    <!-- <ul :style="{
      'flex-direction': slideMode === 'row' ? 'row' : 'column',
      'height': slideMode === 'row' ? 10 + 'px' : '100%',
      'width': slideMode === 'row' ? '100%' : 10 + 'px',
      'bottom': slideMode === 'row' ? '20px' : 'auto',
      'right': slideMode === 'column' ? '20px' : 'auto'
    }" class="point-container">
      <li :style="{
        'margin': slideMode === 'row' ? '0 10px' : '10px 0'
      }" v-for="(item, index) in addImgList.slice(0, -1)" :key="index">
        <label :for="'imgLi' + index" :class="'imgLi' + index"></label>
      </li>
    </ul> -->
  </div>
</template>

<script>
import SvgIcon from '@/icons/SvgIcon.vue'
// 1 纵横向滑动轮播
// 2 控制自动播放
export default {
  name: 'CSSCarouselCom',
  props: {
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播图模式：淡入淡出
    // mode: {
    //   required: true,
    //   type: String,
    //   default: 'fade'
    // },
    slideMode: {
      type: String,
      default: 'row'
    },
    number: {
      required: true,
      type: Number,
      default: 0
    },
    imgWidth: {
      type: Number,
      default: 200
    },
    imgHeight: {
      type: Number,
      default: 200
    },
    // s 秒
    speed: {
      type: Number,
      default: 1
    },
    imgList: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const addImgList = []
    addImgList.push(...props.imgList, props.imgList[0])
    return {
      props,
      addImgList
    }
  },
  components: { SvgIcon }
}
</script>

<style lang='scss' scoped>
// @import './control.scss';

.cssCarouselCom-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--h) * 1px);
  width: 200px;
  overflow: hidden;

  input[type=radio] {
    display: none;
  }

  .dir-Box {
    position: absolute;

    label {
      display: none;
      width: 40px;
      height: 40px;
    }
  }

  .pre-Box {
  }

  .nex-Box {
  }

  ul.img-container {
    display: flex;
    padding: 0;
    flex-wrap: nowrap;
    animation: none;

    &.movePlayRow {
      animation: moveRow calc(var(--s) * var(--n)) steps(var(--n)) infinite;
    }

    &.movePlayColumn {
      animation: moveColumn calc(var(--s) * var(--n)) steps(var(--n)) infinite;
    }

    @keyframes moveRow {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(calc(var(--n) * var(--w) * -1px), 0);
      }
    }

    @keyframes moveColumn {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(0, calc(var(--n) * var(--h) * -1px));
      }
    }

    li {
      list-style: none;
      flex-shrink: 0;
      width: 200px;
      height: 200px;
      transition: all calc(var(--s));
      animation: none;

      &.movePlayRow {
        animation: liMoveRow calc(var(--s)) infinite;
      }

      &.movePlayColumn {
        animation: liMoveColumn calc(var(--s)) infinite;
      }

      @keyframes liMoveColumn {
        0% {
          transform: translate(0, 0);
        }

        80%,
        100% {
          transform: translate(0, calc(var(--h) * -1px));
        }
      }

      @keyframes liMoveRow {
        0% {
          transform: translate(0, 0);
        }

        80%,
        100% {
          transform: translate(calc(var(--w) * -1px), 0);
        }
      }

      img {
        width: 100%;
        height: 100%;

        &:target {
          border: 1px solid blue;
        }
      }
    }
  }

  ul.point-container {
    position: absolute;
    bottom: 10px;
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      display: flex;
      align-items: center;
      width: 10px;
      height: 10px;
      opacity: .5;
      margin: 0 10px;
      background: white;
      border-radius: 5px;

      label {
        border-radius: 5px;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
