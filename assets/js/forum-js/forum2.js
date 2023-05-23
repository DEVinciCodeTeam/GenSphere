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

  // Crear un header para el post
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("post-header");

  // Crear un elemento de imagen para la publicación
  const postImage = document.createElement("img");
  postImage.src = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp";
  postImage.classList.add("rounded-circle"); // Agregar clase al elemento de imagen de la publicación
  postImage.classList.add("me-3");
  postImage.classList.add("shadow-1-strong");
  postImage.style.width = "60px"; // Ajustar el ancho de la imagen a tu tamaño deseado
  postImage.style.height = "60px"; // Mantener la relación de aspecto

  // Crear un elemento para el nombre
  const nameElement = document.createElement("h3");
  nameElement.textContent = "John Doe";
  nameElement.classList.add("post-name");

  // Crear un elemento para la fecha
  const postDate = document.createElement("p");
  const currentDate = new Date();
  postDate.textContent = currentDate.toLocaleDateString();
  postDate.classList.add("post-date");

  headerDiv.appendChild(postImage);
  headerDiv.appendChild(nameElement);
  headerDiv.appendChild(postDate);

  // Crear un div para el texto
  const textDiv = document.createElement("div");
  textDiv.textContent = postInput;
  textDiv.classList.add("post-text");

  // Agregar el contenedor flexbox al contenedor de publicaciones
  postContainer.appendChild(headerDiv);
  postContainer.appendChild(textDiv);
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
  postImage.style.width = "60px"; // Ajustar el ancho de la imagen a tu tamaño deseado
  postImage.style.height = "auto"; // Mantener la relación de aspecto

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
