
const tombolMenu = document.querySelector('.button_menu');
const menu = document.querySelector('nav .menu ul');

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
  const width = window.innerWidth;
  if(width < 990){
    klikMenu();
  }
 
});
