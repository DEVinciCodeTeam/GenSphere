// Objeto que almacena todos los objetos de datos creados dentro de las funciones
const allData = { id: "Semana2", postData: [] };

let postDataId = null;
let postDataIdCounter = 1;
const postHeader = {};

//Iteradores
let postHeaderId = null;
let postHeaderIdCounter = 1;
let postReplyIdCounter = 1;

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
  postContainer.setAttribute("data-postId", postHeaderIdCounter);

  // Crear un contenedor para el encabezado de la publicación
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

  postHeaderUser.appendChild(postContentDiv);

  // Crear un div para el texto de la publicación
  const postTextDiv = document.createElement("div");
  postTextDiv.classList.add("posttextdiv");

  // Crear un elemento para el texto de la publicación
  const postTextElement = document.createElement("p");
  postTextElement.textContent = postInput;
  postTextElement.classList.add("post-text");
  postTextDiv.appendChild(postTextElement);

  postHeaderUser.appendChild(postTextDiv);

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

  postContainer.appendChild(listOfAnswer);
  postContainer.appendChild(replyForm);

  const wallContainer = document.querySelector(".wall__container");
  wallContainer.appendChild(postContainer);

  document.getElementById("post-input").value = "";

  let postHeaderId = postHeaderIdCounter++;

  const postHeader = {
    postHeaderId,
    "post-header-name": nameElement.textContent,
    "post-header-date": postDate.textContent,
    "post-header-text": postInput,
  };

  let postDataId = postDataIdCounter++;

  const postData = {
    postDataId,
    postHeader: [],
    replyData: [],
  }; //Quitar

  postData.postHeader.push(postHeader);

  allData.postData.push(postData);

  console.clear();

  //Guardar en Local Storage
  appendObjectToLocalStorage(allData);
}

function addReply(event) {
  const replyInput =
    event.target.parentNode.querySelector("input[type='text']");
  const replyText = replyInput.value.trim();

  if (replyText === "") {
    alert("Por favor comenta algo.");
    return;
  }

  // Crear un contenedor para la respuesta
  const replyContainer = document.createElement("div");
  replyContainer.classList.add("reply-container");

  const replyContentDiv = document.createElement("div");
  replyContentDiv.classList.add("reply-content");

  const replyImage = document.createElement("img");
  replyImage.src = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp";
  replyImage.classList.add("rounded-circle");
  replyImage.classList.add("me-3");
  replyImage.classList.add("shadow-1-strong");
  replyImage.style.width = "60px";
  replyImage.style.height = "60px";

  const nameElement = document.createElement("h3");
  nameElement.textContent = "Jane Doe";
  nameElement.classList.add("reply-name");

  const replyDate = document.createElement("p");
  const currentDate = new Date();
  replyDate.textContent = currentDate.toLocaleDateString();
  replyDate.classList.add("reply-date");

  replyContentDiv.appendChild(replyImage);
  replyContentDiv.appendChild(nameElement);
  replyContentDiv.appendChild(replyDate);

  const textReplyDiv = document.createElement("div");
  textReplyDiv.classList.add("text-reply");

  const replyTextElement = document.createElement("p");
  replyTextElement.textContent = replyText;
  replyTextElement.classList.add("reply-text");
  textReplyDiv.appendChild(replyTextElement);

  replyContainer.appendChild(replyContentDiv);
  replyContainer.appendChild(textReplyDiv);

  const postContainer = event.target.parentNode.parentNode;
  const listOfAnswer = postContainer.querySelector(".users_reply__form");
  listOfAnswer.appendChild(replyContainer);

  replyInput.value = "";

  const replyId = postReplyIdCounter++;

  const replyData = {
    replyId,
    postHeaderId: postContainer.getAttribute("data-postId"),
    "reply-name": nameElement.textContent,
    "reply-date": replyDate.textContent,
    "reply-text": replyText,
  };

  let idHeader = postContainer.getAttribute("data-postId");
  allData.postData[idHeader - 1].replyData.push(replyData);

  //Guardar en Local Storage
  appendObjectToLocalStorage(allData);

  allData.postData[idHeader - 1].replyData.push(replyData);
}

// Add an event listener to the "Agregar publicación" button
const addPostButton = document.getElementById("add-post-btn");
addPostButton.addEventListener("click", addPost);

