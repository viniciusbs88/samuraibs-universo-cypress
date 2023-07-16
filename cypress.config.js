const { defineConfig } = require("cypress")
const { Pool } = require('pg')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const pool = new Pool({
        host: 'queenie.db.elephantsql.com',
        user: 'qilxuabq',
        password: 'HUCqlP1qJY65f1nXXT4u0opmeoTAtbF1',
        database: 'qilxuabq',
        port: 5432
      })

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
    testIsolation: false
  },
});
