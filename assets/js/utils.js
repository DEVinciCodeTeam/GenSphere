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

function addPostToUserData(type, postData) {
  tempAllUsers = JSON.parse(localStorage.getItem("allUsers"));
  temporalCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  postData.postHeader[0]["post-header-replies"] = postData.replyData.length;

  if (type === 'post') {
    console.log("Entra al if")
    temporalCurrentUser.userPosts.unshift(postData.postHeader[0]);

    sessionStorage.setItem("currentUser", JSON.stringify(temporalCurrentUser));

    tempAllUsers[temporalCurrentUser.userEmail] = temporalCurrentUser;

    localStorage.setItem("allUsers", JSON.stringify(tempAllUsers));
  } else {
    temporalCurrentUser.userReplies.unshift(postData.postHeader[0]);
    tempAllUsers[temporalCurrentUser.userEmail].userReplies.unshift(postData.postHeader[0]);
    tempAllUsers[postData.postHeader[0]['post-header-userEmail']].userPosts.unshift(postData.postHeader[0]);

    sessionStorage.setItem("currentUser", JSON.stringify(temporalCurrentUser));
    localStorage.setItem("allUsers", JSON.stringify(tempAllUsers));
  }

}

const convertStringToHTML = htmlString => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');

  return html.body;
}

function generateCardPost(userName, userPP, text, date, numRespuestas, type = "userPosts") {
  return `<div class="col-12 col-md-6 my-3 ${type}">
          <div class="blog_post">
            <div class="row" style="padding: 10px 0px;">
              <div class="col-3 my-3">
                <div class="img_pod2">
                  <img class="user-post-img"
                    src="${userPP}"
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



function placeCard(userName, userPP, text, date, numRespuestas, type) {
  const currentPosts = document.getElementsByClassName(type);

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
  if (type === "userPosts") {
    document.getElementsByClassName(`cardsRow ${whereToPlaceCard}`)[0].innerHTML += generateCardPost(userName, userPP, text, date, numRespuestas);
  } else {
    console.log(document.getElementsByClassName(`cardsRowC ${whereToPlaceCard}`))
    console.log(whereToPlaceCard)
    document.getElementsByClassName(`cardsRowC ${whereToPlaceCard}`)[0].innerHTML += generateCardPost(userName, userPP, text, date, numRespuestas);
  }
}

function visualizeUserPosts() {
  if (!document.location.pathname.includes("perfileditable")) {
    let allUsers = JSON.parse(localStorage.getItem("allUsers"));
    let currentUser;
    if (document.location.pathname.includes("perfilexterno")) {
      const identifiedPerson = JSON.parse(sessionStorage.getItem("identifiedPerson"));
      currentUser = allUsers[identifiedPerson.userEmail];
    } else {
      const identifiedPerson = JSON.parse(sessionStorage.getItem("currentUser"));
      currentUser = allUsers[identifiedPerson.userEmail];
    }
    const userPosts = currentUser.userPosts;
    const approvedPostsText = [];
    const approvedPosts = [];
    for (let i = 0; i < userPosts.length; i++) {
      const post = userPosts[i]
      if (!approvedPostsText.includes(post["post-header-text"])) {
        approvedPostsText.push(post["post-header-text"])
        approvedPosts.push(post)
        console.log([post])
        placeCard(post["post-header-name"], post["post-header-pp"], post["post-header-text"], post["post-header-date"], post["post-header-replies"], "userPosts")
      }
      if (approvedPosts.length == 10) {
        break;
      }
    }
    allUsers[currentUser.userEmail].userPosts = approvedPosts;
    updateStorageObject('local', 'allUsers', allUsers)

  }
}

function visualizeCommentedPosts() {
  if (!document.location.pathname.includes("perfileditable")) {
    let allUsers = JSON.parse(localStorage.getItem("allUsers"));
    let currentUser;
    if (document.location.pathname.includes("perfilexterno")) {
      const identifiedPerson = JSON.parse(sessionStorage.getItem("identifiedPerson"));
      currentUser = allUsers[identifiedPerson.userEmail];
    } else {
      const identifiedPerson = JSON.parse(sessionStorage.getItem("currentUser"));
      currentUser = allUsers[identifiedPerson.userEmail];
    }
    const userPosts = currentUser.userReplies;
    const approvedPostsText = [];
    const approvedPosts = [];
    for (let i = 0; i < userPosts.length; i++) {
      const post = userPosts[i]
      if (!approvedPostsText.includes(post["post-header-text"])) {
        approvedPostsText.push(post["post-header-text"])
        approvedPosts.push(post)
        console.log([post])
        placeCard(post["post-header-name"], post["post-header-pp"], post["post-header-text"], post["post-header-date"], post["post-header-replies"], "userReplies")
      }
      if (approvedPosts.length == 10) {
        break;
      }
    }
    allUsers[currentUser.userEmail].userReplies = approvedPosts;
    updateStorageObject('local', 'allUsers', allUsers)

  }
}

// exporta la función previamente declarada
/* export { changeHtmlElementsPropById, changeHtmlElementsPropByClass, updateStorageObject, removeMessage, restoreMessage, saveElementsOnObject}; */

function buscarPorCorreo(userEmail) {
  const allUsers = JSON.parse(localStorage.getItem("allUsers"));
  const resultados = Object.values(allUsers).filter(user => user.userEmail.toLowerCase().includes(userEmail.toLowerCase()));
  return resultados;
}

if (document.location.pathname.includes("perfilexterno") || document.location.pathname.includes("perfilusuario")) {

  const buscarUsuarios = document.getElementById("buscarUsuarios");

  buscarUsuarios.onsubmit = function(e) {
    e.preventDefault();
    const searchInput = document.getElementById("searchInput").value.trim();
    if (searchInput !== "") {
      getFriendProfile(searchInput);
    } else {
      // alert("El correo que incregaste no corresponde a algun usuario registrado")
      alert("Ingresa un correo por favor")
    }


  }
}
function getUserPP() {
  temporalCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return temporalCurrentUser.userProfilePicture
}

function getUserEmail() {
  temporalCurrentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return temporalCurrentUser.userEmail
}

function transformDates(date) {
  const dateArray = date.split("-")

  const monthsToString = {
    "01": "Enero",
    "02": "Febrero",
    "03": "Marzo",
    "04": "Abril",
    "05": "Mayo",
    "06": "Junio",
    "07": "Julio",
    "08": "Agosto",
    "09": "Septiembre",
    "10": "Octubre",
    "11": "Noviembre",
    "12": "Diciembre",
  }
  return (monthsToString[dateArray[1]] + ", " + dateArray[0])
}

const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function sendUserToApi(currentUser) {

  console.log("enviando objeto");

  console.log(currentUser)
  $.ajax({
    // url: "http://localhost:8080/api/save",
    url: "https://51a4-200-68-187-97.ngrok-free.app/api/save",
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify(currentUser),
    dataType: "json",
    success: () => {
      console.log("Usuario registrado");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Error enviando usuario a la api")
    }
  });
}

function userSignUpApi(currentUser) {

  console.log("enviando objeto");

  $.ajax({
    // url: "http://localhost:8080/api/save",
    url: "https://51a4-200-68-187-97.ngrok-free.app/api/save",
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    contentType: "application/json",
    type: "POST",
    data: JSON.stringify(currentUser),
    dataType: "json",
    success: () => {
      console.log("Usuario registrado");
      restoreMessage("singUpSuccesful");
      removeMessage("incomplitedFields");
      removeMessage("repeatedEmail");
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Ya existe un registro con ese correo")
      restoreMessage("repeatedEmail");
      removeMessage("incomplitedFields");
      removeMessage("singUpSuccesful");
    }
  });
}


function userSignInApi(userEmail, userPassword) {

  console.log("obteniendo objeto");

  $.ajax({
    // url: `http://localhost:8080/api/email/${userEmail}`,
    url: `https://51a4-200-68-187-97.ngrok-free.app/api/email/${userEmail}`,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    type: "GET",
    dataType: "json",
    success: function(currentUser) {
      if (userPassword == currentUser.userPassword) {
        console.log("Entraste!")
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        window.location.href = "../../../index.html";
      } else {
        restoreMessage("wrongPassword");
        removeMessage("unregisteredEmail");
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("El usuario no existe")
      sessionStorage.removeItem("currentUser")
      restoreMessage("unregisteredEmail");
      removeMessage("wrongPassword");
    }

  });
}

