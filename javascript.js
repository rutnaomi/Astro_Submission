const nav = document.querySelector("nav");
const tombolMenu = document.querySelector(".button_menu");
const menu = document.querySelector("nav .menu ul");
const logoHitam = document.querySelector("nav .logo img.hitam");
const logoPutih = document.querySelector("nav .logo img.putih");
const drag = document.querySelector(".container-card");

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

drag.addEventListener("mouseup", () => {
  isDragging = false;
  drag.classList.remove("dragging");
});

const url = "/data/wisata.json";
function getData() {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }
      return response.json();
    })
    .then((data) => data.wisata.map(({ nama, deskripsi, gambar }) => ({
      nama,
      deskripsi,
      gambar
    })));
}

function addCard(){
  getData().then(data => {
    data.forEach(item => {
      let card = ''
      card = `
      <div class="card">
        <img src="/Asset/${item.gambar}" draggable="false" alt="Gambar" class="card-img">
        <div div class="card-body">
          <h5 class="card-title">${item.nama}</h5>
          <p class="card-text">${item.deskripsi}</p>
          <a href="#" class="card-link">Baca Lebih Lanjut</a>
        </div>
      </div>
      `;
      drag.innerHTML += card;
    });
  });
}
