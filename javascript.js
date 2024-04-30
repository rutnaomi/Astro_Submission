const nav = document.querySelector("nav");
const tombolMenu = document.querySelector(".button_menu");
const menu = document.querySelector("nav .menu ul");
const logoHitam = document.querySelector("nav .logo img.hitam");
const logoPutih = document.querySelector("nav .logo img.putih");
const drag = document.querySelector(".container-card");
const nextButton = document.getElementById('next-button')
const prevButton = document.getElementById('prev-button')
const card = document.querySelector('.container-card');




document.addEventListener("DOMContentLoaded", () => {
  let startScroll = 0;
  if(startScroll = 0){
    prevButton.setAttribute('hidden', '')
  }

  nextButton.addEventListener('click', () => {
    drag.scrollLeft += startScroll + 494;
    startScroll = drag.scrollLeft += startScroll + 494;
    if(startScroll > 0){
      prevButton.removeAttribute('hidden')
    }
    
  })
  prevButton.addEventListener('click', () => {
    drag.scrollLeft -= startScroll + 494;
    startScroll = drag.scrollLeft -= startScroll + 494;
    if(startScroll < 0){
      prevButton.setAttribute('hidden', '')
    }
  })
})




function klikMenu() {
  tombolMenu.addEventListener("click", () => {
    if (menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  });
}

window.addEventListener("resize", () => {
  let width = window.innerWidth;
  if (width > 989) {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
  klikMenu();
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const isScrolled = scrollPos > 0;

    nav.classList.toggle("putih", isScrolled);
    logoHitam.style.display = isScrolled ? "block" : "none";
    logoPutih.style.display = isScrolled ? "none" : "block";

    klikMenu();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  addCard();
  const width = window.innerWidth;
  if (width < 990) {
    klikMenu();
  }
});

let isDragging = false;
let startX;
let startScrollLeft;

drag.addEventListener("mousedown", (ev) => {
  isDragging = true;
  drag.classList.add("dragging");
  startX = ev.pageX;
  startScrollLeft = drag.scrollLeft;
});

drag.addEventListener("mousemove", (ev) => {
  if (!isDragging) return;
  drag.scrollLeft = startScrollLeft - (ev.pageX - startX);

  if (drag.scrollWidth - drag.clientWidth - 100 - drag.scrollLeft < 100) {
    addCard();
  }
});
e


drag.addEventListener("mouseup", () => {
  isDragging = false;
  drag.classList.remove("dragging");
});

const url = "/data/wisata.json";
async function getData() {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Gagal mengambil data');
  }
  const data = await response.json();
  return data.wisata.map(({ nama, deskripsi, gambar, link, teks }) => ({
    nama,
    deskripsi,
    gambar,
    link,
    teks
  }));
}

function addCard(){
  const card = document.createElement('div');
  card.classList.add('card')
  getData().then(data => {
    data.forEach(item => {
      let card = ''
      card = `
      <div class="card">
        <img src="/Asset/${item.gambar}" draggable="false" alt="Gambar" class="card-img">
        <div div class="card-body">
          <h5 class="card-title">${item.nama}</h5>
          <p class="card-text">${item.deskripsi}</p>
          <a href="${item.link}" class="card-link">Baca Lebih Lanjut</a>
        </div>
      </div>
      `;
      drag.innerHTML += card;
    });
  });
}

