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
    
    
  function signUp(){
      
      var email = document.getElementById("email");
      var password = document.getElementById("password");
      
      const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
      promise.catch(e => alert(e.message));
      alert("Signed Up");
  }
  
  
  
  function signIn(){
      var email = document.getElementById("email");
      var password = document.getElementById("password");
      
      const promise = auth.signInWithEmailAndPassword(email.value, password.value);
      promise.catch(e => alert(e.message));
  }
  
  
  function signOut(){      
      auth.signOut();
      alert("Signed Out");
  }
  
  
  
  auth.onAuthStateChanged(function(user){
      if(user){
          var email = user.email;
          alert("Active User " + email);
          
          if(loggedIn == 0) {
            //window.location.href = "main.html";
            loggedIn++;
            console.log(loggedIn);
          }
      } else{
          
          
          //no user is signed in
      }
  });
