const nav = document.querySelector('nav');
const tombolMenu = document.querySelector('.button_menu');
const menu = document.querySelector('nav .menu ul');
const logoHitam = document.querySelector('nav .logo img.hitam');
const logoPutih = document.querySelector('nav .logo img.putih');




function klikMenu(){
  tombolMenu.addEventListener('click', () => {
    if(menu.style.display === 'none') {
      menu.style.display = 'block';
    } else {
      menu.style.display = 'none';
    }
  })
}

window.addEventListener('resize', () => {
  let width = window.innerWidth;
  if(width > 989){
    menu.style.display = 'block';
  }else{
    menu.style.display = 'none';
  }
  klikMenu();
})

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const isScrolled = scrollPos > 0;
    
    nav.classList.toggle('putih', isScrolled);
    logoHitam.style.display = isScrolled ? 'block' : 'none';
    logoPutih.style.display = isScrolled ? 'none' : 'block';
    
    klikMenu();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const width = window.innerWidth;
  if(width < 990){
    klikMenu();
  }
 
});