//Funcion para guardar la informacion en Local Storage.
function appendObjectToLocalStorage(allData) {
  const element = allData;
  localStorage.setItem("forum1Posts", JSON.stringify(element));
}
// Lista aparece en orden con a animación
const listItems = document.querySelectorAll(".list-animation");

function showItems() {
  listItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("fade-in");
    }, index * 350);
  });
}

document.addEventListener("DOMContentLoaded", showItems);

document.addEventListener("DOMContentLoaded", () => {
  // Function to store the information in local storage
  function saveDataToLocalStorage(data) {
    localStorage.setItem("forum1Posts", JSON.stringify(data));
  }

  // Function to retrieve the information from local storage
  function getDataFromLocalStorage() {
    const storedData = localStorage.getItem("forum1Posts");
    return JSON.parse(storedData);
  }

  // Function to populate the wall__container with the retrieved data
  function populateWallContainer(data) {
    const wallContainer = document.querySelector(".wall__container");
    wallContainer.innerHTML = "";

    data.postData.forEach((postData) => {
      const postContainer = document.createElement("div");
      postContainer.classList.add("post-container");
      postContainer.setAttribute("data-postId", postData.postDataId);

      postData.postHeader.forEach((postHeader) => {
        const postHeaderUser = document.createElement("div");
        postHeaderUser.classList.add("general-post-info");

        const postContentDiv = document.createElement("div");
        postContentDiv.classList.add("post-content");

        const postImage = document.createElement("img");
        postImage.src =
          "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp";
        postImage.classList.add("rounded-circle");
        postImage.classList.add("me-3");
        postImage.classList.add("shadow-1-strong");
        postImage.style.width = "60px";
        postImage.style.height = "60px";

        const nameElement = document.createElement("h3");
        nameElement.textContent = postHeader["post-header-name"];
        nameElement.classList.add("post-name");

        const postDate = document.createElement("p");
        postDate.textContent = postHeader["post-header-date"];
        postDate.classList.add("post-date");

        postContentDiv.appendChild(postImage);
        postContentDiv.appendChild(nameElement);
        postContentDiv.appendChild(postDate);

        postHeaderUser.appendChild(postContentDiv);

        const postTextDiv = document.createElement("div");
        postTextDiv.classList.add("posttextdiv");

        const postTextElement = document.createElement("p");
        postTextElement.textContent = postHeader["post-header-text"];
        postTextElement.classList.add("post-text");
        postTextDiv.appendChild(postTextElement);

        postHeaderUser.appendChild(postTextDiv);

        postContainer.appendChild(postHeaderUser);
      });

      postData.replyData.forEach((replyData) => {
        const replyContainer = document.createElement("div");
        replyContainer.classList.add("reply-container");

        const replyContentDiv = document.createElement("div");
        replyContentDiv.classList.add("reply-content");

        const replyImage = document.createElement("img");
        replyImage.src =
          "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp";
        replyImage.classList.add("rounded-circle");
        replyImage.classList.add("me-3");
        replyImage.classList.add("shadow-1-strong");
        replyImage.style.width = "60px";
        replyImage.style.height = "60px";

        const nameElement = document.createElement("h3");
        nameElement.textContent = replyData["reply-name"];
        nameElement.classList.add("reply-name");

        const replyDate = document.createElement("p");
        replyDate.textContent = replyData["reply-date"];
        replyDate.classList.add("reply-date");

        replyContentDiv.appendChild(replyImage);
        replyContentDiv.appendChild(nameElement);
        replyContentDiv.appendChild(replyDate);

        const textReplyDiv = document.createElement("div");
        textReplyDiv.classList.add("text-reply");

        const replyTextElement = document.createElement("p");
        replyTextElement.textContent = replyData["reply-text"];
        replyTextElement.classList.add("reply-text");
        textReplyDiv.appendChild(replyTextElement);

        replyContainer.appendChild(replyContentDiv);
        replyContainer.appendChild(textReplyDiv);

        postContainer.appendChild(replyContainer);
      });

      wallContainer.appendChild(postContainer);
    });
  }

  // Fetch data from local storage and populate the wall__container
  const storedData = getDataFromLocalStorage();
  if (storedData) {
    populateWallContainer(storedData);
  }

  // Axios request to post the data to the local storage
  axios
    .get("/getforum1")
    .then((response) => {
      const data = response.data;
      saveDataToLocalStorage(data);
      populateWallContainer(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Attempt 2
