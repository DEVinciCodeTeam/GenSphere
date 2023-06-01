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

  // Check if the message is empty
  if (messageText === "") {
    return; // Exit the function without sending the message
  }

  // Clear the message input
  messageInput.value = "";

  // Get the sender's name from sessionStorage
  const senderName = sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser")).userName
    : "Unknown Sender";

  // Create a new message object
  const newMessage = {
    content: messageText,
    time: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    sender: senderName,
  };

  // Add the message to the active chat item's messages array
  const activeChat = getActiveChatItem();
  // Retrieve the chat messages for the active chat item from local storage
  const storedMessages =
    JSON.parse(localStorage.getItem(activeChat.name)) || [];

  // Append the new message to the existing messages array
  storedMessages.push(newMessage);

  // Store the updated messages in local storage
  localStorage.setItem(activeChat.name, JSON.stringify(storedMessages));

  // Create a new chat message element for the user's message
  const userMessage = createChatMessageHTML(newMessage, true);

  // Append the user's message to the chat container
  container.querySelector("ul").appendChild(userMessage);

  // Scroll to the last message in the chat container
  userMessage.scrollIntoView({ behavior: "smooth", block: "end" });
});

// Add event listener for the Enter key press in the message input field
messageInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the message text from the textarea
    const messageText = messageInput.value.trim();

    // Check if the message is empty
    if (messageText === "") {
      return; // Exit the function without sending the message
    }

    // Clear the message input
    messageInput.value = "";

    // Get the sender's name from sessionStorage
    const senderName = sessionStorage.getItem("currentUser")
      ? JSON.parse(sessionStorage.getItem("currentUser")).userName
      : "Unknown Sender";

    // Create a new message object
    const newMessage = {
      content: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      sender: senderName,
    };
    // Add the message to the active chat item's messages array
    const activeChat = getActiveChatItem();
    // Retrieve the chat messages for the active chat item from local storage
    const storedMessages =
      JSON.parse(localStorage.getItem(activeChat.name)) || [];

    // Append the new message to the existing messages array
    storedMessages.push(newMessage);

    // Store the updated messages in local storage
    localStorage.setItem(activeChat.name, JSON.stringify(storedMessages));

    // Create a new chat message element for the user's message
    const userMessage = createChatMessageHTML(newMessage, true);

    // Append the user's message to the chat container
    container.querySelector("ul").appendChild(userMessage);

    // Scroll to the last message in the chat container
    userMessage.scrollIntoView({ behavior: "smooth", block: "end" });
  }
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
let chatItems = [];

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

function initializeChatItems() {
  // Retrieve the chat items from local storage
  const storedChatItems = JSON.parse(localStorage.getItem("chatItems")) || [];

  // Assign the retrieved chat items to the chatItems variable
  chatItems = storedChatItems;

  // Loop through the stored chat items and render them
  storedChatItems.forEach(function (item) {
    const chatItem = createChatItemHTML(item);
    chatList.prepend(chatItem);

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
}
initializeChatItems();

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

  // If the user object exists
  if (user) {
    // Get the user's name
    const userName = user.userName;

    // Check if the chat already exists in the local storage
    const existingChat = JSON.parse(localStorage.getItem(userName));

    if (existingChat) {
      console.log(`Chat with "${userName}" already exists.`);
      return;
    }

    //Get the first name from the user's name
    const firstName = userName.trim().split(" ")[0].toLowerCase();

    // Create a new chat item for the user
    const newChatItem = {
      name: userName,
      imageSrc: `../assets/img/integrantes/${firstName}.jpg`, // Generate the image source based on the first name
      messages: [],
    };

    // Add the new chat item to the chatItems array
    chatItems.push(newChatItem);

    // Store the updated chatItems array in the local storage
    localStorage.setItem("chatItems", JSON.stringify(chatItems));

    // Store the empty messages array for the new chat item in the local storage
    localStorage.setItem(userName, JSON.stringify([]));

    // Create a new chat item element for the user
    const newChatItemElement = createChatItemHTML(newChatItem);

    // Prepend the new chat item element to the chat list
    chatList.prepend(newChatItemElement);

    // Add event listener to the new chat item
    newChatItemElement.addEventListener("click", function () {
      // Remove the "active" class from all chat items
      const activeItems = document.querySelectorAll(".list-group-item.active");
      activeItems.forEach(function (item) {
        item.classList.remove("active");
      });

      // Add the "active" class to the clicked chat item
      newChatItemElement.classList.add("active");

      // Show the message input and send button
      messageInput.style.display = "block";
      sendMessageBtn.style.display = "block";

      // Retrieve the chat messages for the clicked chat item from the local storage
      const messages = localStorage.getItem(userName);

      if (messages) {
        // Parse the stored messages if they exist
        chatMessages[userName] = JSON.parse(messages);
      } else {
        // If no messages are stored, initialize an empty array
        chatMessages[userName] = [];
      }

      // Clear the chat messages container
      const chatMessagesContainer = container.querySelector("ul");
      chatMessagesContainer.innerHTML = "";

      // Render the chat messages in the chat messages container
      chatMessages[userName].forEach(function (message) {
        const isUserMessage = message.sender === "Mayra"; // Check if the message is sent by "Mayra"
        const messageElement = createChatMessageHTML(message, isUserMessage);
        chatMessagesContainer.appendChild(messageElement);
      });

      // Scroll to the bottom of the chat messages container
      container.scrollTo(0, container.scrollHeight);
    });

    console.log(`Chat with "${userName}" created successfully.`);
  } else {
    console.log(`User with email "${userEmail}" not found.`);
  }
}

// Example usage
addUser();

//comentario
