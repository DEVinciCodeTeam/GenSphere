const profileContainer = document.getElementById('profile');
const editFormContainer = document.getElementById('editForm');
const editButton = document.getElementById('editBtn');
const saveButton = document.getElementById('saveBtn');
const nameSpan = document.getElementById('name');
const lastNameSpan = document.getElementById('lastName');
const emailSpan = document.getElementById('email');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');

/* function activateEditMode() {
    profileContainer.style.display = 'none';
    editFormContainer.style.display = 'none';
    nameInput.value = nameSpan.textContent;
    emailInput.value = emailSpan.textContent;
  }

function saveChanges() {
  const newName = nameInput.value;
  const newEmail = emailInput.value;
  nameSpan.textContent = newName;
  emailSpan.textContent = newEmail;
  profileContainer.style.display = 'block';
  editFormContainer.style.display = 'none';
}

editButton.addEventListener('click', activateEditMode);
saveButton.addEventListener('click', saveChanges);


// Obtenemos referencias a los elementos del DOM
const profileContainer = document.getElementById('profile');
const editFormContainer = document.getElementById('editForm');
const editButton = document.getElementById('editBtn');
const saveButton = document.getElementById('saveBtn');
const nameSpan = document.getElementById('name');
const emailSpan = document.getElementById('email');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');

// Función para activar el modo de edición
function activateEditMode() {
  profileContainer.style.display = 'none';
  editFormContainer.style.display = 'block';
  nameInput.value = nameSpan.textContent;
  emailInput.value = emailSpan.textContent;
}

// Función para guardar los cambios
function saveChanges() {
  const newName = nameInput.value;
  const newEmail = emailInput.value;
  nameSpan.textContent = newName;
  emailSpan.textContent = newEmail;
  profileContainer.style.display = 'block';
  editFormContainer.style.display = 'none';
}

// Agregamos los event listeners a los botones
editButton.addEventListener('click', activateEditMode);
saveButton.addEventListener('click', saveChanges);
  */