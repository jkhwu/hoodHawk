 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyD_jrOnZmqkt6Mz_yo-brdsefuqPB5FsHM",
     authDomain: "hoodhawk-49160.firebaseapp.com",
     databaseURL: "https://hoodhawk-49160.firebaseio.com",
     projectId: "hoodhawk-49160",
     storageBucket: "",
     messagingSenderId: "685681342098"
 };

 firebase.initializeApp(config);

 var database = firebase.database().ref()
 var users = firebase.database().ref().child('users')
 var txtEmail = document.getElementById('txtEmail')
 var txtPassword = document.getElementById('txtPassword')
 var signIn = document.getElementById('signIn')
 var signUp = document.getElementById('signUp')
 var logout = document.getElementById('logout')
 var uid = ''

 if (signIn) {
     signIn.addEventListener('click', function(event) {
         event.preventDefault()
         var email = txtEmail.value;
         var pass = txtPassword.value;
         var auth = firebase.auth()
         var promise = auth.signInWithEmailAndPassword(email, pass)
         promise.catch(e => console.log(e.message))

         $('#logout').removeClass('hide')
         $('#logout').addClass('show')
         window.location = "file:///Users/RyanPalermo/Code/hoodHawk/logged.html"
     })
 }

 logout.addEventListener('click', function() {
     firebase.auth().signOut();
     //window.location = ''
 })
 if (signUp) {
     signUp.addEventListener('click', function(event) {
         event.preventDefault()
         var email = txtEmail.value;
         var pass = txtPassword.value;
         var auth = firebase.auth();
         firebase.auth().createUserWithEmailAndPassword(email, pass)
             .then(function(response) {
                 console.log(response.uid);

                 firebase.database().ref("users/" + response.uid).set({
                     email: email,
                     displayName: "display"
                 });
             });
     })
 }

 firebase.auth().onAuthStateChanged(function(user) {
     if (user) {
         uid = user.uid
         retrieve()
     } else {
         console.log('not logged in')
     }
 })

 //  $(document).ready(function() {
 //      retrieve()
 //  })
 var newAdd = ''
 var newZip = ''

 function retrieve() {
     firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {
         console.log(snapshot.val())

         newAdd = snapshot.val().favoriteAdd
         newZip = snapshot.val().favoriteZip
         console.log(snapshot.val().favoriteZip)
         console.log(snapshot.val().favoriteAdd)
         $('#favoriteDisplay').html(`<button id='populate'>click me</button><br><p>${newAdd}</p>`)
         $('#favoriteDisplay').append(`<br>${newZip}<br><button id='delete'>delete fav</button>`)

     })
 }

 $('body').on('click', '#populate', function() {
     initial(newAdd, newZip)
 })

 $('body').on('click', '#delete', function() {
     firebase.database().ref('/users/' + uid).update({
         favoriteAdd: null,
         favoriteZip: null
     })
     $('#favoriteDisplay').html('')
 })

 $('body').on('click', '#favorites', function() {
     console.log('fav button working')
     firebase.database().ref('/users/' + uid).update({
         favoriteAdd: address,
         favoriteZip: zipCode
     })

 })