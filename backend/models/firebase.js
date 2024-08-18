const admin = require('firebase-admin')
const dotenv = require('dotenv')

dotenv.config()

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

if (!process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error(
    'FIREBASE_PRIVATE_KEY and FIREBASE_CLIENT_EMAIL must be defined in the .env file'
  )
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseConfig.projectId,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  })
})

const db = admin.firestore()
module.exports = db
