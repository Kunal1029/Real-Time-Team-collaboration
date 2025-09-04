//.mjs
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// const serviceAccount = require("./serviceAccountKey.json"); 
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}


// console.log("ks",process.env.FIREBASE) //undefined

export const adminAuth = admin.auth(); // Optional
export default admin;
