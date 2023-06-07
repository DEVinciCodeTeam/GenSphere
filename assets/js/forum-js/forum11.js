// Objeto que almacena todos los objetos de datos creados dentro de las funciones
let allData = { id: "Semana11", postData: [] };

function handleMouseEvents(element) {
  element.addEventListener("mouseenter", function () {
    const temp = this.textContent;
    this.textContent = this.getAttribute("data-userEmail");
    this.setAttribute("data-userEmail", temp);
  });

  element.addEventListener("mouseleave", function () {
    const temp = this.textContent;
    this.textContent = this.getAttribute("data-userEmail");
    this.setAttribute("data-userEmail", temp);
  });
}

// Counter variables
let postDataIdCounter = 1;
let postHeaderIdCounter = 1;
let postReplyIdCounter = 1;

//Funcion para guardar la informacion en Local Storage.
function appendObjectToLocalStorage(allData) {
  const element = allData;
  localStorage.setItem("forum11Posts", JSON.stringify(element));
}

// Get the current user name from sessionStorage
const currentUser = sessionStorage.getItem("currentUser");
const userName = currentUser ? JSON.parse(currentUser).userName : "Anonymous";

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
  // Generar un nuevo postDataId único
  const postDataId = allData.postData.length + 1;
  postContainer.setAttribute("data-postId", postDataId);

  // Crear un contenedor para el encabezado de la publicación
  const postHeaderUser = document.createElement("div");
  postHeaderUser.classList.add("general-post-info");

  // Crear un div para el contenido de la publicación
  const postContentDiv = document.createElement("div");
  postContentDiv.classList.add("post-content");

  // Crear un elemento de imagen para la publicación
  const postImage = document.createElement("img");
  postImage.src = getUserPP();
  postImage.classList.add("rounded-circle");
  postImage.classList.add("me-3");
  postImage.classList.add("shadow-1-strong");
  postImage.style.width = "60px";
  postImage.style.height = "60px";

  const nameElement = document.createElement("h3");
  nameElement.textContent = userName;
  nameElement.classList.add("post-name");
  nameElement.setAttribute(
    "data-userEmail",
    currentUser ? JSON.parse(currentUser).userEmail : ""
  );

  handleMouseEvents(nameElement);

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
  wallContainer.prepend(postContainer);

  document.getElementById("post-input").value = "";

  const postHeader = {
    postHeaderId: 1,
    "post-header-name": nameElement.textContent,
    "post-header-date": postDate.textContent,
    "post-header-text": postInput,
    "post-header-pp": getUserPP(),
    userEmail: currentUser ? JSON.parse(currentUser).userEmail : "",
  };

  const postData = {
    postDataId,
    postHeader: [postHeader],
    replyData: [],
  };

  allData.postData.push(postData);

  addPostToUserData(postData);

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

  // Create a containter for the reply
  const replyContainer = document.createElement("div");
  replyContainer.classList.add("reply-container");

  // Create the reply content
  const replyContentDiv = document.createElement("div");
  replyContentDiv.classList.add("reply-content");

  const replyImage = document.createElement("img");
  replyImage.src = getUserPP();
  replyImage.classList.add("rounded-circle");
  replyImage.classList.add("me-3");
  replyImage.classList.add("shadow-1-strong");
  replyImage.style.width = "60px";
  replyImage.style.height = "60px";

  const nameElement = document.createElement("h3");
  nameElement.textContent = userName;
  nameElement.classList.add("reply-name");
  nameElement.setAttribute(
    "data-userEmail",
    currentUser ? JSON.parse(currentUser).userEmail : ""
  );

  handleMouseEvents(nameElement);

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

  const postContainer = event.target.closest(".post-container");
  const listOfAnswer = postContainer.querySelector(".users_reply__form");
  listOfAnswer.appendChild(replyContainer);

  replyInput.value = "";

  const postId = parseInt(postContainer.getAttribute("data-postId")); //No mover de aquí.Trae el id del post

  let replyId = 0;

  if (Object.entries(allData.postData[postId - 1].replyData) === 0) {
    replyId = 1;
  } else {
    replyId = allData.postData[postId - 1].replyData.length + 1;
  }

  const replyData = {
    replyId,
    postHeaderId: parseInt(postContainer.getAttribute("data-postId")),
    "reply-name": nameElement.textContent,
    "reply-date": replyDate.textContent,
    "reply-text": replyText,
    "reply-pp": getUserPP(),
    userEmail: currentUser ? JSON.parse(currentUser).userEmail : "",
  };

  const postData = allData.postData.find((post) => post.postDataId === postId); //Seleccionando el postData por su id
  postData.replyData.push(replyData);

  addPostToUserData(postData);

  // Save the updated data to local storage
  appendObjectToLocalStorage(allData);
}

