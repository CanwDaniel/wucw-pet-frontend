<template>
  <div id="homeBanner">
    <div class="imgBox">
      <picture>
        <source srcset="@/assets/AndaSeat-novis-series-best-burget-gaming-chair-m.webp" media="(max-width: 768px)"
          type="image/webp">
        </source>
        <img src="@/assets/AndaSeat-novis-series-best-budget-gaming-chair-pc.webp" alt="banner">
      </picture>
    </div>

    <div class="content">
      <h1 class="title">Novis Series</h1>
      <div class="subTitle">New Journey Big On Value</div>
      <div class="btn">Shop Now</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { gsap } from "gsap";

onMounted(() => {
  contentAnimate();
})

const contentAnimate = () => {
  let tl = gsap.timeline();

  tl.fromTo("#homeBanner .title",
    { yPercent: 100, duration: 0.5, opacity: 0 },
    { yPercent: 0, duration: 0.5, opacity: 1 })
    .fromTo("#homeBanner .subTitle",
      { yPercent: 100, duration: 0.5, opacity: 0 },
      { yPercent: 0, duration: 0.5, opacity: 1 }, "<0.5")
    .fromTo("#homeBanner .btn",
      { yPercent: 100, duration: 0.5, opacity: 0 },
      { yPercent: 0, duration: 0.5, opacity: 1 }, "<0.5")
}
</script>

<style scoped lang='scss'>
#homeBanner {
  height: 100vh;
  position: relative;

  .imgBox {
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    position: absolute;
    left: 50%;
    bottom: 50px;
    transform: translateX(-50%);

    .title {
      font-weight: 600;
      font-size: 24px;
      color: #fff;
      line-height: 1;
      text-align: center;
      opacity: 0;
      will-change: transform, opacity;
    }

    .subTitle {
      font-weight: 700;
      font-size: 52px;
      margin-top: 14px;
      color: #fff;
      line-height: 1;
      text-align: center;
      opacity: 0;
      will-change: transform, opacity;
    }

    .btn {
      font-weight: 600;
      font-size: 14px;
      color: #fff;
      display: block;
      padding: 18px 0;
      background: #ff4d00;
      width: 300px;
      text-align: center;
      margin: 32px auto 24px;
      cursor: pointer;
      opacity: 0;
      will-change: transform, opacity;

      &:hover {
        background-color: #ff4000;
      }
    }
  }
}
</style>