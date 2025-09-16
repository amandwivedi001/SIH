import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  return {

    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: 'autoUpdate',

        devOptions: {
          enabled: true
        },

        manifest: {
          name: 'RouteX',
          short_name: 'RouteX',
          description: 'Real-time public transport for low bandwidth areas',
          theme_color: '#251491',
          icons: [
            {
              src: '',
              sizes: '',
              type: ''
              // apne hisaab se jo iconss dekhne ho unko kr lena yaha par
              /*  src : '',
                  sizes: ' ',
                  type: ' ' 
               */
              // aaur jo icons honge unko frontned ki public mein daaal dena 
            },
          ]
        }
      })
    ],
  }
})
