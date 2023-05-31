// Get the necessary elements
const container = document.getElementById("chatContainer");
const sendMessageBtn = document.getElementById("sendMessageBtn");
const chatList = document.getElementById("chatList");

// Add event listener to the send message button
sendMessageBtn.addEventListener("click", function () {
  // Get the message text from the textarea
  const messageInput = document.getElementById("textAreaExample2");
  const messageText = messageInput.value.trim();

  // Clear the message input
  messageInput.value = "";

  // Find the active chat item
  const activeChatItem = document.querySelector(".list-group-item.active");

  if (activeChatItem) {
    // Find the active chat item in the chatItems array
    const activeChat = chatItems.find(function (item) {
      return item.name === activeChatItem.querySelector("p").textContent;
    });

    // Create a new message object
    const newMessage = {
      content: messageText,
      time: new Date().toLocaleTimeString(),
    };

    // Add the message to the active chat item's messages array
    activeChat.messages.push(newMessage);

    // Store the updated messages in local storage
    localStorage.setItem(activeChat.name, JSON.stringify(activeChat.messages));

    // Create a new chat message element for the user's message
    const userMessage = createChatMessageHTML(
      newMessage,
      activeChat.name,
      true
    );

    // Append the user's message to the chat container
    container.querySelector("ul").appendChild(userMessage);

    // Scroll to the last message in the chat container
    userMessage.scrollIntoView({ behavior: "smooth", block: "end" });
  }
});

// Function to create a new chat message element
function createChatMessageHTML(message, sender, isActive) {
  const li = document.createElement("li");
  li.className = `list-group-item d-flex justify-content-between align-items-start mb-2 ${isActive ? "active" : ""}`;
  li.innerHTML = `
    <div class="ms-2 ${isActive ? "justify-content-end" : "justify-content-start"}">
      <p class="fw-bold mb-1">${sender}</p>
      <p class="mb-1">${message.content}</p>
    </div>
    <span class="badge bg-primary rounded-pill">${message.time}</span>
  `;
  return li;
}

// Example chat initialization
const chatItems = [
  { name: "Erick uwu", imageSrc: "../assets/img/integrantes/erick.jpg", messages: [] },
  { name: "Nico", imageSrc: "../assets/img/integrantes/nico.jpg", messages: [] },
  { name: "Gaby", imageSrc: "../assets/img/integrantes/gaby.jpg", messages: [] },
  { name: "Mariana", imageSrc: "../assets/img/integrantes/mariana.jpg", messages: [] },
];

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

    // Retrieve the chat messages for the clicked chat item from the local storage
    const messages = localStorage.getItem(item.name);

    if (messages) {
      // Parse the stored messages if they exist
      item.messages = JSON.parse(messages);
    } else {
      // If no messages are stored, initialize the messages array
      item.messages = [];
    }

    // Clear the chat messages container
    const chatMessagesContainer = container.querySelector("ul");
    chatMessagesContainer.innerHTML = "";

    // Render the chat messages in the chat messages container
    item.messages.forEach(function (message, index) {
      const isActive = index === 0; // Assume the first message is active by default
      const messageElement = createChatMessageHTML(
        message,
        item.name,
        isActive
      );
      chatMessagesContainer.appendChild(messageElement);
    });

    // Scroll to the bottom of the chat messages container
    container.scrollTo(0, container.scrollHeight);
  });
});

// Function to create a chat item element
function createChatItemHTML(item) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-start align-items-center";
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
