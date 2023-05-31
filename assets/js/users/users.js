// Objeto que almacena todos los objetos de datos creados dentro de las funciones
let generalUsersCount = 0;
let usersCountByCohorte = {};

const quitarBoton = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "none";
}
const restablecerBoton = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "inline";
}
quitarBoton("unregisteredEmail");
quitarBoton("incomplitedFields");
quitarBoton("wrongPassword");
quitarBoton("repeatedEmail");
quitarBoton("singUpSuccesful");
const allUsers = JSON.parse(localStorage.getItem("allUsers"));
 /* const allUsers = {}; */ 
const signUpForm = document.getElementById("signUpForm");


signUpForm.onsubmit = function(e) {

  e.preventDefault();
  const getUserName = document.getElementById("userName").value.trim();
  const getUserEmail = document.getElementById("userEmail").value.trim();
  const getUserCohorte = document.getElementById("userCohorte").value.trim();
  const getUserPassword = document.getElementById("userPassword").value.trim();
 
  if (getUserName == "" || getUserEmail == "" || getUserCohorte == "" || getUserPassword == "") {
    restablecerBoton("incomplitedFields");
  } else {
    if (!allUsers[getUserEmail]) {
      console.log(getUserName, getUserEmail, getUserCohorte, getUserPassword);

      if (!usersCountByCohorte[getUserCohorte]) {
        usersCountByCohorte[getUserCohorte] = 0
      }

      allUsers[getUserEmail] = {
        userId: generalUsersCount++,
        usertIdCohorte: usersCountByCohorte[getUserCohorte]++,
        userName: getUserName,
        userEmail: getUserEmail,
        userCohorte: getUserCohorte,
        userPassword: getUserPassword
      }
      localStorage.setItem("allUsers", JSON.stringify(allUsers))
      restablecerBoton("singUpSuccesful");
      quitarBoton("incomplitedFields");
      quitarBoton("repeatedEmail");
    } else {
      const signUpFormContainer = document.getElementById("signUpFormContainer");
     restablecerBoton("repeatedEmail");
    }
  }
}


const signInForm = document.getElementById("signInForm");

signInForm.onsubmit = function(e) {
  e.preventDefault()
  const getUserEmail = document.getElementById("userEmailLogin").value.trim();
  const getUserPassword = document.getElementById("userPasswordLogin").value.trim();

  const allUsers = JSON.parse(localStorage.getItem("allUsers"));

  if (!allUsers[getUserEmail]) {
    restablecerBoton("unregisteredEmail");
  } else {

    if (getUserPassword == allUsers[getUserEmail].userPassword) {
      // ------------------Agregado por mi:----------------------------------
      // Guarda el ultimo usuario que inicio sesión
      const currentUser = allUsers[getUserEmail];
      const currentUserJSON = JSON.stringify(currentUser);
      sessionStorage.setItem("currentUser", currentUserJSON);
      const storedCurrentUserJSON = sessionStorage.getItem("currentUser");
      const storedCurrentUser = JSON.parse(storedCurrentUserJSON);

      // Guarda todos los usuarios que inician sesión
      /* const currentUser = allUsers[getUserEmail];
      let loggedInUsers = JSON.parse(localStorage.getItem("loggedInUsers")) || [];
      loggedInUsers.push(currentUser);
      localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers)); */

      console.log("Entraste!")
      window.location.href = "../../../index.html";
    } else {
   
      restablecerBoton("wrongPassword");
    }
  }

}






