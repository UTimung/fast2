import { initializeApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
    apiKey: "AIzaSyCBcHoZdgNmQWv-tmBCcgQWjQE2QaxZqdc",

    authDomain: "fast2-b5062.firebaseapp.com",
  
    databaseURL: "https://fast2-b5062-default-rtdb.firebaseio.com",
  
    projectId: "fast2-b5062",
  
    storageBucket: "fast2-b5062.appspot.com",
  
    messagingSenderId: "994065510605",
  
    appId: "1:994065510605:web:c02375824a442ddbc77984",
  
    measurementId: 'G-2QNRKR9K5R',
}
const firebaseApp = initializeApp(firebaseConfig)
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {

        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey:
            'BEO3B82hYMb_HGdQ7QpfVDr1X_2i4TAi6OjMNdfCMyz-tfiy9faUbtJ7E6d8u-o0dBohHnMxTgrET4cQWkev0s4',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {

                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {

            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {

                resolve(payload)
            })
        })()
    )
