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



  var tripRef = db.collection("trips");
  var userOBJ;
  
function getUser(emailstr){
  
    const col = db.collection("users");
    const query = col.where('Email', '==', emailstr); //add current user email to grab it
    query.get().then(snapshot=> {
      snapshot.docs.forEach(doc =>{
        userOBJ = doc.data()
        createTripCallback()
      })
  })
  }
  
function createTripCallback(){

tripRef.doc(tripName.value).set({
  TripName: tripName.value,
  TripHost: emailRef,
  Members: { [userOBJ.DisplayName] : 0 },
  Expenses: {}
})
.then((emailRef) => {
  console.log("Document written with ID: ", emailRef);

})
.catch((error) => {
  console.error("Error adding document: ", error);
});
userfb = firebase.auth().currentUser;
emailRef = userfb.email;

userRef.doc(emailRef).update({
  trips: firebase.firestore.FieldValue.arrayUnion(tripName.value)

  
})
.then((emailRef) => {
  console.log("Document written with ID: ", emailRef);
  window.location.href = "main.html";
})


alert("added trip");
}
var emailRef

function createTrip(){
  var userfb = firebase.auth().currentUser;
  emailRef = userfb.email
  getUser(emailRef)
  
  
}
function signOut(){      
  auth.signOut();
  alert("Signed Out");
  window.location.href = "index.html";
}

auth.onAuthStateChanged(function(user){
  if(user){
      var email = user.email;
      getUser(email);
      //alert("Active User " + email);
      sessionStorage.setItem("userEmail", email)
      document.getElementById("mainTab").style.display = "show";
      document.getElementById("signOut").style.display = "show";
      document.getElementById("email").style.display = "none";
      document.getElementById("password").style.display = "none";
      document.getElementById("signUp").style.display = "none";
      document.getElementById("signIn").style.display = "none";
      document.getElementById("account").style.display = "show";
      document.getElementById("homeTab").style.display = "none";
      
      
  } else{
      if(window.location.href.indexOf("main.html") != -1) {
          window.location.href = "index.html";
      }
      document.getElementById("mainTab").style.display = "none";
      document.getElementById("signOut").style.display = "none";
      document.getElementById("email").style.display = "show";
      document.getElementById("password").style.display = "show";
      document.getElementById("signUp").style.display = "show";
      document.getElementById("signIn").style.display = "show";
      document.getElementById("account").style.display = "none";
      document.getElementById("homeTab").style.display = "show";
    
      //no user is signed in
  }
});