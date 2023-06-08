visualizeUserPosts();
visualizeCommentedPosts();
// ------------------ Setting user's data ------------------------------
let currentUser;
if (document.location.pathname.includes("perfilExterno")) {
  currentUser = JSON.parse(sessionStorage.getItem("identifiedPerson"));
} else {
  currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
}
console.log(currentUser)
/* const currentUser = JSON.parse(sessionStorage.getItem("currentUser")); */
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
if (currentUser.userOtherEmail != undefined) {
  changeHtmlElementsPropById("userEmail", currentUser.userOtherEmail, "href");
} else {
  changeHtmlElementsPropById("userEmail", currentUser.userEmail, "href");
}

// ---------------- Just perfilUsuario IDs -----------------------------
changeHtmlElementsPropById("userJoinedDate", "Se unió en " + currentUser.userJoinedDate, "innerHTML", "Se unió en 2023");
// changeHtmlElementsPropByClass("user-post-title", currentUser.userName, "innerHTML");
// changeHtmlElementsPropByClass("user-post-img", currentUser.userProfilePicture, "src");
// ---------------- Just perfilEditable IDs ----------------------------
changeHtmlElementsPropById("editUserName", currentUser.userName, "innerHTML");
changeHtmlElementsPropById("editUserNameInput", currentUser.userName, "value");
changeHtmlElementsPropById("editUserTitleInput", currentUser.userTitle, "value");
changeHtmlElementsPropById("userAgeInput", currentUser.userAge, "value");
changeHtmlElementsPropById("userLocationInput", currentUser.userLocation, "value");
changeHtmlElementsPropById("editUserCohorteInput", currentUser.userCohorte, "value");
changeHtmlElementsPropById("userAboutMeInput", currentUser.aboutUser, "value");
changeHtmlElementsPropById("userExperienceInput", currentUser.experienceUser, "value");
changeHtmlElementsPropById("userGithubLinkInput", currentUser.userGithub, "value");
changeHtmlElementsPropById("userLinkedinLinkInput", currentUser.userLinkedIn, "value");
changeHtmlElementsPropById("userOtherEmailInput", currentUser.userOtherEmail, "value");

// ------------- Saving the photo that the user uploads --------------

if (document.location.pathname.includes("perfileditable")) {
  const img = document.querySelector('#userProfilePicture');
  const file = document.querySelector('#file');

  file.addEventListener('change', function() {
    const allUsers = JSON.parse(localStorage.getItem("allUsers"));
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
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
}
// ---------------- Saving the secondary data perfil editable----------------------------
const editProfile = document.getElementById("profileEditForm");


if (editProfile !== null) {
  removeMessage("incomplitedFields")

  editProfile.onsubmit = function(e) {
    console.log("entramos edit profile")

    e.preventDefault();

    const getUserName = document.getElementById("editUserNameInput").value.trim();
    const getUserCohorte = document.getElementById("editUserCohorteInput").value.trim();


    //================================================

    if (getUserName == "" || getUserCohorte == "") {
      restoreMessage("incomplitedFields");
    } else {
      const allUsers = JSON.parse(localStorage.getItem("allUsers"));
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      console.log("else")
      saveElementsOnObject("editUserNameInput", "userName", allUsers[currentUser.userEmail])
      saveElementsOnObject("userAgeInput", "userAge", allUsers[currentUser.userEmail])
      saveElementsOnObject("userLocationInput", "userLocation", allUsers[currentUser.userEmail])
      saveElementsOnObject("editUserCohorteInput", "userCohorte", allUsers[currentUser.userEmail])
      saveElementsOnObject("userAboutMeInput", "aboutUser", allUsers[currentUser.userEmail])
      saveElementsOnObject("editUserTitleInput", "userTitle", allUsers[currentUser.userEmail])
      saveElementsOnObject("userExperienceInput", "experienceUser", allUsers[currentUser.userEmail])
      saveElementsOnObject("userGithubLinkInput", "userGithub", allUsers[currentUser.userEmail])
      saveElementsOnObject("userLinkedinLinkInput", "userLinkedIn", allUsers[currentUser.userEmail])
      saveElementsOnObject("userOtherEmailInput", "userOtherEmail", allUsers[currentUser.userEmail])

      saveElementsOnObject("editUserNameInput", "userName", currentUser)
      saveElementsOnObject("userAgeInput", "userAge", currentUser)
      saveElementsOnObject("userLocationInput", "userLocation", currentUser)
      saveElementsOnObject("editUserCohorteInput", "usertIdCohorte", currentUser)
      saveElementsOnObject("userAboutMeInput", "aboutUser", currentUser)
      saveElementsOnObject("userExperienceInput", "experienceUser", currentUser)
      saveElementsOnObject("editUserTitleInput", "userTitle", currentUser)
      saveElementsOnObject("userGithubLinkInput", "userGithub", currentUser)
      saveElementsOnObject("userLinkedinLinkInput", "userLinkedIn", currentUser)
      saveElementsOnObject("userOtherEmailInput", "userOtherEmail", currentUser)

      updateStorageObject('session', 'currentUser', currentUser);
      updateStorageObject('local', 'allUsers', allUsers)

      window.location.href = "../../sections/perfilUsuario.html";
    }
  }
}
