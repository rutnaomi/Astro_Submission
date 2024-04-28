const url = "/data/wisata.json";
const judul = document.getElementById("judul");
const isi = document.getElementById('content-text');
const lokasi = document.getElementById('lokasi');
const gambar = document.getElementById('img')

async function getData(){
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Gagal mengambil data');
  }
  const data = await response.json();
  const {wisata} = data;

  for (const index in wisata){
    if(judul.textContent.toLowerCase().includes(wisata[index].nama.toLowerCase())){
      isi.innerText = wisata[index].teks;
      lokasi.innerText = wisata[index].lokasi;
      gambar.innerHTML = `<img src="/Asset/${wisata[index].gambar}" alt="">`
    }
  }
}
document.addEventListener('DOMContentLoaded', getData());