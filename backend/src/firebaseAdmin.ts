import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.resolve(__dirname, "../serviceAccountKey.json");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
