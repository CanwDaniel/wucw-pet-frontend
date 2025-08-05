<template>
  <div id="nav">
    <div v-for="(tab, index) in tabs">
      <p :class="{ active: index === currentTab }" @click="changeTab(index)">{{ tab.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const tabs = ref([{ name: 'Home', router: '/' }, { name: 'About', router: '/about' }, { name: 'Settings', router: '/settings' }]);

const currentTab = ref(0);

const changeTab = (index: number) => {
  currentTab.value = index;
  router.push(tabs.value[index].router);
}

</script>

<style lang="scss" scoped>
#nav {
  padding: 10px 20px;
  max-width: 20%;
  position: absolute;
  left: 50%;
  top: 2%;
  transform: translateX(-50%);
  background-color: rgba($color: #000000, $alpha: 0.8);
  border-radius: 26px;
  display: flex;
  gap: 22px;
  justify-content: space-between;

  p {
    cursor: pointer;
    color: white;
    font-size: 16px;
    font-weight: 700;
    padding: 6px;
    line-height: 1;
    border-radius: 14px;
  }

  p:nth-last-child(1) {
    margin-right: 0;
  }

  .active {
    color: rgba($color: #000000, $alpha: 0.8);
    background-color: white;
  }
}
</style>