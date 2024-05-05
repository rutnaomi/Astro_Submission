const nav = document.querySelector("nav");
const tombolMenu = document.querySelector(".button_menu");
const menu = document.querySelector("nav .menu ul");
const logoHitam = document.querySelector("nav .logo img.hitam");
const logoPutih = document.querySelector("nav .logo img.putih");
const drag = document.querySelector(".container-card");
const button = document.querySelectorAll(".wrapper .img");
const nextBtn = document.getElementById('right');
const prevBtn = document.getElementById('left');
const STORAGE_KEY = 'WISATA';
const tulisan = document.querySelectorAll('nav a');


button.forEach(btn => {
  btn.addEventListener('click', () => {
    drag.scrollLeft += btn.id == 'left' ? -494 : 494;
  })
})



window.addEventListener("resize", () => {
  let width = window.innerWidth;
  if (width > 989) {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const isScrolled = scrollPos > 0;
    if (isScrolled) {
      tulisan.forEach(tulisan => {
        tulisan.classList.add("hitam");
      });
    }else{
      tulisan.forEach(tulisan => {
        tulisan.classList.remove("hitam");
      });
    }
    nav.classList.toggle("putih", isScrolled);
    logoHitam.style.display = isScrolled ? "block" : "none";
    logoPutih.style.display = isScrolled ? "none" : "block";

   
  });
});

document.addEventListener("DOMContentLoaded", () => {
  addCard();
  const width = window.innerWidth;
  if (width < 990) {
    klikMenu();
  }
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

function buatCard(item){
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const img = document.createElement('img');
  img.src = `/Asset/${item.gambar}`;
  img.alt = "Gambar";
  img.classList.add('card-img');
  img.draggable = false;

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = item.nama;

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = item.deskripsi;

  const link = document.createElement('a');
  link.classList.add('card-link');
  link.textContent = "Baca Lebih Lanjut";
  link.href = 'wisata.html';

  link.addEventListener('click', () => {
    simpanData(item);
  })


  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(description);
  cardBody.appendChild(link);

  return cardDiv;
}

function addCard(){
  getData().then(data => {
    data.forEach(item => {
      const card = buatCard(item);
      drag.appendChild(card);
    });
  });
}

function simpanData(item){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(item.nama));
}

