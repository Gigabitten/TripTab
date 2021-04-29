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
  function getTrip(tripin){
    sessionStorage.setItem("currentTrip", tripin)
    const col = db.collection("trips");
    const query = col.where('TripName', '==', tripin); 
  
    query.get().then(snapshot=> {
        snapshot.docs.forEach(doc =>{
          //console.log(doc.id, doc.data())
          userDisplayName = sessionStorage.getItem("userDisplayName");
          console.log(userDisplayName);
         for (var member of Object.entries(doc.data().Members)){
           if(member[0] != userDisplayName){
          var opt = document.createElement("option");
          opt.text = member[0];
          opt.value = member[0];
          whoOwesbox.add(opt);
           }
         
         }
          
        })
    })
  
  
  
  }
  var userOBJ;
  function getUser(emailstr){
  
    const col = db.collection("users");
    const query = col.where('Email', '==', emailstr); //add current user email to grab it
    query.get().then(snapshot=> {
      snapshot.docs.forEach(doc =>{
        userOBJ = doc.data()
        addExpenseCallback()
      })
  })
  }
  var tripName = sessionStorage.getItem("currentTrip")

function addExpense(){
  userfb = firebase.auth().currentUser;
  emailRef = userfb.email;
  getUser(emailRef)
}
function addExpenseCallback(){

  exName = expenseName.value
  price = expensePrice.value
  whoPaid = userOBJ.DisplayName
  
  whoOwes = whoOwesbox.options[whoOwesbox.selectedIndex].value
  console.log(whoOwesbox.options)
  var whoOwesArr = []
  var select = document.getElementById("whoOwesbox");
  for (var i = 0; i< select.length; i++){
    if (select[i].selected){
    whoOwesArr.push(select[i].value);
    }
  }

  console.log(whoOwesArr)

  tripRef.doc(tripName).set({
    Expenses: {
      [exName]: {
          Name : exName,
          Price: price,
          WhoPaid: whoPaid,
          WhoOwes: whoOwesArr
      } 
    }
  }, {merge: true})
  .then((emailRef) => {
    console.log("Document written with ID: ", emailRef);
    alert("added expense to " + tripName);
    window.location.href = "main.html"
})
.catch((error) => {
    console.error("Error adding document: ", error);
});

}




//window.location.href ="main.html";
function signOut(){      
  auth.signOut();
  alert("Signed Out");
  window.location.href = "index.html";
}
var currentTrip = sessionStorage.getItem("currentTrip");
if (currentTrip != null){
  getTrip(currentTrip);
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