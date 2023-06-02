// Objeto que almacena todos los objetos de datos creados dentro de las funciones
let generalUsersCount = 0;
let usersCountByCohorte = {};

// const removeMessage = (elementId) => {
//   const buttonRef = document.getElementById(elementId);
//   buttonRef.style.display = "none";
// }
// const restoreMessage = (elementId) => {
//   const buttonRef = document.getElementById(elementId);
//   buttonRef.style.display = "inline";
// }
removeMessage("unregisteredEmail");
removeMessage("incomplitedFields");
removeMessage("wrongPassword");
removeMessage("repeatedEmail");
removeMessage("singUpSuccesful");
let allUsers = JSON.parse(localStorage.getItem("allUsers"));

if (allUsers == null) {
  allUsers = {};
}

const signUpForm = document.getElementById("signUpForm");


signUpForm.onsubmit = function(e) {

  e.preventDefault();
  const getUserName = document.getElementById("userName").value.trim();
  const getUserEmail = document.getElementById("userEmail").value.trim();
  const getUserCohorte = document.getElementById("userCohorte").value.trim();
  const getUserPassword = document.getElementById("userPassword").value.trim();

  if (getUserName == "" || getUserEmail == "" || getUserCohorte == "" || getUserPassword == "") {
    restoreMessage("incomplitedFields");
    removeMessage("repeatedEmail");
    removeMessage("singUpSuccesful");
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
      restoreMessage("singUpSuccesful");
      removeMessage("incomplitedFields");
      removeMessage("repeatedEmail");
    } else {
      const signUpFormContainer = document.getElementById("signUpFormContainer");
      restoreMessage("repeatedEmail");
      removeMessage("incomplitedFields");
      removeMessage("singUpSuccesful");
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
    restoreMessage("unregisteredEmail");
    removeMessage("wrongPassword");
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
      restoreMessage("wrongPassword");
      removeMessage("unregisteredEmail");
    }
  }

}






