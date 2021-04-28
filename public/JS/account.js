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
  var fname, lname, dname, newemail;
  
    const col = db.collection("users");
    const query = col.where('Email', '==', tempEmail); //add current user email to grab it
    query.get().then(snapshot=> {
      snapshot.docs.forEach(doc =>{
        fname =doc.data().First.charAt(0).toUpperCase() + doc.data().First.slice(1);
        lname = doc.data().Last.charAt(0).toUpperCase() + doc.data().Last.slice(1);
        dname = doc.data().DisplayName;
  
        firstName.innerHTML = fname;
        lastName.innerHTML = lname;
        dispName.innerHTML = dname;
        console.log(doc.data());
        localStorage.setItem('userName', dname);
      })
  })
  
  function signOut(){      
    auth.signOut();
    alert("Signed Out");
    window.location.href = "index.html";
  }
  
  function updateDisp() {
    var newdis = displayName.value;
  
    if(newdis === '') {
      alert("Error, Must Enter Display Name")
    } 
    else {
      var upDoc = db.collection("users").doc(tempEmail);
  
      return upDoc.update({
        DisplayName: newdis
      })
      .then(() => {
        alert("Display Name Updated");
        displayName.value = '';
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
    }
  }
  
  function updateEmail() {
    var user = firebase.auth().currentUser;
    var credential;
  
    newemail = emailNew.value.toLowerCase();
    if(newemail === '') {
      alert("Error, Must Enter New Email")
    } else {
      userProvidedPassword = window.prompt("Enter Current Password: ");
      credential = firebase.auth.EmailAuthProvider.credential(user.email, userProvidedPassword);
      user.reauthenticateWithCredential(credential).then(function() {
        console.log("Success reauthorizing");
        addNewDoc();
        delOldDoc();
        localStorage.setItem('userEmail', newemail);
        tempEmail = newemail; 
        user.updateEmail(newemail).then(function() {
          alert("Email Updated");
        }).catch(function(error) {
          console.error("Error updating Email: ", error);
        });
    }).catch(function(error) {
        console.error("Error: ", error);
        alert(error.message);
      }); 
    }
    emailNew.value = '';
  }
  
  function updatePass() {
    var user = firebase.auth().currentUser;
    var credential;
    var newpass = passNew.value;
  
    if(newpass === '') {
      alert("Error, Must Enter New Password")
    } else {
      userProvidedPassword = window.prompt("Enter Current Password: ");
      credential = firebase.auth.EmailAuthProvider.credential(user.email, userProvidedPassword);
      user.reauthenticateWithCredential(credential).then(function() {
        console.log("Success reauthorizing");
        user.updatePassword(newpass).then(function() {
          alert("Password Updated");
        }).catch(function(error) {
          console.error("Error updating Password: ", error);
        });
      }).catch(function(error) {
        console.error("Error: ", error);
        alert(error.message);
      });
    }
    passNew.value = '';
  }
  
  function addNewDoc(){
    db.collection("users").doc(newemail).set({
      First: fname,
      Last: lname,
      DisplayName: dname,
      Email: newemail
    }).then(() => {
      console.log("Document successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
  
  function delOldDoc() {
    db.collection("users").doc(tempEmail).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  auth.onAuthStateChanged(function(user){
    if(user){
    } else{
      window.location.href = "index.html";
    }
  });

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
