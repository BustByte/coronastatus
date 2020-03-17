var hamburgerMenuButton = document.getElementById('hamburger-menu-button');

hamburgerMenuButton.addEventListener('click', function() {
  var hamburgerMenu = document.getElementsByClassName('hamburger-menu')[0];

  if (hamburgerMenu.classList.contains('active')) {
    hamburgerMenu.style.height = '';
    setTimeout(function() {
      hamburgerMenu.classList.remove('active');
    }, 300);
  } else {
    hamburgerMenu.classList.add('active');
    setTimeout(function() {
      hamburgerMenu.style.height = '140px';
    }, 1);
  }
});
