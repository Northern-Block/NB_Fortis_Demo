import * as firebase from "firebase/app";
import "firebase/messaging";
let messaging;
// console.log("firebase ", firebase)
// console.log("firebase.messaging ", firebase.messaging)
// console.log("firebase.messaging.isSupported ", firebase.messaging.isSupported())
// debugger;
if (firebase.messaging.isSupported()) {
  const initializedFirebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDEXRFFp2IWsP6aAOc17koudvaCnrXlqdM",
    authDomain: "northern-block-demo-app.firebaseapp.com",
    databaseURL: "https://northern-block-demo-app.firebaseio.com",
    projectId: "northern-block-demo-app",
    storageBucket: "northern-block-demo-app.appspot.com",
    messagingSenderId: "514310069751",
    appId: "1:514310069751:web:7ab29591dfc85f1976e2f2",
    measurementId: "G-7S3XJS3D8H"
  });

  messaging = initializedFirebaseApp.messaging();
  messaging.usePublicVapidKey(
    'BE3RMlxMqJo0VX_6zGTcBR_ta3Vgein27lvi6TWwitZVfLmB71b0fbCta5RhTD_ogcZoHm_5FIme5h-qr86uPfM'
  )

} else {
  console.log("in firebase messaging else ", messaging);
}
let datas = messaging;
export { datas as messaging };
