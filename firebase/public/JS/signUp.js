var loggedIn = 0

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

  function signUp(){
 
  
    db.collection("users").add({
      First: firstName.value,
      Last: lastName.value,
      DisplayName: displayName.value,
      Email: email.value
  })
  .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
      promise.catch(e => alert(e.message));
      alert("Signed Up");
  })
  .catch((error) => {
      console.error("Error adding document: ", error);
  });
   
  }