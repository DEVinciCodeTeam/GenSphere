// In this file we grouped all the common functions used within the project
/*-------------- Reading elements ----------------*/
function changeHtmlElementsPropById(id, value, prop, testvalue = "none") {
  const element = document.getElementById(id);
  if (testvalue == "none") {
    if (element != null && value != undefined) {
      element[prop] = value;
    }
  } else {
    // if (element[prop] != testvalue) {

    if (element != null && value != undefined && element[prop] != testvalue) {
      element[prop] = value;
    } else if (value != undefined && element != null) {
      element[prop] = value;
    }
    // }
  }
}

function changeHtmlElementsPropByClass(clase, value, prop) {
  const element = document.getElementsByClassName(clase)
  if (element != null) {
    for (const subElement of element) {
      subElement[prop] = value;
    }
  }
}

function updateStorageObject(location, nameInLocation, newObjectVersion) {
  if (location == "local") {
    localStorage.setItem(nameInLocation, JSON.stringify(newObjectVersion));
  } else {
    sessionStorage.setItem(nameInLocation, JSON.stringify(newObjectVersion));
  }
}
const removeMessage = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "none";
}
const restoreMessage = (elementId) => {
  const buttonRef = document.getElementById(elementId);
  buttonRef.style.display = "inline";
}

function saveElementsOnObject(id, prop, objectToUpdate) {
  console.log("entro a la funcion")
  const element = document.getElementById(id).value.trim();

  if (element != null && objectToUpdate != "undefined") {
    console.log(objectToUpdate + " " + prop + " " + element)

    objectToUpdate[prop] = element;
    console.log("Entro al if de la funcion")
  }
}

function addPostToUserData(postData) {
  temporalCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  postData.postHeader[0]["post-header-replies"] = postData.replyData.length;
  temporalCurrentUser.userPosts.unshift(postData.postHeader[0]);
  sessionStorage.setItem("currentUser", JSON.stringify(temporalCurrentUser));

  tempAllUsers = JSON.parse(localStorage.getItem("allUsers"));
  tempAllUsers[temporalCurrentUser.userEmail] = temporalCurrentUser;
  localStorage.setItem("allUsers", JSON.stringify(tempAllUsers));
}

const convertStringToHTML = htmlString => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');

  return html.body;
}

function generateCardPost(userName, text, date, numRespuestas) {
  return `<div class="col-12 col-md-6 my-3 userPosts">
          <div class="blog_post">
            <div class="row" style="padding: 10px 0px;">
              <div class="col-3 my-3">
                <div class="img_pod2">
                  <img class="user-post-img"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                    alt="random image">
                </div>
              </div>
              <div class="col-7 my-2" style="padding: 0px 23px;">
                <h1 class="user-post-title">${userName}</h1>
                <h3 class="post-date">${date}</h3>
              </div>
              <div class="col-2">
                <i class="bi bi-bookmark" style="font-size: 20px;"></i>
              </div>
            </div>
            <div class="container_copy">
              <div class="row">
                <div class="col-12">
                  <p id="post-content">${text}</p>
                </div>
              </div>
              <div class="row justify-content-center">
                <div class="col-12" style="padding: 0px;">
                  <button type="button" class="btn btn-primary" id="btn_primary">${numRespuestas} respuestas</button>
                </div>
              </div>
            </div>
          </div>
        </div>`
}

function placeCard(userName, text, date, numRespuestas) {
  const currentPosts = document.getElementsByClassName("userPosts");

  const numOfCurrentPosts = currentPosts.length;
  let whereToPlaceCard;

  if (numOfCurrentPosts / 2 % 1 == 0) {
    whereToPlaceCard = (numOfCurrentPosts / 2)
  } else {
    whereToPlaceCard = Math.floor(numOfCurrentPosts / 2)
  }
  console.log(whereToPlaceCard)
  // const cardToAdd = convertStringToHTML(generateCardPost(userName, text, date, numRespuestas));
  // document.getElementsByClassName(`cardsRow ${whereToPlaceCard}`)[0].appendChild(cardToAdd);
  document.getElementsByClassName(`cardsRow ${whereToPlaceCard}`)[0].innerHTML += generateCardPost(userName, text, date, numRespuestas);
}

function visualizeUserPosts() {
  if (!document.location.pathname.includes("perfilEditable")) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const userPosts = currentUser.userPosts;
    const approvedPostsText = [];
    const approvedPosts = [];
    for (let i = 0; i < userPosts.length; i++) {
      const post = userPosts[i]
      if (!approvedPostsText.includes(post["post-header-text"])) {
        approvedPostsText.push(post["post-header-text"])
        approvedPosts.push(post)
        placeCard(post["post-header-name"], post["post-header-text"], post["post-header-date"], post["post-header-replies"])
      }
      if (approvedPosts.length == 10) {
        break;
      }
    }
    currentUser.userPosts = approvedPosts;
    updateStorageObject('session', 'currentUser', currentUser)
    const allUsers = JSON.parse(localStorage.getItem("allUsers"));
    allUsers[currentUser.userEmail] = currentUser;
    updateStorageObject('local', 'allData', allUsers)
  }
}

 // exporta la función previamente declarada
/* export { changeHtmlElementsPropById, changeHtmlElementsPropByClass, updateStorageObject, removeMessage, restoreMessage, saveElementsOnObject}; */
