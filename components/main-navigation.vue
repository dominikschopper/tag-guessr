<script lang="ts" setup>

const { isAuthenticated } = useAuth();

watch(isAuthenticated, (auth) => {
    console.log('>>>isAuthenticated:%o', auth);
});

</script>

<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink> /
    <NuxtLink to="/game">Game</NuxtLink> /
    <NuxtLink v-if="isAuthenticated" to="/logout">Logout</NuxtLink>
  </nav>
</template>

<style scoped></style>
