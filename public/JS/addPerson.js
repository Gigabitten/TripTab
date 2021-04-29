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
  var userOBJ;

  function getUser(emailstr, tripName){
  
    const col = db.collection("users");
    const query = col.where('Email', '==', emailstr); //add current user email to grab it
    query.get().then(snapshot=> {
      if(snapshot.docs.length != 1){
        alert("User not Found")
      }
      snapshot.docs.forEach(doc =>{
        console.log(doc.data().First)
        userOBJ = doc.data()
        addPersonCallback(emailstr, tripName)
      })
  })
  }
function addPersonCallback(emailstr, tripName){

  tripRef.doc(tripName).set({
    Members: {
      [userOBJ.DisplayName] : 0 
    }
  }, {merge: true})
  .then((emailRef) => {
    console.log("Document written with ID: ", emailRef);
    
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
userRef.doc(emailRef).set({
  trips: firebase.firestore.FieldValue.arrayUnion(tripName)
  
}, {merge: true})
.then((emailRef) => {
  console.log("Document written with ID: ", emailRef);
  window.location.href = "main.html";
})


alert("Added " + userOBJ.DisplayName +  " to " + tripName);
}
function addPerson(){
  var tripName = sessionStorage.getItem("currentTrip")
  userfb = firebase.auth().currentUser;
  emailRef = addPersonEmail.value
  getUser(emailRef, tripName)
  
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