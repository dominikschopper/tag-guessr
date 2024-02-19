import { AppHeader, AppFooter, LangSwitch } from '../.nuxt/components';
<script lang="ts" setup></script>

<template>
<header>
    <div>
        <hgroup class="title">
            <h1>Tag Guessr</h1>
            <p>How many HTML tags do you know?</p>
        </hgroup>
        <LangSwitch />
    </div>
    <MainNavigation />
</header>
</template>

<style scoped></style>
