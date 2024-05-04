const url = "/data/wisata.json";
const title = document.getElementById("judul");
const isi = document.getElementById('content-text');
const lokasi = document.getElementById('lokasi');
const gambar = document.getElementById('img');
const iklan = document.getElementById('iklan');
const resultContainer = document.querySelector(".result");
const input = document.getElementById("input");
const STORAGE_KEY = 'WISATA';
const RENDER_EVENT = 'render-wisata';
const titleWisata = document.getElementById('title-wisata');


function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener(RENDER_EVENT, () => {
  getData();
});

const getJudul = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return data;
}


async function getData(){
  const judul = getJudul();
  titleWisata.textContent = judul;
  title.textContent = judul;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Gagal mengambil data');
  }
  const data = await response.json();
  const {wisata} = data;
  const jumlah_data = wisata.length;
  let randomValue1 = getRandomValue(0, jumlah_data - 1);
  let randomValue2 = getRandomValue(0, jumlah_data - 1);
  let indexWisata = findIndex(judul);
  
  for (const indexAtas in wisata){
    if(judul.toLowerCase().includes(wisata[indexAtas].nama.toLowerCase())){
      isi.innerText = wisata[indexAtas].teks;
      lokasi.innerText = wisata[indexAtas].lokasi;
      gambar.innerHTML = `<img src="/Asset/${wisata[indexAtas].gambar}" alt="">`
    }
  }
  
  function buatIklan(){
    if(randomValue1 != randomValue2 && randomValue1 != indexWisata && randomValue2 != indexWisata){
      iklan.append(generateIklan(wisata, randomValue1));
      iklan.append(generateIklan(wisata, randomValue2));
      if(iklan.childElementCount > 2){
        iklan.innerHTML = '';
        buatIklan();
      }
    } else {
      randomValue1 = getRandomValue(0, wisata.length - 1);
      randomValue2 = getRandomValue(0, wisata.length - 1);
      buatIklan();
    }
  }
  
  buatIklan();

  function findIndex(value){
    for (const index in wisata){
      if(wisata[index].nama === value){
        return index;
      }
    }
    return -1;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  getData();

  
  // search 
  input.addEventListener('input', async () => {
    let result = [];
    let inputVal = input.value;
    const response = await fetch(url);
    const data = await response.json();
    const {wisata} = data;
    if(inputVal.length >= 1){
      result = wisata.filter((keyword) => {
        return keyword.nama.toLowerCase().includes(inputVal.toLowerCase());
      })
      resultContainer.innerHTML = '';
      for(const index in result){
        resultContainer.appendChild(generateSearch(result, index));
      }
    }else{
      resultContainer.innerHTML = '';
    }
  })
});


function simpanData(item){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(item.nama));
}

function generateSearch(result, index){
  const container = document.createElement('ul');

  const link = document.createElement('a');
  link.href = 'wisata.html';
  link.addEventListener('click', () => {
    simpanData(result[index]);
  })

  const isi = document.createElement('li');
  isi.textContent = result[index].nama;

  container.appendChild(link);
  link.appendChild(isi);

  return container;
}

function generateIklan(wisata, randomValue){
  const link = document.createElement('a');
  link.href = 'wisata.html';

  link.addEventListener('click', () => {
    simpanData(wisata[randomValue]);
  })
  const container = document.createElement('div');
  container.classList.add('gambar');
  const img = document.createElement('img');
  img.src = `/Asset/${wisata[randomValue].gambar}`;
  img.alt = '';




  const textIklan = document.createElement('div');
  textIklan.classList.add('text-iklan');
  const title = document.createElement('h4');
  title.textContent = wisata[randomValue].nama;

  const desc = document.createElement('p');
  desc.textContent = wisata[randomValue].ringkasan;

  container.appendChild(img);
  container.appendChild(textIklan);

  textIklan.appendChild(title);
  textIklan.appendChild(desc);

  link.appendChild(container);

  return link;
}



