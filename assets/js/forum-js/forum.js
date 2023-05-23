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

  // Crear un contenedor para el header de la publicacion
  const postHeaderUser = document.createElement("div");
  postHeaderUser.classList.add("general-post-info");

  // Crear un div para el contenido de la publicación
  const postContentDiv = document.createElement("div");
  postContentDiv.classList.add("post-content");

  // Crear un elemento de imagen para la publicación
  const postImage = document.createElement("img");
  postImage.src = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp";
  postImage.classList.add("rounded-circle");
  postImage.classList.add("me-3");
  postImage.classList.add("shadow-1-strong");
  postImage.style.width = "60px";
  postImage.style.height = "60px";

  // Crear un elemento para el nombre
  const nameElement = document.createElement("h3");
  nameElement.textContent = "John Doe";
  nameElement.classList.add("post-name");

  // Crear un elemento para la fecha
  const postDate = document.createElement("p");
  const currentDate = new Date();
  postDate.textContent = currentDate.toLocaleDateString();
  postDate.classList.add("post-date");

  postContentDiv.appendChild(postImage);
  postContentDiv.appendChild(nameElement);
  postContentDiv.appendChild(postDate);

  // Agregar el contenido de la publicación al contenedor de la publicación
  postHeaderUser.appendChild(postContentDiv);

  // Crear un div para el texto
  const postTextDiv = document.createElement("div");
  postTextDiv.classList.add("posttextdiv");

  // Crear un elemento para el texto de la publicación
  const postTextElement = document.createElement("p");
  postTextElement.textContent = postInput;
  postTextElement.classList.add("post-text");
  postTextDiv.appendChild(postTextElement);

  // Agregar el posttextdiv al contenedor de la publicación
  postHeaderUser.appendChild(postTextDiv);
  console.log(postHeaderUser);
  console.log(typeof postHeaderUser);
  postContainer.appendChild(postHeaderUser);

  // Crear un contenedor para las respuestas de los usuarios
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
function addReply(event) {
  const replyInput =
    event.target.parentNode.querySelector("input[type='text']");
  const replyText = replyInput.value.trim();

  if (replyText === "") {
    alert("Por favor comenta algo.");
    return;
  }

  // Create a container for the reply
  const replyContainer = document.createElement("div");
  replyContainer.classList.add("reply-container");

  // Create a div for the header and text of the reply
  const replyContentDiv = document.createElement("div");
  replyContentDiv.classList.add("reply-content");

  // Create an element for the image
  const replyImage = document.createElement("img");
  replyImage.src = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp";
  replyImage.classList.add("rounded-circle");
  replyImage.classList.add("me-3");
  replyImage.classList.add("shadow-1-strong");
  replyImage.style.width = "60px";
  replyImage.style.height = "60px";

  // Create an element for the name
  const nameElement = document.createElement("h3");
  nameElement.textContent = "Jane Doe";
  nameElement.classList.add("reply-name");

  // Create an element for the date
  const replyDate = document.createElement("p");
  const currentDate = new Date();
  replyDate.textContent = currentDate.toLocaleDateString();
  replyDate.classList.add("reply-date");

  replyContentDiv.appendChild(replyImage);
  replyContentDiv.appendChild(nameElement);
  replyContentDiv.appendChild(replyDate);

  // Create a div for the text of the reply
  const textReplyDiv = document.createElement("div");
  textReplyDiv.classList.add("text-reply");

  // Create an element for the reply text
  const replyTextElement = document.createElement("p");
  replyTextElement.textContent = replyText;
  replyTextElement.classList.add("reply-text");
  textReplyDiv.appendChild(replyTextElement);

  replyContainer.appendChild(replyContentDiv);
  replyContainer.appendChild(textReplyDiv);

  // Get the container of the post to which the reply is being added
  const postContainer = event.target.parentNode.parentNode;
  const listOfAnswer = postContainer.querySelector(".users_reply__form");
  listOfAnswer.appendChild(replyContainer);

  // Clear the reply input field
  replyInput.value = "";
}
// Agregar un event listener al botón "Agregar publicación"
const addPostButton = document.getElementById("add-post-btn");
addPostButton.addEventListener("click", addPost);
