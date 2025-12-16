// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    S3_BUCKET: '',
    S3_CDN: '',
    S3_REGION: '',
    S3_ACCESS_KEY_ID: '',
    S3_ENDPOINT: '',
    S3_SECRET_ACCESS_KEY: '',
    S3_MEDIA_FOLDER: '',
    JWT_SECRET: ''
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  modules: ['nuxt-mongoose', '@nuxtjs/tailwindcss'],
  mongoose: {
    uri: 'mongodb://mongodb:27017/userData',
    options: {},
    modelsDir: 'models',

  }
})