const { defineConfig } = require('cypress')
const { Pool } = require('pg')
const { dbConfig } = require('./db-config.js')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const pool = new Pool(dbConfig)

      on('task', {
        removeUser(email) {
          return new Promise((resolve) => {
            pool.query(`DELETE FROM public.users WHERE email = '${email}'`, (error, result) => {
              if (error)
                throw error
              resolve({ successs: result })
            })
          })
        }
      })
    },
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1440,
    viewportHeight: 900,
    testIsolation: true
  },
});
