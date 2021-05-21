import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDzPRN3sSQIZyMKYmatZczrV5hQLydihsU",
  authDomain: "fir-sample-37e6b.firebaseapp.com",
  projectId: "fir-sample-37e6b",
  storageBucket: "fir-sample-37e6b.appspot.com",
  messagingSenderId: "436441747989",
  appId: "1:436441747989:web:c116e095fa52f7d9c6741c"
};
firebase.initializeApp(firebaseConfig);
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