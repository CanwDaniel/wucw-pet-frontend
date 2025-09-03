<template>
	<template v-if="$route.name === 'login' || $route.name === 'not-found'">
		<router-view></router-view>
	</template>
	<template v-else>
		<Nav></Nav>
		<router-view></router-view>
	</template>
</template>

<script setup lang="ts">
import Nav from './components/Nav.vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped></style>
