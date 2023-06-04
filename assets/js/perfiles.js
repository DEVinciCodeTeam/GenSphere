/*-------------- Reading elements ----------------*/
function changeHtmlElementsPropById(id, value, prop, testvalue = "none") {
  const element = document.getElementById(id);
  if (testvalue == "none") {
    if (element != null && value != "undefined") {
      element[prop] = value;
    }
  } else {
    // if (element[prop] != testvalue) {
    if (element != null && value != "undefined" && element[prop] != testvalue) {
      element[prop] = value;
      // }
    }
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


// ------------------ Setting user's data ------------------------------
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const allUsers = JSON.parse(localStorage.getItem("allUsers"));

// ----------------------- Shared IDs ----------------------------------
changeHtmlElementsPropById("userProfilePicture", currentUser.userProfilePicture, "src")
changeHtmlElementsPropById("userName", currentUser.userName, "innerHTML");
changeHtmlElementsPropById("userTitle", currentUser.userTitle, "innerHTML", "Tu título");
changeHtmlElementsPropById("userLocation", currentUser.userLocation, "innerHTML", "Tu ubicación");
changeHtmlElementsPropById("cohorteNum", currentUser.userCohorte, "innerHTML");
changeHtmlElementsPropById("aboutUser", currentUser.aboutUser, "innerHTML", "Una breve descripción de ti");
changeHtmlElementsPropById("experienceUser", currentUser.experienceUser, "innerHTML", "Cuentanos de tu experiencia");
changeHtmlElementsPropById("userGithub", currentUser.userGithub, "href");
changeHtmlElementsPropById("userLinkedIn", currentUser.userLinkedIn, "href");
changeHtmlElementsPropById("userEmail", currentUser.userEmail, "href");
// ---------------- Just perfilUsuario IDs -----------------------------
changeHtmlElementsPropById("userJoinedDate", "Se unió en " + currentUser.userJoinedDate, "innerHTML", "Se unió en 2023");
// ---------------- Just perfilEditable IDs ----------------------------
changeHtmlElementsPropById("editUserName", currentUser.userName, "innerHTML");
changeHtmlElementsPropById("editUserNameInput", currentUser.userName, "value");
changeHtmlElementsPropById("editUserCohorteInput", currentUser.userCohorte, "value");


changeHtmlElementsPropByClass("user-post-title", currentUser.userName, "innerHTML");
changeHtmlElementsPropByClass("user-post-img", currentUser.userProfilePicture, "src");


// ------------- Saving the picture the user uploads --------------

const img = document.querySelector('#userProfilePicture');
const file = document.querySelector('#file');

file.addEventListener('change', function() {
  const chosenFile = this.files[0];
  if (chosenFile) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      img.setAttribute('src', reader.result);
      currentUser.userProfilePicture = reader.result;
      console.log(allUsers)
      allUsers[currentUser.userEmail] = currentUser;
      updateStorageObject('session', 'currentUser', currentUser);
      updateStorageObject('local', 'allUsers', allUsers)
    });
    reader.readAsDataURL(chosenFile);
  }
});

// --------------------------------------------

