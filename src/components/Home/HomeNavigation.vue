<template>
  <div id="navigationSwiper">
    <swiper class="nv-swiper" :slides-per-view="5" :space-between="24" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide v-for="i in 5" class="nv-swiper-item">
        <div class="nv-swiper-item-content">
          <div class="item-img">
            <img src="@/assets/AndaSeat-novis-black-gaming-chair-swiper.webp" alt="swiper item" />
          </div>
          <div class="item-ctn">
            <h2 class="item-title">AndaSeat Gaming Chair</h2>
            <div class="item-desc">adaptive lumbar and 4D armrests</div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
// add: define handlers to avoid Vue warn
const onSwiper = (swiper) => {
};

const onSlideChange = (swiper) => {
};

onMounted(() => {
  navSwiper();
})

const navSwiper = () => {
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".nv-swiper",
      scrub: 1,
      toggleClass: 'active',
      start: "top top+=40%",
      once: true,
    },
  });
}
</script>

<style scoped lang='scss'>
#navigationSwiper {
  height: 80vh;
  max-height: 80vh;
  background-color: #f0f0f000;
  display: flex;
  align-items: center;
}

.nv-swiper {
  height: 540px;
  display: flex;
  align-items: center;
  padding: 80px;

  :deep(.swiper-wrapper) {
    height: 100%;
    display: flex;
    align-items: center;
  }
}

.nv-swiper .nv-swiper-item {
  transform: translateX(100vw);
  transition: transform 0.2s ease-in-out;
  will-change: transform;
  position: relative;
  cursor: pointer;
  border-radius: 30px;
  overflow: hidden;
  flex: 0 0 300px;
  transition: flex-basis 0.3s, height 0.3s;
  height: 380px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .item-img {
    height: 380px;
    transition: height 0.3s;
  }

  .item-ctn {
    background-color: rgba(255, 255, 255, 1);
    padding: 20px 40px;
    line-height: 20px;
    height: 58px;
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: height 0.3s ease-in-out;
    box-sizing: border-box;

    .item-title {
      font-size: 18px;
      font-weight: 600;
    }

    .item-desc {
      font-size: 14px;
      margin-top: 16px;
    }
  }

  &:hover {
    flex-basis: 400px;
    height: 480px;

    .item-img {
      height: 480px;
    }

    .item-ctn {
      height: 120px;
      background-color: #ff4d00;
    }

    .item-title,
    .item-desc {
      color: #fff;
    }
  }
}

.nv-swiper.active .nv-swiper-item {
  animation: nvAnimate 1s ease-in-out forwards;
}

.nv-swiper.active .nv-swiper-item:nth-child(1) {
  animation-delay: 0s;
}

.nv-swiper.active .nv-swiper-item:nth-child(2) {
  animation-delay: 0.1s;
}

.nv-swiper.active .nv-swiper-item:nth-child(3) {
  animation-delay: 0.2s;
}

.nv-swiper.active .nv-swiper-item:nth-child(4) {
  animation-delay: 0.3s;
}

.nv-swiper.active .nv-swiper-item:nth-child(5) {
  animation-delay: 0.4s;
}

.nv-swiper.active .nv-swiper-item:nth-child(6) {
  animation-delay: 0.5s;
}

.nv-swiper.active .nv-swiper-item:nth-child(7) {
  animation-delay: 0.6s;
}

.nv-swiper.active .nv-swiper-item:nth-child(8) {
  animation-delay: 0.7s;
}

@keyframes nvAnimate {
  0% {
    transform: translateX(100vw);
  }

  100% {
    transform: translateX(0);
  }
}
</style>