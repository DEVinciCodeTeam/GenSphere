removeMessage("unregisteredEmail");
removeMessage("incomplitedFields");
removeMessage("wrongPassword");
removeMessage("repeatedEmail");
removeMessage("singUpSuccesful");


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
    const userJoinDate = new Date();
    transformDates(userJoinDate.toJSON().slice(0, 10));

    const testUser = {
      userName: getUserName,
      userEmail: getUserEmail,
      userCohorte: parseInt(getUserCohorte),
      userPassword: getUserPassword,
      userJoinedDate: transformDates(userJoinDate.toJSON().slice(0, 10)),
      userProfilePicture: "../../assets/img/logo/genspherePP2.png",
    }
    userSignUpApi(testUser);
  }
}


const signInForm = document.getElementById("signInForm");

signInForm.onsubmit = function(e) {
  e.preventDefault()
  const getUserEmail = document.getElementById("userEmailLogin").value.trim();
  const getUserPassword = cyrb53(document.getElementById("userPasswordLogin").value.trim()).toString();
  userSignInApi(getUserEmail, getUserPassword);
}


