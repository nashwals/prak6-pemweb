// Mendapatkan elemen input tugas, uts, dan uas
const tugas = document.getElementById("tugas");
const uts = document.getElementById("uts");
const uas = document.getElementById("uas");

let currentInputField; // Menyimpan input field yang aktif

// Mengatur input field saat diklik
function setCurrentInput(fieldId) {
    currentInputField = document.getElementById(fieldId);
}

// Fungsi untuk memasukkan angka ke input yang aktif
function nilaiMasuk(input) {
    if (currentInputField) {
        if (input === '.' && currentInputField.value.includes('.')) {
            return; // Mencegah lebih dari satu titik desimal
        }
        currentInputField.value += input; // Menambahkan input ke field aktif
    }
}

// Menghapus semua nilai dan reset hasil
function hapusAll() {
    document.getElementById('tugas').value = '';
    document.getElementById('uts').value = '';
    document.getElementById('uas').value = '';

    // Reset nilai angka dan huruf
    document.querySelector('.nilaiHasil .col:first-child').textContent = '00';
    document.querySelector('.nilaiHasil .col:last-child').textContent = 'E';

    // Reset status lulus/gagal
    let lulusGagalBox = document.querySelector('.lulusGagal');
    lulusGagalBox.textContent = 'Mohon masukkan nilai';
    lulusGagalBox.classList.remove('lulus', 'gagal');
}

// Fungsi menghitung nilai akhir
function hitungNilai() {
    // Mengambil nilai dari input field
    let tugas = parseFloat(document.getElementById("tugas").value);
    let uts = parseFloat(document.getElementById("uts").value);
    let uas = parseFloat(document.getElementById("uas").value);

    // Validasi input agar nilai tidak kosong atau negatif
    if (isNaN(tugas) || isNaN(uts) || isNaN(uas) || tugas < 0 || uts < 0 || uas < 0) {
        alert("Mohon masukkan semua nilai dengan benar (nilai tidak boleh negatif).");
        return;
    }    

    // Menghitung nilai akhir dengan bobot tugas, UTS, dan UAS
    let nilaiAkhir = (tugas * 0.3) + (uts * 0.3) + (uas * 0.4);

    // Menentukan status kelulusan berdasarkan nilai akhir
    let status = "Gagal";
    let kelasStatus = "gagal";
    if (nilaiAkhir >= 60) {
        status = "Lulus";
        kelasStatus = "lulus";
    }

    // Menampilkan status kelulusan dan nilai akhir
    document.getElementById("lulusGagalBox").textContent = status;
    document.getElementById("lulusGagalBox").className = `lulusGagal ${kelasStatus}`;

    document.getElementById("nilaiAngka").textContent = nilaiAkhir.toFixed(2);
    document.getElementById("nilaiHuruf").textContent = getHurufNilai(nilaiAkhir);
}

// Fungsi untuk mengonversi nilai angka menjadi huruf
function getHurufNilai(nilai) {
    if (nilai >= 90) return "A";
    if (nilai >= 80) return "B";
    if (nilai >= 70) return "C";
    if (nilai >= 60) return "D";
    if (nilai < 60) return "E"; // Nilai di bawah 60 otomatis E
}