// Add an event listener to the "Publicar" button
const addPostButton = document.getElementById("add-post-btn");
addPostButton.addEventListener("click", addPost);

// Add event listener for Enter keypress on the post-input field
const postInput = document.getElementById("post-input");
postInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addPost();
  }
});

/*------------------- Pertinencia de la informacion ----------------------*/

//Funcion para guardar la informacion en Local Storage.
function appendObjectToLocalStorage(allData) {
  const element = allData;
  localStorage.setItem("forum11Posts", JSON.stringify(element));
}

/*------------------------Animacion de los eventos del lado izquierdo------*/

// Lista aparece en orden con a animación
const listItems = document.querySelectorAll(".list-animation");

function showItems() {
  listItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("fade-in");
    }, index * 350);
  });
}

document.addEventListener("DOMContentLoaded", showItems); // DOMContentLoaded = Al cargarse la pagina

/*--------------------Recuperar la inforamacion del local storage---------------*/

document.addEventListener("DOMContentLoaded", () => {
  // Function to retrieve the information from local storage
  function getDataFromLocalStorage() {
    const storedData = localStorage.getItem("forum11Posts");
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
        postImage.src = postHeader["post-header-pp"];
        postImage.classList.add("rounded-circle");
        postImage.classList.add("me-3");
        postImage.classList.add("shadow-1-strong");
        postImage.style.width = "60px";
        postImage.style.height = "60px";

        const nameElement = document.createElement("h3");
        nameElement.textContent = postHeader["post-header-name"];
        nameElement.setAttribute("data-userEmail", postHeader.userEmail);
        nameElement.classList.add("post-name");

        nameElement.addEventListener("mouseenter", function () {
          const temp = this.textContent;
          this.textContent = this.getAttribute("data-userEmail");
          this.setAttribute("data-userEmail", temp);
        });

        nameElement.addEventListener("mouseleave", function () {
          const temp = this.textContent;
          this.textContent = this.getAttribute("data-userEmail");
          this.setAttribute("data-userEmail", temp);
        });

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
      //----------------Se debe crear el users_reply_form dentro del post container aunque no existan replyData----
      const usersReplyForm = document.createElement("div");
      usersReplyForm.classList.add("users_reply__form");
      postContainer.appendChild(usersReplyForm);

      postData.replyData.forEach((replyData) => {
        const replyContainer = document.createElement("div");
        replyContainer.classList.add("reply-container");

        const replyContentDiv = document.createElement("div");
        replyContentDiv.classList.add("reply-content");

        const replyImage = document.createElement("img");
        replyImage.src = replyData["reply-pp"];
        replyImage.classList.add("rounded-circle");
        replyImage.classList.add("me-3");
        replyImage.classList.add("shadow-1-strong");
        replyImage.style.width = "60px";
        replyImage.style.height = "60px";

        const nameElement = document.createElement("h3");
        nameElement.textContent = replyData["reply-name"];
        nameElement.setAttribute("data-userEmail", replyData.userEmail);
        nameElement.classList.add("reply-name");

        nameElement.addEventListener("mouseover", function () {
          this.textContent = this.getAttribute("data-userEmail");
        });

        nameElement.addEventListener("mouseout", function () {
          this.textContent = replyData["reply-name"];
        });

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
        usersReplyForm.appendChild(replyContainer);
      });

      const replyForm = document.createElement("div");
      replyForm.classList.add("reply__form");

      const replyInput = document.createElement("input");
      replyInput.type = "text";
      replyInput.placeholder = "¡Comenta algo!";
      replyForm.appendChild(replyInput);

      const replyButton = document.createElement("button");
      replyButton.classList.add("reply-btn");
      replyButton.textContent = "Comenta";
      replyButton.addEventListener("click", addReply);
      replyForm.appendChild(replyButton);
      postContainer.appendChild(replyForm);
      wallContainer.prepend(postContainer);
    });
  }

  // Fetch data from local storage and populate the wall__container
  const storedData = getDataFromLocalStorage();
  if (storedData) {
    allData = storedData;
    populateWallContainer(storedData);
  }
});
