import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            primary: '#F6921E',
            secondary: '#F8A953',
            error: '#FF5252',
          }
        }
      }
    },
    defaults: {
      VBtn: {
        color: 'primary',
        variant: 'outlined',
        rounded: true,
      },
    }
  })
  app.vueApp.use(vuetify)
})
