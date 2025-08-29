<template>
  <div id="HomeProductDesc">
    <div class="section-1">
      <div class="section-1-contain">
        <div class="img-box">
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
      </div>
    </div>

    <div class="section-2">
      <div class="section-2-contain">
        <div class="img-box">
          <img src="@/assets/AndaSeat-novis-series-ergonomic-gaming-chair.webp" alt="product des">
        </div>
      </div>

      <div class="bottom-des">
        <div class="des">
          <p class="title">50 MP<sup>1</sup></p>
          <p class="ctn">High Resolution</p>
        </div>
        <div class="des">
          <p class="title">50 MP<sup>1</sup></p>
          <p class="ctn">High Resolution</p>
        </div>
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
    },
  });
  tl.to('.section-2', {}, '+=0.2')
  tl.fromTo('.section-2 .img-box', {}, {
    width: "100%",
    height: "80%",
    onStart: function () {
      if (document.querySelector(".section-1 .img-box")) {
        document.querySelector(".section-1 .img-box").style.opacity = 0;
      }
      if (document.querySelector(".section-2 .img-box")) {
        document.querySelector(".section-2 .img-box").style.opacity = 1;
      }
    },
    onReverseComplete: function () {
      document.querySelector(".section-1 .img-box").style.opacity = 1;
      document.querySelector(".section-2 .img-box").style.opacity = 0;
    },
  })
    .to('.bottom-des', {
      bottom: '140px',
      opacity: 1
    })
  tl.to('.section-2', {}, '+=0.2')
})
</script>

<style scoped lang='scss'>
#HomeProductDesc {
  position: relative;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  .section-1 {
    position: relative;
    height: 100%;

    .section-1-contain {
      width: 1440px;
      height: 100%;
      display: flex;
      align-items: center;
      gap: 100px;
    }

    .img-box {
      width: 680px;
      height: 460px;
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
    position: absolute;
    top: 0;
    height: 100%;

    .section-2-contain {
      width: 1440px;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .img-box {
      width: 680px;
      height: 460px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 30px;
    }

    .bottom-des {
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: flex-start;
      gap: 50px;
      opacity: 0;

      sup {
        font-size: 16px;
        position: relative;
        top: -2px;
        left: 2px;
        line-height: 0;
        vertical-align: super;
      }

      .des {
        border-top: 2px solid #fff;
        width: 200px;

        .title {
          padding-top: 20px;
          color: #fff;
          font-size: 40px;
          line-height: 46px;
        }

        .ctn {
          color: rgba(255, 255, 255, 0.65);
          font-size: 16px;
        }
      }
    }
  }
}
</style>