const allData = { id: "Semana2", postData: [] };

let postDataIdCounter = 1;
let postHeaderIdCounter = 1;
let postReplyIdCounter = 1;

// Función para manejar el evento de clic en el botón "Agregar publicación"
function addPost() {
  const postInput = document.getElementById("post-input").value.trim();

  if (postInput === "") {
    alert("Favor de publicar algo.");
    return;
  }

  const postHeaderId = postHeaderIdCounter++;

  const postHeader = {
    postHeaderId,
    "post-header-name": "John Doe",
    "post-header-date": new Date().toLocaleDateString(),
    "post-header-text": postInput,
    replyData: [],
  };

  const postData = {
    postDataId: postDataIdCounter++,
    postHeader,
  };

  allData.postData.push(postData);

  //Guardar en Local Storage
  appendObjectToLocalStorage(allData);

  renderPosts();
  clearInput();
}

function addReply(event) {
  const replyInput = event.target.parentNode.querySelector("input[type='text']");
  const replyText = replyInput.value.trim();

  if (replyText === "") {
    alert("Por favor comenta algo.");
    return;
  }

  const postContainer = event.target.parentNode.parentNode;
  const postHeaderId = postContainer.getAttribute("data-postId");

  const replyData = {
    replyId: postReplyIdCounter++,
    "reply-name": "Jane Doe",
    "reply-date": new Date().toLocaleDateString(),
    "reply-text": replyText,
  };

  const postData = allData.postData.find((data) => data.postHeader.postHeaderId === Number(postHeaderId));
  postData.postHeader.replyData.push(replyData);

  //Guardar en Local Storage
  appendObjectToLocalStorage(allData);

  renderReplies(postContainer, postData);

  replyInput.value = "";
}

function renderReplies(postContainer, postData) {
  const listOfAnswer = postContainer.querySelector(".users_reply__form");
  listOfAnswer.innerHTML = "";
}
  postData.postHeader.replyData.forEach(replyData) =>
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
    replyTextElement.textContent = replyData["reply"]