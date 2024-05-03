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






async function getData(){
  const response = await fetch(url);
  const data = await response.json();

  for (const index in data.wisata){
    artikel.innerHTML += `
           <div class="container"> 
              <div id="img">
                <img src="/Asset/${data.wisata[index].gambar}" alt="">
              </div>
              <a href="/${data.wisata[index].link}">
                <h2 id="judul">${data.wisata[index].nama}</h2>
              </a>
              <div class="content-text">
                <p id="content-text">
                  ${data.wisata[index].deskripsi}
                </p>
                <div class="container-location">
                  <img src="/Asset/location.png" alt="">
                  <p id="lokasi">
                    ${data.wisata[index].lokasi}
                  </p>
                </div>
              </div>  
            </div>
    `
  }
  
  function buatIklan(){
    const {wisata} = data; 
    const jumlah_data = wisata.length;
    let randomValue1 = getRandomValue(0, jumlah_data - 1);
    let randomValue2 = getRandomValue(0, jumlah_data - 1);
    let indexWisata = findIndex(judul.textContent);
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
    }else{
      resultContainer.innerHTML = '';
    }
  })
});
  

