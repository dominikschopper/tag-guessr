// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/i18n'],
    i18n: {
        strategy: "no_prefix",
        defaultLocale: "en",
        locales: [
            {
                code: 'en',
                name: 'English'
            },
            {
                code: 'de',
                name: 'Deutsch'
            }
        ]
    }
})
