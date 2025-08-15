<template>
  <div id="HomeProductDesc">
    <div class="section-1">
      <div class="img">
        <img src="@/assets/AndaSeat-novis-series-ergonomic-gaming-chair.webp" alt="product des">
      </div>

      <div class="des">
        <p class="title">
          50 MP<sup>1</sup> ZEISS Ultra Wide-Angle Camera
        </p>
        <p class="sub-title">
          Ultra-Clear Portrait Resolution
        </p>
        <p class="ctn">
          The 50 MP<sup>1</sup> ZEISS Ultra Wide-Angle Camera has made it possible to capture every cherished moment
          with precision in the frame.
        </p>
      </div>

      <div class="bottom-des">
        <!-- <div class="des-1">
          <p class="title">50 MP<sup>1</sup></p>
          <p class="ctn">High Resolution</p>
        </div>
        <div class="des-2">
          <p class="title">50 MP<sup>1</sup></p>
          <p class="ctn">High Resolution</p>
        </div> -->
      </div>
    </div>

    <div class="section-2">
      <div class="img">
        <img src="@/assets/AndaSeat-novis-series-ergonomic-gaming-chair.webp" alt="product des">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#HomeProductDesc",
      pin: true,
      anticipathPin: 1,
      scrub: 1,
      start: "top top",
      end: "bottom top",
      markers: true,
    },
  });

  tl.fromTo('.section-2 .img', {}, {
    // width: "calc(100% - 60px)",
    // height: "calc(100% - 60px)",
    // onStart: function () {
    //   document.querySelector(".section-1 .img").style.opacity = 0;
    //   document.querySelector(".section-2 .img").style.opacity = 1;
    // },
    // onReverseComplete: function () {
    //   document.querySelector(".section-1 .img").style.opacity = 1;
    //   document.querySelector(".section-2 .img").style.opacity = 0;
    // },
  })
})
</script>

<style scoped lang='scss'>
#HomeProductDesc {
  position: relative;
  height: 100vh;
  background-color: #fff;

  .section-1 {
    position: relative;
    background-color: rgb(95, 252, 173);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 100px;

    .img {
      width: 600px;
      height: 420px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 30px;
    }

    .des {
      max-width: 400px;

      .title {
        color: rgba(0, 0, 0, 0.9);
        margin-bottom: 20px;
        font-size: 20px;
        line-height: 1;
        font-weight: bold;
      }

      .sub-title {
        background: linear-gradient(92deg, #B94863 -11.87%, #EE4C75 45.79%, #B94863 105.29%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 50px;
        font-weight: 700;
        line-height: 60px;
      }

      .ctn {
        color: rgba(0, 0, 0, 0.6);
        margin-top: 20px;
      }
    }
  }

  .section-2 {

    .img {}

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 30px;
    }
  }
}
</style>