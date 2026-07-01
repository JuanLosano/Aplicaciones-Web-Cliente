const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.menu-btn');

const primaryFav = document.querySelector('.primary-fav');
const favToggle = document.querySelector('.fav-btn');
const closeFav = document.querySelector('.fav-btn-cerrar');

const primaryCart = document.querySelector('.primary-cart');
const cartToggle = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.cart-btn-cerrar');

const closeAll = document.querySelector('main');

navToggle.addEventListener('click', () => {
  const visibility = primaryNav.getAttribute('data-visible');
  primaryNav.setAttribute('data-visible', visibility === "false" ? "true" : "false");
  navToggle.setAttribute('aria-expanded', visibility === "false" ? "true" : "false");
});

favToggle.addEventListener('click', () => {
  const visibility = primaryFav.getAttribute('data-visible');
  primaryFav.setAttribute('data-visible', visibility === "false" ? "true" : "false");
});

closeFav.addEventListener('click', () => {
  primaryFav.setAttribute('data-visible', "false");
});

cartToggle.addEventListener('click', () => {
  const visibility = primaryCart.getAttribute('data-visible');
  primaryCart.setAttribute('data-visible', visibility === "false" ? "true" : "false");
});

closeCart.addEventListener('click', () => {
  primaryCart.setAttribute('data-visible', "false");
});

closeAll.addEventListener('click', () => {
  primaryNav.setAttribute('data-visible', "false");
  navToggle.setAttribute('aria-expanded', "false");
  primaryFav.setAttribute('data-visible', "false");
  primaryCart.setAttribute('data-visible', "false");
});