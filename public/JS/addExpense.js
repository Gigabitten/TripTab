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
  var emailRef
  
  var tripRef = db.collection("trips");

function addPerson(){

  specifictripRef="bigTrip";
 
  userfb = firebase.auth().currentUser;
  emailRef = userfb.email;

  tripRef.doc(specifictripRef).update({
     user1: addPersonEmail.value
    
  })
  .then((emailRef) => {
    console.log("Document written with ID: ", emailRef);

})
.catch((error) => {
    console.error("Error adding document: ", error);
});


alert("Added Person");
}