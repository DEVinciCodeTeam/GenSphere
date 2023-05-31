// Get the necessary elements
const container = document.getElementById("chatContainer");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const chatList = document.getElementById("chatList");
const messageInput = document.getElementById("textAreaExample2");

// Hide the message input and send button initially
messageInput.style.display = "none";
sendMessageBtn.style.display = "none";

// Add event listener to the send message button
sendMessageBtn.addEventListener("click", function () {
  // Get the message text from the textarea
  const messageText = messageInput.value.trim();

  // Clear the message input
  messageInput.value = "";

  // Create a new message object
  const newMessage = {
    content: messageText,
    time: new Date().toLocaleTimeString(),
    sender: "Mayra", // Set the sender as "Mayra"
  };

  // Add the message to the active chat item's messages array
  const activeChat = getActiveChatItem();
  activeChat.messages.push(newMessage);

  // Store the updated messages in local storage
  localStorage.setItem(activeChat.name, JSON.stringify(activeChat.messages));

  // Create a new chat message element for the user's message
  const userMessage = createChatMessageHTML(newMessage, true);

  // Append the user's message to the chat container
  container.querySelector("ul").appendChild(userMessage);

  // Scroll to the last message in the chat container
  userMessage.scrollIntoView({ behavior: "smooth", block: "end" });
});

// Function to get the active chat item
function getActiveChatItem() {
  // Find the active chat item
  const activeChatItem = document.querySelector(".list-group-item.active");

  if (activeChatItem) {
    // Find the active chat item in the chatItems array
    return chatItems.find(function (item) {
      return item.name === activeChatItem.querySelector("p").textContent;
    });
  }

  return null;
}

// Function to create a new chat message element
function createChatMessageHTML(message, isUserMessage) {
  const li = document.createElement("li");
  li.className = `list-group-item d-flex justify-content-between align-items-start mb-2 ${
    isUserMessage ? "" : "justify-content-start"
  }`;
  li.innerHTML = `
    <div class="ms-2 ${isUserMessage ? "text-start" : "text-start"}">
      <p class="fw-bold mb-1">${message.sender}</p>
      <p class="mb-1">${message.content}</p>
    </div>
    <span class="badge bg-primary rounded-pill">${message.time}</span>
  `;
  return li;
}

// Example chat initialization
const chatItems = [
  {
    name: "Erick uwu",
    imageSrc: "../assets/img/integrantes/erick.jpg",
    messages: [],
  },
  {
    name: "Nico",
    imageSrc: "../assets/img/integrantes/nico.jpg",
    messages: [],
  },
  {
    name: "Gaby",
    imageSrc: "../assets/img/integrantes/gaby.jpg",
    messages: [],
  },
  {
    name: "Mariana",
    imageSrc: "../assets/img/integrantes/mariana.jpg",
    messages: [],
  },
];

// Initialize an object to store the chat messages for each chat item
const chatMessages = {};

// Create a chat item for each member
chatItems.forEach(function (item) {
  const chatItem = createChatItemHTML(item);
  chatList.appendChild(chatItem);

  // Add event listener to each chat item
  chatItem.addEventListener("click", function () {
    // Remove the "active" class from all chat items
    const activeItems = document.querySelectorAll(".list-group-item.active");
    activeItems.forEach(function (item) {
      item.classList.remove("active");
    });

    // Add the "active" class to the clicked chat item
    chatItem.classList.add("active");

    // Show the message input and send button
    messageInput.style.display = "block";
    sendMessageBtn.style.display = "block";

    // Retrieve the chat messages for the clicked chat item from the local storage
    const messages = localStorage.getItem(item.name);

    if (messages) {
      // Parse the stored messages if they exist
      chatMessages[item.name] = JSON.parse(messages);
    } else {
      // If no messages are stored, initialize an empty array
      chatMessages[item.name] = [];
    }

    // Clear the chat messages container
    const chatMessagesContainer = container.querySelector("ul");
    chatMessagesContainer.innerHTML = "";

    // Render the chat messages in the chat messages container
    chatMessages[item.name].forEach(function (message) {
      const isUserMessage = message.sender === "Mayra"; // Check if the message is sent by "Mayra"
      const messageElement = createChatMessageHTML(message, isUserMessage);
      chatMessagesContainer.appendChild(messageElement);
    });

    // Scroll to the bottom of the chat messages container
    container.scrollTo(0, container.scrollHeight);
  });
});

// Function to create a chat item element
function createChatItemHTML(item) {
  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-start align-items-center";
  li.innerHTML = `
    <img
      src="${item.imageSrc}"
      alt="avatar"
      class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
      width="70"
      height="70"
    />
    <p class="fw-bold mb-0">${item.name}</p>
  `;
  return li;
}

function addUser() {
  // Funcion para buscar allUsers con email
  function getUserEmail() {
    const inputEmail = document.getElementById("findUserWithEmail").value;
    console.log(inputEmail);
    return inputEmail;
  }

  // Buscar Email + Nombre
  const userEmail = getUserEmail();
  const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  const user = allUsers[userEmail];

  // Guardar valor del nombre
  const userName = user.userName;
  console.log(userName);

  // Checa si ya existe el chat
  const existingListItem = document.querySelector(
    `#chatList [data-username="${userName}"]`
  );
  if (existingListItem) {
    console.log(`Su chat con "${userName}" ya existe.`);
    return;
  }

  // Generar LI
  const newListItem = document.createElement("li");
  newListItem.className = "p-2 border-bottom";

  // Crear nuevo LI
  const newChatUser = `
<div class="d-flex justify-content-between" onclick="getUserChat()">
  <div class="d-flex flex-row">
    <img
      src="../assets/img/integrantes/gaby.jpg"
      alt="avatar"
      class="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
      width="60"
      height="60"
    />
    <div class="pt-1" style="margin-top: .9rem; margin-bottom: 0.5rem;">
      <p class="fw-bold mb-0" data-username="${userName}">${userName}</p>
    </div>
  </div>
</div>

  `;

  newListItem.innerHTML = newChatUser;

  const chatList = document.getElementById("chatList");

  // Prepend the new list item
  chatList.insertBefore(newListItem, chatList.firstChild);
}
