const activeEnv = process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "production"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports={
  "type": process.env.FIREBASE_ADMIN_TYPE,
  "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_ADMIN_AUTH_URI,
  "token_uri": process.env.FIREBASE_ADMIN_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
}

