/* console.log("Hola consola");
var app = {}; //organizar los datos, objeto donde se colocan nuestros datos
var myCallbackLogin = function (datos) {
  console.log(datos);
  app.users = datos; //se guarda en nuestra variable general para poder llamarla en cualquier lugar

  var email = "";
  app.users.forEach(user => {
    email += user.email;
  });

  document.getElementById("emailLink").href = "mailto:" + email;
  document.getElementById("editUserEmailInput").placeholder = email;
  document.getElementById("editUserEmailInput").value = email;

  var name = "";
  app.users.map(user => {
    name += user.name;
  });
  document.getElementById("editUser").innerHTML = name;
  document.getElementById("editUserName").innerHTML = name;

  var namePlaceholder = app.users[1].name; // Obtén el valor del nombre de Andrea
  document.getElementById("editUserNameInput").placeholder = namePlaceholder;
  document.getElementById("editUserNameInput").value = namePlaceholder;

  var cohorte = "";
  app.users.map(user => {
    cohorte += user.cohorte;
  });
  document.getElementById("cohorte").innerHTML = cohorte;

  var cohortePlaceholder = app.users[1].cohorte; // Obtén el valor de la cohorte de Andrea
  document.getElementById("editUserCohorteInput").placeholder = cohortePlaceholder;
  document.getElementById("editUserCohorteInput").value = cohortePlaceholder;
};//es la variable que llamo cuando tenga los datos  */
/* -------------------------------------------------------------------------- */
/* console.log("Hola consola"); */
/* var app = {}; //organizar los datos, objeto donde se colocan nuestros datos
var myCallbackLogin = function (datos, index) {
  console.log(datos);
  app.users = datos; //se guarda en nuestra variable general para poder llamarla en cualquier lugar

  /* var user = app.users[1]; */

/*  document.getElementById("editUser").innerHTML = user.name;
 document.getElementById("editUserName").innerHTML = user.name;
 document.getElementById("editUserNameInput").placeholder = user.name;
 document.getElementById("editUserNameInput").value = user.name;
 document.getElementById("emailLink").href = "mailto:" + user.email;
 document.getElementById("editUserEmailInput").placeholder = user.email;
 document.getElementById("editUserEmailInput").value = user.email;
 document.getElementById("cohorte").innerHTML = user.cohorte;
 document.getElementById("editUserCohorteInput").placeholder = user.cohorte;
 document.getElementById("editUserCohorteInput").value = user.cohorte;
};  */

var app = JSON.parse(localStorage.getItem("allUsers")); //organizar los datos, objeto donde se colocan nuestros datos
var myCallbackLogin = function() {
  var user;
  user = app["mario@correo.com"]; //se guarda en nuestra variable general para poder llamarla en cualquier lugar

  /* var user = app.users[1]; */

  document.getElementById("editUser").innerHTML = user.userName;
  document.getElementById("editUserName").innerHTML = user.userName;
  document.getElementById("editUserNameInput").placeholder = user.userName;
  document.getElementById("editUserNameInput").value = user.userName;
  document.getElementById("emailLink").href = "mailto:" + user.userEmail;
  document.getElementById("editUserEmailInput").placeholder = user.userEmail;
  document.getElementById("editUserEmailInput").value = user.userEmail;
  document.getElementById("cohorte").innerHTML = user.userCohorte;
  document.getElementById("editUserCohorteInput").placeholder = user.userCohorte;
  document.getElementById("editUserCohorteInput").value = user.userCohorte;
};
console.log(app);
