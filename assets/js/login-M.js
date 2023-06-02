const signUpButton = document.getElementById('registrar');
const signInButton = document.getElementById('iniciar');

// const container = document.getElementById('container');
const container = document.getElementById('container-fluid');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

const signUpButton2 = document.getElementById('registrar2');
const signInButton2 = document.getElementById('iniciar2');

// const container = document.getElementById('container');

signUpButton2.addEventListener('click', () => {
  container.classList.add("up-panel-active");
});

signInButton2.addEventListener('click', () => {
  container.classList.remove("up-panel-active");
});
