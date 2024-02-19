import type { CookieRef } from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
    const { gamerTag } = useAuth();

    if (!gamerTag.value && to.path !== '/login') {
        return navigateTo('/login');
    }
});
