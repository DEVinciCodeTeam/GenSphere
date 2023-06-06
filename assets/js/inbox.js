// Get the necessary elements
const container = document.getElementById("chatContainer");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const chatList = document.getElementById("chatList");
const messageInput = document.getElementById("textAreaExample2");

// Hide the message input and send button initially
messageInput.style.display = "none";
sendMessageBtn.style.display = "none";

let chatItems = JSON.parse(localStorage.getItem(getChatItemsKey())) || [];

function getChatItemsKey() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return currentUser ? currentUser.userEmail + "_chatItems" : "chatItems";
}

function getActiveChatItem() {
  const activeChatItem = document.querySelector(".list-group-item.active");
  if (activeChatItem) {
    const activeUserName = activeChatItem.querySelector("p").textContent;
    return chatItems.find((chatItem) => chatItem.name === activeUserName);
  }
  return null;
}

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

function handleSendMessage() {
  const messageText = messageInput.value.trim();
  if (messageText === "") {
    return;
  }
  messageInput.value = "";
  const senderName = sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser")).userName
    : "Unknown Sender";
  const newMessage = {
    content: messageText,
    time: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    sender: senderName,
  };
  const activeChat = getActiveChatItem();
  if (activeChat) {
    activeChat.messages.push(newMessage);
  }
  localStorage.setItem(getChatItemsKey(), JSON.stringify(chatItems));
  const userMessage = createChatMessageHTML(newMessage, true);
  container.querySelector("ul").appendChild(userMessage);
  userMessage.scrollIntoView({ behavior: "smooth", block: "end" });
  localStorage.setItem(getChatItemsKey(), JSON.stringify(chatItems));
}

sendMessageBtn.addEventListener("click", handleSendMessage);
messageInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSendMessage();
  }
});

chatItems.forEach((item) => {
  const chatItem = createChatItemHTML(item);
  chatList.appendChild(chatItem);
  chatItem.addEventListener("click", function () {
    document.querySelectorAll(".list-group-item.active").forEach((item) => {
      item.classList.remove("active");
    });
    chatItem.classList.add("active");
    messageInput.style.display = "block";
    sendMessageBtn.style.display = "block";
    const chatMessagesContainer = container.querySelector("ul");
    chatMessagesContainer.innerHTML = "";
    item.messages.forEach((message) => {
      const isUserMessage =
        message.sender ===
        (sessionStorage.getItem("currentUser")
          ? JSON.parse(sessionStorage.getItem("currentUser")).userName
          : "Unknown Sender");
      const chatMessage = createChatMessageHTML(message, isUserMessage);
      chatMessagesContainer.appendChild(chatMessage);
      chatMessage.scrollIntoView({ behavior: "smooth", block: "end" });
    });
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

function initializeChatItems() {
  // Retrieve the chat items from local storage
  const storedChatItems = JSON.parse(localStorage.getItem("chatItems")) || [];

  // Assign the retrieved chat items to the chatItems variable
  chatItems = storedChatItems;

  // Loop through the stored chat items and render them
  storedChatItems.forEach(function (item) {
    const chatItem = createChatItemHTML(item);
    chatList.appendChild(chatItem);

    // Add event listener to each chat item
    chatItem.addEventListener("click", chatItemClickHandler);
  });
}

function addUser() {
  // Function to get the user's email from the input field
  function getUserEmail() {
    const inputEmail = document.getElementById("findUserWithEmail").value;
    return inputEmail;
  }

  // Get the user's email and retrieve the user object from local storage
  const userEmail = getUserEmail();
  const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  const user = allUsers[userEmail];

  // Retrieve the current user's email from sessionStorage
  const currentUserEmail = sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser")).userEmail
    : "";

  // Check if the user is the same as the current user
  if (user && user.userEmail === currentUserEmail) {
    console.log("You cannot add yourself as a user.");
    return;
  }

  // If the user object exists
  if (user) {
    // Get the user's name
    const userName = user.userName;

    // Check if the chat already exists in the local storage
    const existingChat = chatItems.find((item) => item.name === userName);

    if (existingChat) {
      console.log(`Chat with "${userName}" already exists.`);
      return;
    }

    // Get the user's profile picture
    const userProfilePicture = user.userProfilePicture;

    // Create a new chat item for the user
    const newChatItem = {
      name: userName,
      imageSrc: userProfilePicture,
      messages: [],
    };

    // Add the new chat item to the chatItems array
    chatItems.unshift(newChatItem);

    // Store the updated chatItems array in the local storage
    localStorage.setItem(getChatItemsKey(), JSON.stringify(chatItems));

    // Create a new chat item element for the user
    const newChatItemElement = createChatItemHTML(newChatItem);

    // Prepend the new chat item element to the chat list
    chatList.prepend(newChatItemElement);

    // Add event listener to the new chat item
    newChatItemElement.addEventListener("click", function () {
      document.querySelectorAll(".list-group-item.active").forEach((item) => {
        item.classList.remove("active");
      });
      newChatItemElement.classList.add("active");
      messageInput.style.display = "block";
      sendMessageBtn.style.display = "block";
      const chatMessagesContainer = container.querySelector("ul");
      chatMessagesContainer.innerHTML = "";
      newChatItem.messages.forEach((message) => {
        const isUserMessage =
          message.sender ===
          (sessionStorage.getItem("currentUser")
            ? JSON.parse(sessionStorage.getItem("currentUser")).userName
            : "Unknown Sender");
        const chatMessage = createChatMessageHTML(message, isUserMessage);
        chatMessagesContainer.appendChild(chatMessage);
        chatMessage.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    });

    // Trigger the click event to simulate the initial selection of the new chat item
    newChatItemElement.click();

    console.log(`User "${userName}" added successfully.`);
  }
}

addUser();
