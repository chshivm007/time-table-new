// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    "nuxt-headlessui",
    'nuxt-headlessui',
  ],
  devServer: {
    port: 8080,
  },
  headlessui: {
    prefix: ''
  }
})