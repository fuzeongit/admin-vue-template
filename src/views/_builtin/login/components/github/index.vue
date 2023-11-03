<template>
  <div class="h-64 flex-center">
    <n-spin size="large" />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store';

const route = useRoute();
const { githubLogin } = useAuthStore();
const login = () => {
  githubLogin({ code: route.query.code as string, state: route.query.state as string });
};
login();
</script>
