<template>
  <div class="not-found parallax" @mousemove="parallax" @mouseleave="stopParallax">
    <div class="sky-bg"></div>
    <div class="wave-7 setTransform"></div>
    <div class="wave-6 setTransform"></div>
    <router-link class="wave-island setTransform" to="/DashBoard/WorkTable">
      <img src="http://res.cloudinary.com/andrewhani/image/upload/v1524501929/404/island.svg" alt="Island">
    </router-link>
    <div class="wave-5 setTransform"></div>
    <div class="wave-lost wrp setTransform">
      <span>4</span>
      <span>0</span>
      <span>4</span>
    </div>
    <div class="wave-4 setTransform"></div>
    <div class="wave-boat setTransform">
      <img class="boat" src="http://res.cloudinary.com/andrewhani/image/upload/v1524501894/404/boat.svg" alt="Boat">
    </div>
    <div class="wave-3 setTransform"></div>
    <div class="wave-2 setTransform"></div>
    <div class="wave-1 setTransform"></div>
    <div class="wave-message setTransform">
      <p>Your're lost</p>
      <p>Click on the island to return</p>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans|PT+Sans+Narrow');
$in-out-cubic: cubic-bezier(0.65, 0.05, 0.36, 1);
$xTranslate: v-bind('x');
$yTranslate: v-bind('y');

@mixin transform($transform...) {
  -webkit-transform: $transform;
  -moz-transform: $transform;
  -ms-transform: $transform;
  -o-transform: $transform;
  transform: $transform;
}

@mixin transform-origin($transform-origin...) {
  -webkit-transform-origin: $transform-origin;
  -moz-transform-origin: $transform-origin;
  -ms-transform-origin: $transform-origin;
  -o-transform-origin: $transform-origin;
  transform-origin: $transform-origin;
}

@mixin key-frame($name) {
  @-webkit-keyframes #{$name} {
    @content;
  }

  @-moz-keyframes #{$name} {
    @content;
  }

  @-o-keyframes #{$name} {
    @content;
  }

  /* Standard syntax */
  @keyframes #{$name} {
    @content;
  }
}

@mixin animation($animation...) {
  -webkit-animation: $animation;
  -moz-animation: $animation;
  -o-animation: $animation;
  animation: $animation;
}

@mixin animation-delay($animation...) {
  -webkit-animation-delay: $animation;
  -moz-animation-delay: $animation;
  -o-animation-delay: $animation;
  animation-delay: $animation;
}

.not-found {
  overflow: hidden;
  font-family: 'Open Sans', sans-serif;
}

.not-found {
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;

  [class*="wave"] {
    position: absolute;
    transform: translate(0px, 0px);
    transition: all .7s;
  }

  div {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;

    @for $i from 1 through 7 {
      &.wave-#{$i} {
        background: url(http://res.cloudinary.com/andrewhani/image/upload/v1524501869/404/wave-#{$i}.svg);
      }
    }

    &.sky-bg {
      background: url(http://res.cloudinary.com/andrewhani/image/upload/v1524821915/404/bg-1_gvybzk.svg);
      height: 100%;
    }

    &[class*="wave"]:not(.wave-4) {
      height: calc(100% - 250px);
    }

    &.wave-4 {
      height: calc(100% - 430px);
    }
  }

  .boat {
    position: absolute;
    top: 0;
    right: 15%;
    width: 150px;
    @include animation(boat 15s $in-out-cubic infinite);
  }

  .wave-lost {
    position: absolute;
    top: 20%;
    left: 50%;
    color: #fff;
    font-size: 20rem;
    @include animation(surf 2s);

    span {
      float: left;
      @include animation(float 3s ease-in infinite);

      &:nth-child(2) {
        @include animation-delay(2.5s);
      }

      &:nth-child(3) {
        @include animation-delay(4.5s);
      }
    }
  }

  .wave-island {
    position: absolute;
    top: 130px;
    left: 20%;
    padding: 10px;
    width: 170px;
  }

  .wave-message {
    position: absolute;
    bottom: 100px;
    left: 40%;
    padding-right: 50%;
    height: auto !important;
    color: #fff;
    font-size: 3rem;
    text-align: left;
    @include animation(wave-message 1s);
  }
}

@include key-frame(boat) {
  0% {
    @include transform-origin(left);
    @include transform(rotate(-15deg) translate3d(400px, 0px, 0px));
  }

  20% {
    @include transform-origin(left);
    @include transform(rotate(15deg) translate3d(-20vw, 0, 0px));
  }

  25% {
    @include transform-origin(left);
    @include transform(rotate(-7deg) translate3d(-25vw, 0, 0px));
  }

  50% {
    @include transform-origin(left);
    @include transform(rotate(5deg) translate3d(-50vw, 0, 0px));
  }

  60% {
    @include transform-origin(left);
    @include transform(rotate(-1deg) translate3d(-60vw, 0, 0px));
  }

  100% {
    @include transform-origin(left);
    @include transform(rotate(2deg) translate3d(-100vw, 0, 0px));
  }
}

@include key-frame(float) {

  0%,
  100% {
    @include transform(rotate(3deg) translate3d(0px, -10px, 0px));
  }

  50% {
    @include transform(rotate(-3deg) translate3d(0px, 10px, 0px));
  }
}

@include key-frame(surf) {
  0% {
    @include transform-origin(right);
    @include transform(rotate(15deg) translate3d(0, 800px, 0));
  }

  30% {
    @include transform-origin(right);
    @include transform(rotate(15deg) translate3d(0, 500px, 0));
  }

  100% {
    @include transform-origin(right);
    @include transform(rotate(0) translate3d(0, 0, 0px));
  }
}

@include key-frame(wave-message) {
  0% {
    @include transform(translate3d(0, 120%, 0));
  }

  100% {
    @include transform(translate3d(0, 0, 0));
  }
}
</style>
