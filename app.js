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

var database = firebase.database();

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


$addUserInput.on("click", function(){
    name = $nameInput.val().trim();
    email = $emailInput.val().trim();
    age = $ageInput.val().trim();
    comment = $commentInput.val().trim();

    firebase.database().ref().push({
        name:name,
        email:email,
        age:age,
        comment:comment
    })
});


firebase.database().ref().on("value", function(snapshot){
    $nameDisplay.html(snapshot.val().name);
    $emailDisplay.html(snapshot.val().email);
    $ageDisplay.html(snapshot.val().age);
    $commentDisplay.html(snapshot.val().comment);
});
