<template>
  <div class="background-img">
    <div class="space"></div>
    <div class="wrapper">
      <div class="img-wrapper">
        <span>44</span>
      </div>
      <p>The page you are trying to search has been <br> moved to another universe.</p>
      <router-link to="/" class="button">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.background-img {
  margin: 0;
  padding: 0;
  background-color: #1e234d;
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
}

.wrapper {
  position: absolute;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  width: fit-content;
  text-align: center;
  z-index: 4;

  span {
    &:first-letter {
      letter-spacing: 12vmax;
    }

    position: relative;
    color: #fff;
    font-weight: 900;
    font-size: 20.4em;
    display: block;
    overflow: hidden;
    width: fit-content;
    height: max-content;

    &:before {
      content: '';
      background-image: url('@/assets/404.webp');
      position: absolute;
      height: 100%;
      width: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      animation: rotateIn 0.5s ease-out;
    }
  }

  p {
    text-align: center;
    font-style: italic;
    font-weight: 400;
    color: #fff;
    margin-top: 0;
    line-height: 22px;
  }

  .button {
    background-color: #f96e4d;
    border: 0;
    padding: 10px 20px;
    border-radius: 50px;
    color: #fff;
    margin-top: 10px;
    cursor: pointer;
    font-weight: 900;
    display: inline-block;
  }
}

.space {
  position: absolute;
  width: 400vw;
  height: 400vh;
  top: 50%;
  left: 50%;
  z-index: 1;
  margin-top: -200vh;
  margin-left: -200vw;
  animation: spin 240s linear infinite;
  background-size: 240px;
  backface-visibility: visible;
  background-image: url("@/assets/star.svg");
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
}

@keyframes rotateIn {
  from {
    transform: rotate(0deg) scale(0.2);
    opacity: 0;
  }

  to {
    transform: rotate(360deg) scale(1);
    opacity: 1;
  }
}
</style>
