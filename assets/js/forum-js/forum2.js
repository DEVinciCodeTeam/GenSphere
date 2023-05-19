// Función para manejar el evento de clic en el botón "Agregar publicación"
function addPost() {
  const postInput = document.getElementById("post-input").value.trim();

  if (postInput === "") {
    alert("Favor de publicar algo.");
    return;
  }

  // Crear un contenedor para la publicación
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  // Crear un elemento de texto para la publicación
  const postText = document.createElement("h3");
  postText.textContent = postInput;
  postText.classList.add("post-text"); // Agregar clase al elemento de texto de la publicación
  postContainer.appendChild(postText);

  // Crear un formulario para las respuestas
  const replyForm = document.createElement("div");
  replyForm.classList.add("reply__form");

  // Crear un campo de entrada para las respuestas
  const replyInput = document.createElement("input");
  replyInput.type = "text";
  replyInput.placeholder = "¡Comenta algo!";
  replyForm.appendChild(replyInput);

  // Crear un botón para enviar las respuestas
  const replyButton = document.createElement("button");
  replyButton.classList.add("reply-btn");
  replyButton.textContent = "Comenta";
  replyButton.addEventListener("click", addReply);
  replyForm.appendChild(replyButton);

  // Agregar el formulario de respuestas al contenedor de la publicación
  postContainer.appendChild(replyForm);

  // Obtener el contenedor de la pared (wall)
  const wallContainer = document.querySelector(".wall__container");
  wallContainer.appendChild(postContainer);

  // Limpiar el campo de entrada de la publicación
  document.getElementById("post-input").value = "";
}

// Función para manejar el evento de clic en el botón "Responder"
function addReply(event) {
  const replyInput =
    event.target.parentNode.querySelector("input[type='text']");
  const replyText = replyInput.value.trim();

  if (replyText === "") {
    alert("Favor de contestar algo.");
    return;
  }

  // Crear un contenedor para la respuesta
  const replyContainer = document.createElement("div");
  replyContainer.classList.add("reply-container");

  // Crear un elemento de texto para la respuesta
  const replyTextElement = document.createElement("p");
  replyTextElement.textContent = replyText;
  replyTextElement.classList.add("reply-text"); // Agregar clase al elemento de texto de la respuesta
  replyContainer.appendChild(replyTextElement);

  // Obtener el contenedor de la publicación a la cual se está respondiendo
  const postContainer = event.target.parentNode.parentNode;
  postContainer.appendChild(replyContainer);

  // Limpiar el campo de entrada de respuesta
  replyInput.value = "";
}

// Agregar un event listener al botón "Agregar publicación"
const addPostButton = document.getElementById("add-post-btn");
addPostButton.addEventListener("click", addPost);
