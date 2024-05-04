const STORAGE_KEY = 'WISATA';
const artikel = document.querySelector(".container-artikel");
const url = "/data/wisata.json";
const sidebar = document.querySelector('.container-kanan');
const sidebar_content = document.querySelector('.content-wrapper');
const resultContainer = document.querySelector(".result");

window.onscroll = () =>{
  let scrollTop = window.scrollY;
  if(scrollTop >= 109){
    sidebar_content.classList.add('is-fixed');
  }else{
    sidebar_content.classList.remove('is-fixed');
  }
}



function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function buatListWisata(data, index){
  const container = document.createElement('div');
  container.classList.add('container');

  const imgDiv = document.createElement('div');
  imgDiv.id = 'img';
  const img = document.createElement('img');
  img.src = `/Asset/${data.wisata[index].gambar}`;
  img.alt = '';
  imgDiv.appendChild(img);

  const titleLink = document.createElement('a');
  titleLink.href = `wisata.html`;
  titleLink.addEventListener('click', () => {
    simpanData(data.wisata[index]);
  })
  const title = document.createElement('h2');
  title.id = 'judul';
  title.textContent = data.wisata[index].nama;
  titleLink.appendChild(title);

  const contentTextDiv = document.createElement('div');
  contentTextDiv.classList.add('content-text');
  const description = document.createElement('p');
  description.id = 'content-text';
  description.textContent = data.wisata[index].deskripsi;
  contentTextDiv.appendChild(description);

  
  const locationDiv = document.createElement('div');
  locationDiv.classList.add('container-location');
  const locationImg = document.createElement('img');
  locationImg.src = '/Asset/location.png';
  locationImg.alt = '';
  const location = document.createElement('p');
  location.id = 'lokasi';
  location.textContent = data.wisata[index].lokasi;
  locationDiv.appendChild(locationImg);
  locationDiv.appendChild(location);

  container.appendChild(imgDiv);
  container.appendChild(titleLink);
  container.appendChild(contentTextDiv);
  contentTextDiv.appendChild(locationDiv);

  return container;
}





async function getData(){
  const response = await fetch(url);
  const data = await response.json();

  for (const index in data.wisata){
   artikel.appendChild(buatListWisata(data, index));
  }
  
  function buatIklan(){
    const {wisata} = data; 
    const jumlah_data = wisata.length;
    let randomValue1 = getRandomValue(0, jumlah_data - 1);
    let randomValue2 = getRandomValue(0, jumlah_data - 1);
    let indexWisata = findIndex(judul.textContent);
    if(randomValue1 != randomValue2 && randomValue1 != indexWisata && randomValue2 != indexWisata){
      iklan.appendChild(generateIklan(wisata, randomValue1));
      iklan.appendChild(generateIklan(wisata, randomValue2));
      if(iklan.childElementCount > 2){
        iklan.innerHTML = '';
        buatIklan();
      }z
    } else {
      randomValue1 = getRandomValue(0, wisata.length - 1);
      randomValue2 = getRandomValue(0, wisata.length - 1);
      buatIklan();
    }
    function findIndex(value){
      for (const index in wisata){
        if(wisata[index].nama === value){
          return index;
        }
      }
      return -1;
    }
  }
  buatIklan();
}
document.addEventListener('DOMContentLoaded',() => {
  getData();
  input.addEventListener('input', async () => {
    let result = [];
    let inputVal = input.value;
    const response = await fetch(url);
    const data = await response.json();
    const {wisata} = data;
    console.log(inputVal);
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

function simpanData(item){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(item.nama));
}
  
function generateIklan(wisata, randomValue){
  const link = document.createElement('a');
  link.href = 'wisata.html';

  link.addEventListener('click', () => {
    simpanData(wisata[randomValue]);
    location.reload();
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

