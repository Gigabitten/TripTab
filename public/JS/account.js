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

  function signOut(){      
    auth.signOut();
    alert("Signed Out");
    sessionStorage.clear();
    window.location.href = "index.html";
}
  
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

  auth.onAuthStateChanged(function(user){
    if(user){
        var email = user.email;
        //alert("Active User " + email);
        sessionStorage.setItem("userEmail", email)
        document.getElementById("mainTab").style.display = "show";
        document.getElementById("signOut").style.display = "show";
        document.getElementById("email").style.display = "none";
        document.getElementById("password").style.display = "none";
        document.getElementById("signUp").style.display = "none";
        document.getElementById("signIn").style.display = "none";
        document.getElementById("account").style.display = "show";
        
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

      
        //no user is signed in
    }
});
