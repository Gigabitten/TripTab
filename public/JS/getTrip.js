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

function getUserTrips(emailstr){
  
  const col = db.collection("users");
  const query = col.where('Email', '==', emailstr); //add current user email to grab it
  query.get().then(snapshot=> {
    snapshot.docs.forEach(doc =>{
      for (var trip of Object.entries(doc.data().trips)){
      var table = document.getElementById("tripDropdownTable");
      var row = table.insertRow();
      //var cell1 = row.insertCell(0);
      row.innerHTML = '<a onclick=getTrip("' +trip[1] + '") href="#">' + trip[1] + "</a>";
      console.log(doc.data());
      }
    })
})
}
function getTrip(tripin){
  sessionStorage.setItem("currentTrip", tripin)
  
  var jsondata
  const col = db.collection("trips");
  const query = col.where('TripName', '==', tripin); //add TripName instead of example to pull it
  var table = document.getElementById("membersTable");
  table.innerHTML = table.rows[0].innerHTML;
  query.get().then(snapshot=> {
      snapshot.docs.forEach(doc =>{
        //console.log(doc.id, doc.data())
       for (var member of Object.entries(doc.data().Members)){
        var row = table.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.innerHTML = member[0];
        cell2.innerHTML = member[1];
       }

         

   
        var expenseTable = document.getElementById("expenseTable")
        expenseTable.innerHTML = expenseTable.rows[0].innerHTML
        for(var expense of Object.entries(doc.data().Expenses)){
          var row = expenseTable.insertRow();
          var expensename = row.insertCell(0);
          var price = row.insertCell(1)
          var whopaid = row.insertCell(2)
          var whoowes = row.insertCell(3)
          console.log(expense)
          expensename.innerHTML = expense[1].Name;
          price.innerHTML = expense[1].Price;
          whopaid.innerHTML = expense[1].WhoPaid
          whoowes.innerHTML = expense[1].WhoOwes
        }
        
      })
  })



}
var email = sessionStorage.getItem("userEmail")
getUserTrips(email);
var currentTrip = sessionStorage.getItem("currentTrip")
if (currentTrip !=null){
  getTrip(currentTrip)
}

function signOut(){      
  auth.signOut();
  alert("Signed Out");
  window.location.href = "index.html";
}