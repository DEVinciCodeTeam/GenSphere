/* const removeMessage = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "none";
}
const restoreMessage = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "inline";
}
 */

sessionStorage.clear()

const signUpButton = document.getElementById('registrar');
const signInButton = document.getElementById('iniciar');


// const container = document.getElementById('container');
const container = document.getElementById('container-fluid');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");

  removeMessage("unregisteredEmail");
  removeMessage("incomplitedFields");
  removeMessage("wrongPassword");
  removeMessage("repeatedEmail");
  removeMessage("singUpSuccesful");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
  removeMessage("unregisteredEmail");
  removeMessage("incomplitedFields");
  removeMessage("wrongPassword");
  removeMessage("repeatedEmail");
  removeMessage("singUpSuccesful");
});

const signUpButton2 = document.getElementById('registrar2');
const signInButton2 = document.getElementById('iniciar2');

// const container = document.getElementById('container');

signUpButton2.addEventListener('click', () => {
  container.classList.add("up-panel-active");
  removeMessage("unregisteredEmail");
  removeMessage("incomplitedFields");
  removeMessage("wrongPassword");
  removeMessage("repeatedEmail");
  removeMessage("singUpSuccesful");
});

signInButton2.addEventListener('click', () => {
  container.classList.remove("up-panel-active");
  removeMessage("unregisteredEmail");
  removeMessage("incomplitedFields");
  removeMessage("wrongPassword");
  removeMessage("repeatedEmail");
  removeMessage("singUpSuccesful");
});


function showPassword() {
  const tipo = document.getElementById("userPassword");
  if (tipo.type == "password") {
    tipo.type = "text";
  } else {
    tipo.type = "password";
  }
}

function userPasswordLog() {
  const tipo = document.getElementById("userPasswordLogin");
  if (tipo.type == "password") {
    tipo.type = "text";
  } else {
    tipo.type = "password";
  }
}
