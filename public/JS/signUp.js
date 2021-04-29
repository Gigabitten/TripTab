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

function signUp(){

  var temp = email1.value;
  emailRef = temp.toLowerCase()
  localStorage.setItem('userEmail', emailRef);
  
const promise = auth.createUserWithEmailAndPassword(email1.value, password1.value)
.then((userCredential) => {
  userRef.doc(emailRef).set({
    First: firstName.value,
    Last: lastName.value,
    DisplayName: displayName.value,
    Email: emailRef

    
  })
  .then((emailRef) => {



    console.log("Document written with ID: ", emailRef);
    window.location.href ="account.html";
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

}).catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  alert(errorMessage)
})
promise.catch(e => alert(e.message));
console.log(promise)
alert("Signed Up");
}

auth.onAuthStateChanged(function(user){
  if(user){
      document.getElementById("mainTab").style.display = "show";
      document.getElementById("signOut").style.display = "show";
      document.getElementById("email").style.display = "none";
      document.getElementById("password").style.display = "none";
      document.getElementById("signUp").style.display = "none";
      document.getElementById("signIn").style.display = "none";
      document.getElementById("account").style.display = "show";
      document.getElementById("homeTab").style.display = "none";
      
      
  } else{
      document.getElementById("mainTab").style.display = "none";
      document.getElementById("signOut").style.display = "none";
      document.getElementById("email").style.display = "show";
      document.getElementById("password").style.display = "show";
      document.getElementById("signUp").style.display = "show";
      document.getElementById("signIn").style.display = "show";
      document.getElementById("account").style.display = "none";
      document.getElementById("homeTab").style.display = "show";
      document.getElementById("signUp").style.display = "none";
  
    
      //no user is signed in
  }
});


function signIn(){
  localStorage.setItem("userEmail", email.value.toLowerCase())
   const promise = auth.signInWithEmailAndPassword(email.value, password.value)
   .then((userCredential) => {
     window.location.href = "account.html";
   })
   promise.catch(e => alert(e.message));
   console.log(promise);
}