window.addEventListener('DOMContentLoaded', function() {
    let link = document.getElementById('chatLink');
  
    if (window.innerWidth >= 768) {
      link.removeAttribute('href');
      link.style.cursor = 'default';
    }
  });