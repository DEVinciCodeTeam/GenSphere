/*-------------- Reading elements ----------------*/
function changeHtmlElementsPropById (id, value, prop, testvalue = "none"){

  const element = document.getElementById(id)
  if (testvalue == "none" ) {
    if(element != null || value == "undefined"){
      element[prop]= value;
   }
  } else {
    if(element[prop] != testvalue ){
      if(element != null || value == "undefined"){
        element[prop]= value;
     }
    }
  }
} 
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

changeHtmlElementsPropById("userName",currentUser.userName, "innerHTML");
changeHtmlElementsPropById("editUserName",currentUser.userName, "innerHTML");
changeHtmlElementsPropById("editUserNameInput",currentUser.userName, "value");
changeHtmlElementsPropById("cohorteNum",currentUser.userCohorte, "innerHTML");
changeHtmlElementsPropById("aboutUser",currentUser.aboutUser, "innerHTML", "Una breve descripción de ti");
changeHtmlElementsPropById("experienceUser",currentUser.experienceUser, "innerHTML","Cuentanos de tu experiencia");
changeHtmlElementsPropById("userGithub",currentUser.userGithub, "href");
changeHtmlElementsPropById("userLinkedIn",currentUser.userLinkedIn, "href");
changeHtmlElementsPropById("userEmail",currentUser.userEmail, "href");
changeHtmlElementsPropById("userJoinedDate","Se unió en " + currentUser.userJoinedDate, "innerHTML");

function changeHtmlElementsPropByClass (clase, value, prop){
  const element = document.getElementsByClassName(clase)
  if(element != null){
    for( const subElement of element){
      subElement[prop]= value;
    }
  }
} 

changeHtmlElementsPropByClass("user-post-title", currentUser.userName,"innerHTML");
changeHtmlElementsPropByClass("user-post-img", "../../" + currentUser.userProfilePicture,"src");

const img = document.querySelector('#photo');
const file = document.querySelector('#file');

file.addEventListener('change', function() {
  const chosenFile = this.files[0];
  if (chosenFile) {
    const reader = new FileReader();
    reader.addEventListener('load', function() {
      img.setAttribute('src', reader.result);
    });
    reader.readAsDataURL(chosenFile);
  }
});