function updateUserInfoInApi(currentUser) {

  console.log("Actualizando objeto");
  console.log(currentUser)

  $.ajax({
    // url: `http://localhost:8080/api/update/${currentUser.userEmail}`,
    url: `https://51a4-200-68-187-97.ngrok-free.app/api/update/${currentUser.userEmail}`,
    contentType: "application/json",
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    type: "PUT",
    data: JSON.stringify(currentUser),
    dataType: "json",
    success: function(updatedCurrentUser) {
      console.log("Objeto Actualizado")
      sessionStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser.usuarioActualizado));
      window.location.href = "../../sections/perfilUsuario.html";
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("No se pudo actualizar la informacion del usuario")
    }

  });
}

function getAllUsersFromApi() {

  console.log("obteniendo objeto");

  $.ajax({
    url: `http://localhost:8080/api/list`,
    type: "GET",
    dataType: "json",
    success: function(res) {
      // console.log(res);
      sessionStorage.setItem("allUsers", JSON.stringify(res));
    },
  });
}

function getFriendProfile(userEmail) {

  console.log("Obteniendo perfil de amigo");

  $.ajax({
    // url: `http://localhost:8080/api/email/${userEmail}`,
    url: `https://51a4-200-68-187-97.ngrok-free.app/api/email/${userEmail}`,
    headers: {
      'ngrok-skip-browser-warning': 'true'
    },
    type: "GET",
    dataType: "json",
    success: function(friendProfile) {
      console.log("Perfil de amigo cargado!")
      sessionStorage.setItem("friendProfile", JSON.stringify(friendProfile));
      window.location.href = "../../sections/perfilExterno.html";

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("El usuario no existe")
      sessionStorage.removeItem("friedProfile")
    }

  });
}
