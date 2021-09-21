import Firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebase-config'

const firebaseApp = Firebase.initializeApp(firebaseConfig)
export default firebaseApp
