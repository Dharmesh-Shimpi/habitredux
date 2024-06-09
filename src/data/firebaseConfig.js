import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA7VlcyhDl4ltemwwMo_H5ATuAsAmtg18M',
	authDomain: 'react-try-f11e5.firebaseapp.com',
	projectId: 'react-try-f11e5',
	storageBucket: 'react-try-f11e5.appspot.com',
	messagingSenderId: '910721537620',
	appId: '1:910721537620:web:b7c520989d54a15cf3bfc1',
	measurementId: 'G-2WFLYMZKQ6',
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
