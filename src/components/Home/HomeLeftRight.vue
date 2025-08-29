<template>
  <div id="homeLeftRight">
    <div class="left-img">
      <img src="@/assets/AndaSeat-novis-series-ergonomic-gaming-chair-with-soft-seat.webp" alt="left img">
    </div>

    <div class="right-img">
      <div class="content">
        <div class="des">
          <p class="title">Sleek Look Game After Game</p>
          <p class="sub-title">Select PVC leather. </p>
          <p class="desc">Color-fast, wear-resistant, and easy-to-clean. Handles your long gaming sessions, in-chair
            snack breaks,
            and more effortlessly. No compromise — just lasting comfort.</p>
        </div>

        <img src="@/assets/sleek-look-game-after-game.webp" alt="right img">
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#homeLeftRight",
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      start: "top top",
      end: "bottom top",
    },
  });

  tl
    .fromTo(".left-img", { marginLeft: "0px", opacity: 1 }, { marginLeft: "-500px", opacity: 0 })
    .fromTo(".right-img", { marginLeft: "300px", opacity: 0 }, { marginLeft: "0px", opacity: 1 }, "<+=0.3s")
})
</script>

<style scoped lang='scss'>
#homeLeftRight {
  position: relative;
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .left-img {}

  .right-img {
    position: absolute;
    opacity: 0;

    .content {
      display: flex;
      align-items: center;
      gap: 100px;
    }

    .title {
      font-weight: bold;
      font-size: 32px;
      color: black;
      line-height: 1;
      margin-bottom: 30px;
    }

    .sub-title {
      font-weight: 600;
      font-size: 20px;
      color: black;
      line-height: 36px;
    }

    .desc {
      font-size: 16px;
      color: black;
      line-height: 36px;
      max-width: 500px;
    }
  }
}
</style>