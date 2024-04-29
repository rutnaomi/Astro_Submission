const url = "/data/wisata.json";
const judul = document.getElementById("judul");
const isi = document.getElementById('content-text');
const lokasi = document.getElementById('lokasi');
const gambar = document.getElementById('img');
const iklan = document.getElementById('iklan');
const resultContainer = document.querySelector(".result");
const input = document.getElementById("input");

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getData(){
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Gagal mengambil data');
  }
  const data = await response.json();
  const {wisata} = data;
  const jumlah_data = wisata.length;
  let randomValue1 = getRandomValue(0, jumlah_data - 1);
  let randomValue2 = getRandomValue(0, jumlah_data - 1);
  let indexWisata = findIndex(judul.textContent);
  
  for (const indexAtas in wisata){
    if(judul.textContent.toLowerCase().includes(wisata[indexAtas].nama.toLowerCase())){
      isi.innerText = wisata[indexAtas].teks;
      lokasi.innerText = wisata[indexAtas].lokasi;
      gambar.innerHTML = `<img src="/Asset/${wisata[indexAtas].gambar}" alt="">`
    }
  }
  
  function buatIklan(){
    if(randomValue1 != randomValue2 && randomValue1 != indexWisata && randomValue2 != indexWisata){
      iklan.innerHTML = `
       <a href="/${wisata[randomValue1].link}">
        <div class="gambar">
           <img src="Asset/${wisata[randomValue1].gambar}" alt="">
           <div class="text-iklan">    
              <h4>${wisata[randomValue1].nama}</h4>
              <p>${wisata[randomValue1].ringkasan}</p>
           </div>
        </div>
       </a>
       <a href="/${wisata[randomValue2].link}">
         <div class="gambar">
           <img src="Asset/${wisata[randomValue2].gambar}" alt="">
           <div class="text-iklan">    
              <h4>${wisata[randomValue2].nama}</h4>
              <p>${wisata[randomValue2].ringkasan}</p>
           </div>
         </div>
       </a>
       `
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
  input.addEventListener('keydown', async () => {
    let result = [];
    let inputVal = input.value;
    const response = await fetch(url);
    const data = await response.json();
    const {wisata} = data;
    if(inputVal.length){
      result = wisata.filter((keyword) => {
        return keyword.nama.toLowerCase().includes(inputVal.toLowerCase());
      })
    }
    resultContainer.innerHTML = '';
    for(const index in result){
      resultContainer.innerHTML += `
      <ul>
        <a href="/${result[index].link}">
          <li>
              ${result[index].nama}
          </li>
        </a>
      </ul> 
      ` 
    }
  })
});
