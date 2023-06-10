// visualizeUserPosts();
// visualizeCommentedPosts();
// ------------------ Setting user's data ------------------------------

let currentUser;

if (document.location.pathname.includes(PERFIL_EXTERNO)) {
  currentUser = JSON.parse(sessionStorage.getItem("friendProfile"));
} else {
  currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
}
// console.log(currentUser)
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
if (currentUser.userSecondEmail != undefined) {
  changeHtmlElementsPropById("userEmail", currentUser.userSecondEmail, "href");
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

if (document.location.pathname.includes(PERFIL_EDITABLE)) {
  const img = document.querySelector('#userProfilePicture');
  const file = document.querySelector('#file');

  file.addEventListener('change', function() {
    //   if (this.files[0]) {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', function() {
    //       img.setAttribute('src', reader.result);
    //     });
    //   }
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    let formData = new FormData();
    formData.append("file", file.files[0]);
    sendProfilePicture(formData);
    currentUser["userProfilePicture"] = `${API_URL}/files/${file.files[0].name}`;
    updateUserInfoInApi(currentUser, false);
    changeHtmlElementsPropById("userProfilePicture", currentUser.userProfilePicture, "src")
    // reader.readAsDataURL(chosenFile);
  });
}
// ---------------- Saving the secondary data perfil editable----------------------------
const editProfile = document.getElementById("profileEditForm");


if (editProfile !== null) {
  removeMessage("incomplitedFields")

  editProfile.onsubmit = function(e) {

    e.preventDefault();

    const getUserName = document.getElementById("editUserNameInput").value.trim();
    const getUserCohorte = document.getElementById("editUserCohorteInput").value.trim();

    //================================================

    if (getUserName == "" || getUserCohorte == "") {
      restoreMessage("incomplitedFields");
    } else {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

      saveElementsOnObject("editUserNameInput", "userName", currentUser)
      saveElementsOnObject("userAgeInput", "userAge", currentUser)
      saveElementsOnObject("userLocationInput", "userLocation", currentUser)
      saveElementsOnObject("editUserCohorteInput", "usertIdCohorte", currentUser)
      saveElementsOnObject("userAboutMeInput", "aboutUser", currentUser)
      saveElementsOnObject("userExperienceInput", "experienceUser", currentUser)
      saveElementsOnObject("editUserTitleInput", "userTitle", currentUser)
      saveElementsOnObject("userGithubLinkInput", "userGithub", currentUser)
      saveElementsOnObject("userLinkedinLinkInput", "userLinkedIn", currentUser)
      saveElementsOnObject("userOtherEmailInput", "userSecondEmail", currentUser)
      updateUserInfoInApi(currentUser);

    }
  }
}
