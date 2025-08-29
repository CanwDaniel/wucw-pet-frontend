<template>
  <div id="homeVideo">
    <video id="video" class="video" ref="videoRef" src="@/assets/os.webm" preload="auto" muted
      playsinline="true"></video>
    <section :class="['box', isActive ? 'active' : '']">
      <div class="logo">
        <img src="@/assets/logo.svg" alt="logo">
      </div>
      <div class="desc">Your First <br /> Gaming Chair</div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const videoRef = ref(null);
const isActive = ref(false);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: "#homeVideo",
    start: "top top",
    end: "+=1000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    animation: gsap
      .timeline()
      .to("#video", {
        opacity: 1, onStart: function () {
          if (videoRef.value) {
            videoRef.value.currentTime = 0;
            videoRef.value.play();
          }

          isActive.value = true;
        }, onReverseComplete: function () {
          isActive.value = false;
        }
      })
  });
})
</script>

<style scoped lang='scss'>
#homeVideo {
  height: 100vh;
  position: relative;
  background-color: #000;

  .video {
    width: 100%;
    height: 100%;
  }

  .box {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;

    img {
      width: 400px;
    }

    .logo,
    .desc {
      opacity: 0;
      transition: all 0.5s;
      will-change: opacity;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .desc {
      background: linear-gradient(96deg, #B42247 -11.3%, #B94863 24.19%, #F5AABB 58.28%, #F5AABB 93.07%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 76px;
      font-weight: 700;
      text-align: center;
      line-height: 90px;
    }
  }

  .box.active {
    .logo {
      animation: logoHide 1.5s ease-in-out forwards;
    }

    .desc {
      opacity: 1;
      transition-delay: 1.5s;
    }
  }

  @keyframes logoHide {
    0% {
      opacity: 1;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
}
</style>