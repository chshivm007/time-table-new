// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    "nuxt-headlessui",
    'nuxt-headlessui',
    // '@nuxt/ui',
  ],
  devServer: {
    port: 8080,
  },
  headlessui: {
    prefix: ''
  },
  runtimeConfig: {
    MONGO_URI: process.env.MONGO_URI,
  },
  tailwindcss: {
    cssPath: '~/assets/css/input.css'
  }
})