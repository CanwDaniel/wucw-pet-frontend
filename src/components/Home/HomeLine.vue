<template>
  <div class="top"></div>
  <div id="homeLine">
    <div class="section-line">
      <div class="line-left">
        NEW KAISER 4 SERIES
        <img
          src="https://www.andaseat.com/cdn/shop/files/new-kaiser-4-gaming-chair-compare-chairs_3cad4127-2743-483c-8a3a-01b511569822.webp"
          alt="left img">
      </div>

      <div class="line-right">
        <img src="https://www.andaseat.com/cdn/shop/files/kaiser-4-gaming-chair-compare-chairs.webp" alt="right img">
        KAISER 4 SERIES
      </div>

      <div class="line-left">
        KAISER 3 SERIES
        <img src="https://www.andaseat.com/cdn/shop/files/kaiser-3-gaming-chair-compare-chairs.webp" alt="left img">
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

  ScrollTrigger.create({
    trigger: ".section-line",
    start: "top top",
    end: "+=1000",
    pin: true,
  });

  ScrollTrigger.create({
    trigger: ".section-line",
    start: "top center",
    end: "+=1000",
    scrub: true,
    animation: gsap
      .timeline()
      .fromTo(".line-left", { marginLeft: "-200%" }, { marginLeft: 0 })
  });

  ScrollTrigger.create({
    trigger: ".top",
    start: "top center",
    end: "+=1000",
    scrub: true,
    animation: gsap
      .timeline()
      .fromTo(".line-right", { marginLeft: "200%" }, { marginLeft: 0 })
  });
})
</script>

<style scoped lang='scss'>
#homeLine {
  .section-line {
    height: 980px;
    max-height: 980px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .line-left,
  .line-right {
    background: linear-gradient(92deg, #B94863 -11.87%, #EE4C75 45.79%, #B94863 105.29%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 120px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1920px;

    img {
      height: 250px;
    }
  }
}
</style>