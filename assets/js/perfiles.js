/*-------------- Reading elements ----------------*/
const userName = document.getElementById("userName");
const userCohorte = document.getElementById("cohorteNum");
const userDescription = document.getElementById("userDescrition");
const userExperience = document.getElementById("userExperience");
const userGithub = document.getElementById("userGithub");
const userLinkedIn = document.getElementById("userLinkedIn");
const userEmail = document.getElementById("userEmail");
const userJoinedDate = document.getElementById("userJoinedDate");
const userPostCardsTitle = document.getElementsByClassName("user-post-title");
const userPostCardsImg = document.getElementsByClassName("user-post-img");
/*-----------------------------------------------*/

const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

userName.innerHTML = currentUser.userName;
userCohorte.innerHTML = currentUser.userCohorte;
userEmail['href'] += currentUser.userEmail;
console.log(currentUser['userEmail'])

for (const postCard of userPostCardsTitle) {
  postCard.innerHTML = currentUser.userName;
}

for (const postImg of userPostCardsImg) {
  postImg.src = "../../" + currentUser.userProfilePicture;
}

const userJoinDate = new Date();

console.log(userJoinDate.toJSON().slice(0, 10));


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


