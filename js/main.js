const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('.fantasma');

navToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');
    if (visibility === "false") {
        primaryNav.setAttribute('data-visible', "true");
        navToggle.setAttribute('aria-expanded', "true");
    } else {
        primaryNav.setAttribute('data-visible', "false");
        navToggle.setAttribute('aria-expanded', "false");
    }
});

closeMenu.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');
    if (visibility === "true") {
        primaryNav.setAttribute('data-visible', "false");
        navToggle.setAttribute('aria-expanded', "false");
    }
});