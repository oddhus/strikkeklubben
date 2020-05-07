const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "production"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  apiKey: `${process.env.GATSBY_API_KEY}`,
  authDomain: `${process.env.GATSBY_AUTH_DOMAIN}`,
  databaseURL: `${process.env.GATSBY_DATABASE_URL}`,
  projectId: `${process.env.GATSBY_PROJECT_ID}`,
  storageBucket: `${process.env.GATSBY_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.GATSBY_MESSAGING_SENDER_ID}`,
  appId: `${process.env.GATSBY_APP_ID}`,
  measurementId: `${process.env.GATSBY_MEASUREMENT_ID}`
}
