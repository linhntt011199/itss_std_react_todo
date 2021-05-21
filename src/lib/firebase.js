import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDzPRN3sSQIZyMKYmatZczrV5hQLydihsU",
  authDomain: "fir-sample-37e6b.firebaseapp.com",
  projectId: "fir-sample-37e6b",
  storageBucket: "fir-sample-37e6b.appspot.com",
  messagingSenderId: "436441747989",
  appId: "1:436441747989:web:c116e095fa52f7d9c6741c"
};
// firebase.initializeApp(firebaseConfig);
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

export default firebase;
// reference to totos collection
const collection = firebase.firestore().collection("todos");

// get items
export const getFbItems = async () => {
    const data = await collection.get();
    const items = data.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
}

//add item
export const addFbItem = async (item) => {
    await collection.add(item);
}

//update item
export const updateFbItem = async (item, id) => {
    await collection.doc(id).update(item);
}

//delete item
export const deleteFbItem = async (item) => {
  const todoRef = collection.doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
}; 
export const checkInfo = async (currentUser) => {
  const uid = currentUser.uid;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  console.log("doc",userDoc);
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set({ name: currentUser.displayName });
    return {
      name: currentUser.displayName,
      id: uid,
    };
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    };
  }
} 

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};
export const updateUser = async (userId, image) => {
    const currentUser = await firebase.firestore().collection("users").doc(userId).get();
    if (currentUser.exists) {
      await firebase.firestore().collection("users").doc(userId).update({ ...currentUser.data(), image: image });
    }

}

export const uploadImage = async (image) => {
  const ref = firebase.storage().ref().child(`/images/${image.name}`);
  let downloadUrl = "";
  await ref.put(image);
  downloadUrl = await ref.getDownloadURL();
  return downloadUrl;
};  