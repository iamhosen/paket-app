export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'پاکت',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-startup-image', href: '/icon.png' }
    ],
  },

  env: {
    supabaseUrl: "https://jicljgbbrmjdyhynrlre.supabase.co",
    supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppY2xqZ2Jicm1qZHloeW5ybHJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAyNDQ5MzMsImV4cCI6MTk5NTgyMDkzM30.WrLb7SbC8MTYEsUayIikz125HiGiQxxA6hdH1Z5mO0E",
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/interact.js',
    '~/plugins/supabase.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/supabase',
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: `${process.env.SUPABASE_URL}`,
    headers: {
      common: {
        "Content-Type": "application/json",
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  router: {
    middleware: 'guest'
  },

  toast: {
    // position: 'top-center',
    // register: [ // Register custom toasts
    //   {
    //     name: 'my-error',
    //     message: 'Oops...Something went wrong',
    //     options: {
    //       type: 'error'
    //     }
    //   }
    // ]
  },

  pwa: {
    meta: {
      theme_color: '#171717',
      mobileAppIOS: true,
      mobileApp: true,
      appleStatusBarStyle: 'black'
    },
    manifest: {
      name: 'پاکِت | مدیریت مالی شخصی',
      short_name: 'Paket',
      description: 'مدیریت مالی شخصی',
      background_color: '#171717',
      orientation: 'portrait',
      shortcuts: [
        {
          name: 'ثبت تراکنش جدید',
          short_name: 'تراکنش جدید',
          description: 'ثبت تراکنش جدید',
          url: '/transaction/new',
          icons: [{ src: '/icon.png', sizes: '192x192' }]
        }
      ]
    },
  }
}
