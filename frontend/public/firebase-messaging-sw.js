importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js')
firebase.initializeApp({
    messagingSenderId: "1:329529152877:web:fa776a1c6b7dfb20acf664",
    projectId: "techchallenge5",
    apiKey:"AIzaSyBVaP-6xv0EPQdUSwg9_-vayZ59K7VHUEc",
    appId:"1:329529152877:web:fa776a1c6b7dfb20acf664"
});
const messaging = firebase.messaging();