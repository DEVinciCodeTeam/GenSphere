// Objeto que almacena todos los objetos de datos creados dentro de las funciones
let generalUsersCount = 0;
let usersCountByCohorte = {};

const allUsers = {};
const signUpForm = document.getElementById("signUpForm");


signUpForm.onsubmit = function(e) {

  e.preventDefault();
  const getUserName = document.getElementById("userName").value.trim();
  const getUserEmail = document.getElementById("userEmail").value.trim();
  const getUserCohorte = document.getElementById("userCohorte").value.trim();
  const getUserPassword = document.getElementById("userPassword").value.trim();

  if (getUserName == "" || getUserEmail == "" || getUserCohorte == "" || getUserPassword == "") {
    alert("Porfavor, completa todos los campos")
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
    } else {
      const signUpFormContainer = document.getElementById("signUpFormContainer");
      alert("Esta cuenta de correo ya ha sido registrada previamente\nIngresa un correo distinto, por favor.")

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
    // alert("El correo no esta registrado, por favor crea una cuenta en GenSphere.");
    restablecerBoton("");
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
    } else {
      alert("La contraseña no coincide con el correo que proporcionaste");
    }
  }

}


const quitarBoton = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "none";
}

const ocultarBoton = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.visibility = "hidden";
}

const restablecerBoton = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "inline";
  buttonRef.style.visibility = "visible";
}