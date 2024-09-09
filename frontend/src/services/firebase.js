import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { getMessaging, getToken } from 'firebase/messaging'
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const messaging = getMessaging(app);

export const authenticateUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            return user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password') {
                throw new Error('The password is incorrect. Please try again.');
            } else if (errorCode === 'auth/user-not-found') {
                throw new Error('No account found with this email. Please sign up.');
            } else if (errorCode === 'auth/too-many-requests') {
                throw new Error('Too many login attempts. Please try again later.');
            } else {
                throw new Error(error.message); // Generic error handling
            }
        });
};

export const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
};

export const logOut = () => {
    return signOut(auth)
        .then(() => {
            console.log("User signed out.")
        }).catch((error) => {
            console.error('Sign out error:', error)
        });
}

export const checkLoginState = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uT = user.accessToken;
            console.log(uT);
            return uT;
            // ...
        } else {
            // User is signed out
            console.log('Not logged in')
            return null;
        }
    });
}

export async function requestPermission() {
    console.log('Requesting permission...')

    try {
        const permission = await Notification.requestPermission()

        if (permission === 'granted') {
            console.log('Notification permission granted.')
            // Initialize Firebase Cloud Messaging and get a reference to the service
            try {
                const currentToken = await getToken(messaging, {
                    vapidKey:
                        'BHxomewHNc7LRuGPD03Ki2F3znkE2SZ1tgxtZdwwpvnG8Ytq7iNWugXV0tKyM-yelgL4WFItekgkTmWqniX953I'
                })

                if (currentToken) {
                    console.log('Token received:', currentToken)
                    // Você pode adicionar lógica aqui para usar o token recebido
                } else {
                    console.log(
                        'No registration token available. Request permission to generate one.'
                    )
                }
            } catch (error) {
                console.error('Error retrieving token:', error)
            }
        } else {
            console.log('Notification permission denied.')
        }
    } catch (error) {
        console.error('Error requesting permission:', error)
    }
}


export { auth }

