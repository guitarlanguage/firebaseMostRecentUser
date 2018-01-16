// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHQRV5j02JxFak2xv_pBWWowsYb4WmdFw",
  authDomain: "mostrecentuser-f4e38.firebaseapp.com",
  databaseURL: "https://mostrecentuser-f4e38.firebaseio.com",
  projectId: "mostrecentuser-f4e38",
  storageBucket: "",
  messagingSenderId: "812504048941"
};
firebase.initializeApp(config);
//variable to reference the firebase database
var database = firebase.database();
//global variables to send to firebase database
var name = "";
var email = "";
var age = 0;
var comment = "";

// cache jquery objects
var $nameInput = $("#name-input");
var $emailInput = $("#email-input");
var $ageInput = $("#age-input");
var $commentInput = $("#comment-input");
var $addUserInput = $("#add-user");

var $nameDisplay = $("#name-display");
var $emailDisplay = $("#email-display");
var $ageDisplay = $("#age-display");
var $commentDisplay= $("#comment-display");

//when addUserInput is clicked we collect data from form and store in variables
$addUserInput.on("click", function(){
    //Don't refresh the page
    event.preventDefault();
    name = $nameInput.val().trim();
    email = $emailInput.val().trim();
    age = $ageInput.val().trim();
    comment = $commentInput.val().trim();
    //push the data to firebase
    firebase.database().ref().push({
        //give our properties a name
        name:name,
        email:email,
        age:age,
        comment:comment,
        //TIMESTAMP functionality via firebase
        dateAdded:firebase.database.ServerValue.TIMESTAMP
    });
});
//post data from firebase into the .well class everytime a new child is added
firebase.database().ref().on("child_added", function(snapshot){
    $(".well").append("<p>Name: " + snapshot.val().name + "</p>");
    $(".well").append("<p>Email: " + snapshot.val().email + "</p>");
    $(".well").append("<p>Age: " + snapshot.val().age + "</p>");
    $(".well").append("<p>Comment: " + snapshot.val().comment + "</p>");
    $(".well").append("<hr>");

});
//orders by firebase property, dateAdded, and only grabs the last one
firebase.database().ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
    $nameDisplay.html("<h3>Name: "+ snapshot.val().name + "</h3>");
    $emailDisplay.html("<h3>Email: "+ snapshot.val().email + "</h3>");
    $ageDisplay.html("<h3>Age: "+ snapshot.val().age + "</h3>");
    $commentDisplay.html("<h3>How did you hear?: "+ snapshot.val().comment + "</h3>");
});
