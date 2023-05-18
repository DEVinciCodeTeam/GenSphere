window.addEventListener('load', function() {
    var card = document.querySelector('.card');
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      card.addEventListener('click', function() {
        window.location.href = "./chat-mobile.html";
      });
    } else {
      card.style.pointerEvents = 'none';
      card.style.cursor = 'default';
    }
  });