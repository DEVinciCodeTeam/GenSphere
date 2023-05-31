function addUser() {
  // Function to get user email
  function getUserEmail() {
    const inputEmail = document.getElementById("findUserWithEmail").value;
    console.log(inputEmail);
    return inputEmail;
  }

  // Get user email and retrieve user data
  const userEmail = getUserEmail();
  const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  const user = allUsers[userEmail];

  // Get username
  const userName = user.userName;
  console.log(userName);

  // Check if the chat already exists
  const existingListItem = document.querySelector(`#chatList [data-username="${userName}"]`);
  if (existingListItem) {
    console.log(`Your chat with "${userName}" already exists.`);
    return;
  }

  // Retrieve existing chat messages for the user, if any
  const existingChatItem = JSON.parse(localStorage.getItem(userName));
  const messages = existingChatItem ? existingChatItem.messages : [];

  // Create a new chat item
  const newChatItem = {
    name: userName,
    imageSrc: user.imageSrc,
    messages: messages,
  };

  // Save the new chat item in local storage
  localStorage.setItem(userName, JSON.stringify(newChatItem));

  // Generate LI
  const newListItem = document.createElement("li");
  newListItem.className = "p-2 border-bottom";

  // Create new chat user HTML
  const newChatUser = `
    <div class="d-flex justify-content-between" onclick="getUserChat('${userName}')">
      <!-- Chat item content -->
    </div>
  `;

  // Create a new chat item
  const newChatItemElement = createChatItemHTML(newChatItem);

  newListItem.innerHTML = newChatUser;

  // Add event listener to the new chat item
  newChatItemElement.addEventListener("click", function () {
    getUserChat(userName);
  });

  const chatList = document.getElementById("chatList");

  // Prepend the new chat item
  chatList.insertBefore(newChatItemElement, chatList.firstChild);
}
