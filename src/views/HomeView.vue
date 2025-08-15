<template>
  <div id="home">
    <HomeBanner />
    <HomeNavigation />
    <HomeProductDesc />
    <HomeOther />
  </div>
</template>

<script setup lang="ts">
import HomeBanner from '@/components/Home/HomeBanner.vue';
import HomeNavigation from '@/components/Home/HomeNavigation.vue';
import HomeProductDesc from '@/components/Home/HomeProductDesc.vue';
import HomeOther from '@/components/Home/HomeOther.vue';
</script>

<style scoped lang="scss">
#home {
  height: 100%;
}

@media (max-width: 1040px) {
  #home {}
}
</style>