import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDP9WaWXRZfD5Gk3fhMEtMXAUG0Wqic8wQ",
	authDomain: "sharplearn-2fe87.firebaseapp.com",
	projectId: "sharplearn-2fe87",
	storageBucket: "sharplearn-2fe87.appspot.com",
	messagingSenderId: "315521365227",
	appId: "1:315521365227:web:79b706e3b01e6c16e97aae",
	measurementId: "G-Y13Y1YX38X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

getAnalytics(app);

export { storage, app };
