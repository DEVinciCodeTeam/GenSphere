
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

function transformDates(date) {
  const dateArray = date.split("-")
  console.log(dateArray)
  daysToString = {
    "01": "Lunes",
    "02": "Martes",
    "03": "Miércoles",
    "04": "Jueves",
    "05": "Viernes",
    "06": "Sábado",
    "07": "Domingo"
  }
  monthsToString = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",
  }
  return (monthsToString[dateArray[1]] + ", " + dateArray[0])

}

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
  const getUserPassword = cyrb53(document.getElementById("userPassword").value.trim()).toString();

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
      const userJoinDate = new Date();
      console.log(userJoinDate.toJSON().slice(0, 10));
      transformDates(userJoinDate.toJSON().slice(0, 10));
      console.log(transformDates(userJoinDate.toJSON().slice(0, 10)))

      allUsers[getUserEmail] = {
        userId: generalUsersCount++,
        usertIdCohorte: usersCountByCohorte[getUserCohorte]++,
        userName: getUserName,
        userEmail: getUserEmail,
        userCohorte: getUserCohorte,
        userPassword: getUserPassword,
        userProfilePicture: "../../assets/img/logo/genspherePP2.png",
        userJoinedDate: transformDates(userJoinDate.toJSON().slice(0, 10)),
        userPosts: [],
        userReplies: []
      }
      localStorage.setItem("allUsers", JSON.stringify(allUsers))
      const testUser = {
        userName: getUserName,
        userEmail: getUserEmail,
        userCohorte: getUserCohorte,
        userPassword: getUserPassword
      }
      console.log("sendUserToApi")
      sendUserToApi(testUser);
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
  const getUserPassword = cyrb53(document.getElementById("userPasswordLogin").value.trim()).toString();

  const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  console.log(getUsersFromApi(getUserEmail));
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


