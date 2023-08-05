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
        },
        findToken(email) {
          return new Promise((resolve) => {
            pool.query(`SELECT B.token FROM
                public.users A
                INNER JOIN public.user_tokens B
                ON A.id = B.user_id
                WHERE A.email = '${email}'
                ORDER BY B.created_at`, (error, result) => {
                  if(error)
                    throw error
                    resolve({token: result.rows[0].token})
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
