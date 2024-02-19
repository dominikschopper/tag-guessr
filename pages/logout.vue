<script lang="ts" setup>
const { gamerTag } = useAuth();
gamerTag.value = '';
navigateTo('/');
</script>

<template>
  <div>
    Page: logout
  </div>
</template>

<style scoped></style>
