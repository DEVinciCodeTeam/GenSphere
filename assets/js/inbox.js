// Get the necessary elements
const container = document.getElementById("chatContainer");
const sendMessageBtn = document.getElementById("sendMessageBtn");

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
    const gabyMessage = createMessageElement(
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
  message.classList.add("d-flex", justification, "mb-4");

  message.innerHTML = `
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center p-8">
        <img src="../assets/img/integrantes/${author.toLowerCase()}.jpg" alt="avatar" class="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="30" />
        <p class="fw-bold mb-0">${author}</p>
        <p class="text-muted small mb-0 time-chat-custom">Ahora</p>
      </div>
      <div class="card-body">
        <p class="mb-0">${text}</p>
      </div>
    </div>
  `;

  return message;
}

// Function to generate a random response
function generateRandomResponse() {
  const responses = ["😀", "🥶", "🤖", "👻", "🧐"];

  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

const chatLink = document.getElementById("chatLink");

// Función para que solo el link de chat sea clickeable en mobile

function toggleLinkClickability() {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    chatLink.setAttribute("href", "./chat-mobile.html");
  } else {
    chatLink.removeAttribute("href");
  }
}

// Toggle link clickability on page load
toggleLinkClickability();

// Toggle link clickability on window resize
window.addEventListener("resize", toggleLinkClickability);
