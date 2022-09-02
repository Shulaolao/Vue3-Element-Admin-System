<template>
  <div class="cssCarouselCom-container" :style="{
    'width': slideMode === 'row' ? imgWidth + 'px' : imgWidth * 1.2 + 'px',
    'height': slideMode === 'row' ? imgHeight * 1.2 + 'px' : imgHeight + 'px',
  }">
    <ul class="img-container" :style="{
      'flex-direction': slideMode === 'row' ? 'row' : 'column',
      'width': slideMode === 'row' ? imgWidth + 'px' : '100%',
      'height': slideMode === 'row' ? '100%' : imgHeight + 'px',
      '--s': speed + 's', '--w': imgWidth, '--h': imgHeight,
      '--n': number, '--m': slideMode
    }"
      :class="{ 'movePlayRow': autoPlay && slideMode === 'row',
        'movePlayColumn': autoPlay && slideMode === 'column' }">
      <!-- 小点轮播时展示的第一个图片 -->
      <!-- <li v-if="mode === 'fade'">
        <router-view>
          <img :src="addImgList[0].imgSrc" alt="" />
        </router-view>
      </li> -->
      <li v-for="(item, index) in addImgList" :key="index" :class="{
        'movePlayRow': autoPlay && slideMode === 'row',
        'movePlayColumn': autoPlay && slideMode === 'column',
        // 'fade': mode === 'fade'
      }">
        <router-view to='#'>
          <img :src="item.imgSrc" alt="" :id="'imgLi' + index" />
        </router-view>
      </li>
    </ul>
    <!-- 小点轮播 已隐藏 -->
    <ul :style="{
      // 'flex-direction': slideMode === 'row' ? 'row' : 'column',
      // 'height': slideMode === 'row' ? 10 'px' : '100%',
      // 'width': slideMode === 'row' ? '100%' : 10 + 'px',
      // 'bottom': slideMode === 'row' ? '20px' : 'auto',
      // 'right': slideMode === 'column' ? '20px' : 'auto'
    }" class="point-container">
      <li :style="{
        // 'margin': slideMode === 'row' ? '0 10px' : '10px 0'
      }" v-for="(item, index) in addImgList.slice(0, -1)" :key="index"><a :href="'#imgLi' + index"></a></li>
    </ul>
  </div>
</template>

<script>
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
      default: 0.8
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
  }
}
</script>

<style lang='scss' scoped>
.cssCarouselCom-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--h) * 1px);
  width: 200px;
  overflow: hidden;
  cursor: pointer;

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

      // &.fade {
      //   opacity: 0;
      // }

      // &:target {
      //   opacity: 1;
      //   background: #000;
      // }

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
    opacity: 0;
    display: flex;
    justify-content: center;

    li {
      width: 10px;
      height: 10px;
      opacity: .5;
      margin: 0 10px;
      background: green;
      border-radius: 5px;
    }
  }
}
</style>
