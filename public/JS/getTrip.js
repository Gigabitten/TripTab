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
      var tripnamers = trip[1]
      console.log(trip[1])
      var linkstring = "<a onclick=getTrip(\'" + encodeURIComponent(trip[1]) + "\') href='#'>" + trip[1] + "</a>";
      console.log(linkstring)
      row.innerHTML = linkstring
      }
    })
})
}
function getTrip(tripin){
  tripin = decodeURIComponent(tripin)
  console.log(tripin);
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
          
          expensename.innerHTML = expense[1].Name;
          expensename.innerHTML += '<span class="dontcaretext">Delete This Expense</span>'
          expensename.classList.add("dontcare")
          expensename.id = expense[1].Name;
          expensename.onclick = function(){
            if(confirm('are you sure you want to delete this expense?')){
              col.doc(tripin).set({
                  Expenses: {
                    [this.id]: firebase.firestore.FieldValue.delete()
                        
                  }
                }, {merge: true})
                .then(
                  getTrip(tripin)
                )
            }
            else{

            }
          }
          price.innerHTML = expense[1].Price;
          whopaid.innerHTML = expense[1].WhoPaid
          whoowes.innerHTML = expense[1].WhoOwes
          var totalexpenseusers = parseInt(expense[1].WhoOwes.length)
          var peruserprice = parseFloat(expense[1].Price / (totalexpenseusers + 1))
          console.log("perUserPrice: " + peruserprice);
          console.log(expense[1].WhoOwes.length)
          for(var whoower = 0; whoower< expense[1].WhoOwes.length; whoower++){
            //console.log(expense[1].WhoOwes[whoower])
            
            calculateTab(expense[1].WhoOwes[whoower], peruserprice);
          }
        
            calculateTab(expense[1].WhoPaid,(totalexpenseusers * peruserprice) * -1);

        }
        
      })
  })
}
function calculateTab(person, expenseplus){
  var membersTable = document.getElementById("membersTable")
  for (var i = 1; i < membersTable.rows.length; i++){
    var row = membersTable.rows[i].cells[0]
    if(row.innerHTML == person){
      console.log(parseFloat(membersTable.rows[i].cells[1].innerHTML))
      
      var num = parseFloat(membersTable.rows[i].cells[1].innerHTML) + parseFloat(expenseplus)
      membersTable.rows[i].cells[1].innerHTML = num.toFixed(2)

    }
    
  }
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
  sessionStorage.clear();
  window.location.href = "index.html";
}
function setUserDisplaySessionVar(emailstr){
  
  const col = db.collection("users");
  const query = col.where('Email', '==', emailstr); //add current user email to grab it
  query.get().then(snapshot=> {
    snapshot.docs.forEach(doc =>{
      sessionStorage.setItem("userDisplayName", doc.data().DisplayName);
      
    })
})
}
auth.onAuthStateChanged(function(user){
  if(user){
      var email = user.email;
      document.getElementById("mainTab").style.display = "show";
      document.getElementById("signOut").style.display = "show";
      document.getElementById("email").style.display = "none";
      document.getElementById("password").style.display = "none";
      document.getElementById("signUp").style.display = "none";
      document.getElementById("signIn").style.display = "none";
      setUserDisplaySessionVar(email);
  } else{
      window.location.href = "index.html";
  }
});
