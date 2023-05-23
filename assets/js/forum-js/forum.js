// Función para manejar el evento de clic en el botón "Publicar"
function addPost() {
  const postInput = document.getElementById("post-input").value.trim();

  if (postInput === "") {
    alert("Favor de publicar algo.");
    return;
  }

  // Crear un contenedor para la publicación
  const postContainer = document.createElement("div");
  postContainer.classList.add("post-container");

  //Crear un div general para el titulo, la imagen y la hora de la publicacion 
  const titlePost = document.createElement("div");
  titlePost.classList.add("d-flex");
  titlePost.classList.add("justify-content-between");
  titlePost.classList.add("mb-4");

  // Crear un elemento de imagen para la publicacion
  const postImage = document.createElement("img");
  postImage.src = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp";
  postImage.classList.add("rounded-circle"); // Agregar clase al elemento de imagen de la publicación
  postImage.classList.add("d-flex");
  postImage.classList.add("align-self-start");
  postImage.classList.add("me-3");
  postImage.classList.add("shadow-1-strong");
  titlePost.appendChild(postImage); // Agregar la imagen al contenedor de publicaciones

  // Crear un elemento de texto para la publicación
  const postText = document.createElement("h3");
  postText.textContent = postInput;
  postText.classList.add("post-text"); // Agregar clase al elemento de texto de la publicación
  titlePost.appendChild(postText); //Agregando el h3 al div del post container

  postContainer.appendChild(titlePost);

  //Crear un contenedor para las respuestas de los usuarios
  const listOfAnswer = document.createElement("div");
  listOfAnswer.classList.add("users_reply__form");

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
  postContainer.appendChild(listOfAnswer);
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

  // Crear un elemento de imagen para la respuesta
  const postImage = document.createElement("img");
  postImage.src = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"; // Reemplaza "ruta_de_la_imagen.jpg" por la ruta de la imagen que deseas mostrar
  postImage.classList.add("rounded-circle"); // Agregar clase al elemento de imagen de la publicación
  postImage.classList.add("d-flex");
  postImage.classList.add("align-self-start");
  postImage.classList.add("me-3");
  postImage.classList.add("shadow-1-strong");
  replyContainer.appendChild(postImage); // Agregar la imagen al contenedor de publicaciones

  // Crear un elemento de texto para la respuesta
  const replyTextElement = document.createElement("p");
  replyTextElement.textContent = replyText;
  replyTextElement.classList.add("reply-text"); // Agregar clase al elemento de texto de la respuesta
  replyContainer.appendChild(replyTextElement);

  // Obtener el contenedor de la publicación a la cual se está respondiendo
  const listOfAnswer =
    event.target.parentNode.parentNode.querySelector(".users_reply__form");
  listOfAnswer.appendChild(replyContainer);

  // Limpiar el campo de entrada de respuesta
  replyInput.value = "";
}

// Agregar un event listener al botón "Agregar publicación"
const addPostButton = document.getElementById("add-post-btn");
addPostButton.addEventListener("click", addPost);
