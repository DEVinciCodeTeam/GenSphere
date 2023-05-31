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

  // Create a new chat message element for the user's message
  const userMessage = createMessageElement(
    "Mayra",
    messageText,
    "justify-content-end"
  );

  // Append the user's message to the chat container
  container.querySelector("ul").appendChild(userMessage);

  // Generate a random response for Gaby
  const randomResponse = generateRandomResponse();

  // Simulate a delay before sending Gaby's response
  setTimeout(() => {
    // Create a new chat message element for Gaby's response
    const chatMessage = createMessageElement(
      "Gaby",
      randomResponse,
      "justify-content-start"
    );

    // Append Gaby's response to the chat container
    container.querySelector("ul").appendChild(gabyMessage);

    // Scroll to the last message in the chat container
    gabyMessage.scrollIntoView({ behavior: "smooth", block: "end" });
  }, 1000); // Change the delay time as needed
});

// Function to create a new chat message element
function createMessageElement(author, text, justification) {
  const message = document.createElement("li");
  message.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "mb-2",
    "bg-light"
  );

  // Create a div for the message content
  const messageContent = document.createElement("div");
  messageContent.classList.add("ms-2", justification);

  // Create a paragraph for the message author
  const messageAuthor = document.createElement("p");
  messageAuthor.classList.add("fw-bold", "mb-1");
  messageAuthor.textContent = author;

  // Create a paragraph for the message text
  const messageText = document.createElement("p");
  messageText.classList.add("mb-1");
  messageText.textContent = text;

  // Append the author and text paragraphs to the message content div
  messageContent.appendChild(messageAuthor);
  messageContent.appendChild(messageText);

  // Append the message content to the message element
  message.appendChild(messageContent);

  return message;
}

// Function to generate a random response for Gaby
function generateRandomResponse() {
  const responses = ["😀", "🥶", "🤖", "👻", "🧐"];

  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// Example chat initialization
const chatMessages = [
  {
    sender: "Mayra",
    content: "Hola",
    imageSrc: "../assets/img/integrantes/Mario.jpeg",
    time: "Hace 2 días",
  },
  // Add more message objects as needed
];

chatMessages.forEach((message) => {
  const messageHTML = createChatMessageHTML(message);
  chatList.appendChild(messageHTML);
});

function createChatMessageHTML(message) {
  const li = document.createElement("li");
  li.className = "p-2";

  const a = document.createElement("a");
  a.href = "#!";
  a.className = "d-flex justify-content-between";

  const userContainer = document.createElement("div");
  userContainer.className = "d-flex flex-row";

  const userImage = document.createElement("img");
  userImage.src = message.imageSrc;
  userImage.alt = "avatar";
  userImage.className =
    "rounded-circle d-flex align-self-center me-3 shadow-1-strong";
  userImage.width = "60";

  const userInfo = document.createElement("div");
  userInfo.className = "pt-1";

  const userName = document.createElement("p");
  userName.className = "fw-bold mb-0";
  userName.textContent = message.sender;

  const userMessage = document.createElement("p");
  userMessage.className = "small text-muted";
  userMessage.textContent = message.content;

  const timeInfo = document.createElement("div");
  timeInfo.className = "pt-1";

  const timeText = document.createElement("p");
  timeText.className = "small text-muted mb-1 inbox-time-custom";
  timeText.textContent = message.time;

  userInfo.appendChild(userName);
  userInfo.appendChild(userMessage);

  userContainer.appendChild(userImage);
  userContainer.appendChild(userInfo);

  timeInfo.appendChild(timeText);

  a.appendChild(userContainer);
  a.appendChild(timeInfo);

  li.appendChild(a);

  // Add a click event listener to the message element
  li.addEventListener("click", function () {
    // Handle click event for the message
    // You can perform any desired action here, such as displaying a reply form
    console.log(`Clicked on message: ${message.content}`);
  });

  return li;
}
