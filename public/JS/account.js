// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNxHz8LHpVDNrlz5IrTjKsanId0_O7hxM",
    authDomain: "triptab-ab68f.firebaseapp.com",
    databaseURL: "https://triptab-ab68f-default-rtdb.firebaseio.com",
    projectId: "triptab-ab68f",
    storageBucket: "triptab-ab68f.appspot.com",
    messagingSenderId: "539750357342",
    appId: "1:539750357342:web:c649357814a5ff0dae97cf",
    measurementId: "G-2M5QW6CZCS"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  const auth = firebase.auth();

  var db = firebase.firestore();
  var userRef = db.collection("users");
  var tempEmail = localStorage.getItem("userEmail")
  console.log(tempEmail)


  
    const col = db.collection("users");
    const query = col.where('Email', '==', tempEmail); //add current user email to grab it
    query.get().then(snapshot=> {
      snapshot.docs.forEach(doc =>{
        firstName.innerHTML = doc.data().First.charAt(0).toUpperCase() + doc.data().First.slice(1);
        lastName.innerHTML = doc.data().Last.charAt(0).toUpperCase() + doc.data().Last.slice(1);
        dispName.innerHTML = doc.data().DisplayName.charAt(0).toUpperCase() + doc.data().DisplayName.slice(1);
        console.log(doc.data());
      })
  })
