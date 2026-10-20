import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

const config = environment.firebase;
export const firebaseConfigured = Boolean(config.apiKey && config.projectId &&
  !config.apiKey.startsWith('COLE_') && !config.projectId.startsWith('SEU_'));

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
if (firebaseConfigured) {
  app = getApps().length ? getApps()[0] : initializeApp(config);
  auth = getAuth(app);
  db = getFirestore(app);
}
export { app, auth, db };
