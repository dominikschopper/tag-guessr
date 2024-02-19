import type { CookieRef } from '#app';

export interface AuthComposable {
    gamerTag: CookieRef<string | undefined | null>;
    isAuthenticated(): Ref<boolean>;
}

export const useAuth = (): AuthComposable => {
    const GAMERTAG_COOKIE_KEY = 'gamer-tag';
    const gamerTag = useCookie(GAMERTAG_COOKIE_KEY);
    const authenticated = ref(false);
    watch(gamerTag, (newTag) => {
        if (typeof newTag === 'string' && newTag.length > 0) {
            authenticated.value = true;
        } else {
            authenticated.value = false;
        }
    });

    return {
        gamerTag,
        isAuthenticated: () => authenticated
    };
}
