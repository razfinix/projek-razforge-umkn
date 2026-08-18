/* =====================================================
   DATABASE SISTEM JASA JUAL BUKU
   ===================================================== */

const produkDefault = [
    {
        id: 1,
        nama: "Belajar HTML & CSS",
        kategori: "Pemrograman",
        harga: 75000,
        stok: 20,
        gambar: "../assets/img/buku1.png"
    },
    {
        id: 2,
        nama: "JavaScript untuk Pemula",
        kategori: "Pemrograman",
        harga: 85000,
        stok: 15,
        gambar: "../assets/img/buku2.png"
    },
    {
        id: 3,
        nama: "PHP & MySQL",
        kategori: "Database",
        harga: 95000,
        stok: 10,
        gambar: "../assets/img/buku3.png"
    },
    {
        id: 4,
        nama: "Belajar Microsoft Excel",
        kategori: "Microsoft Office",
        harga: 80000,
        stok: 12,
        gambar: "../assets/img/buku4.png"
    },
    {
        id: 5,
        nama: "Dasar-Dasar Pemrograman",
        kategori: "Pemrograman",
        harga: 90000,
        stok: 8,
        gambar: "../assets/img/buku5.png"
    },
    {
        id: 6,
        nama: "Membuat Website Modern",
        kategori: "Web Development",
        harga: 88000,
        stok: 10,
        gambar: "../assets/img/buku6.png"
    },
    {
        id: 7,
        nama: "Algoritma dan Pemrograman",
        kategori: "Pemrograman",
        harga: 92000,
        stok: 7,
        gambar: "../assets/img/buku7.png"
    },
    {
        id: 8,
        nama: "Basis Data untuk Pemula",
        kategori: "Database",
        harga: 87000,
        stok: 9,
        gambar: "../assets/img/buku8.png"
    }
];

function ambilProduk() {
    let data = localStorage.getItem("produkBuku");

    if (!data) {
        localStorage.setItem("produkBuku", JSON.stringify(produkDefault));
        return produkDefault;
    }

    return JSON.parse(data);
}

function simpanProduk(data) {
    localStorage.setItem("produkBuku", JSON.stringify(data));
}

function ambilDiskon() {
    let data = localStorage.getItem("dataDiskon");

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

function cariDiskonProduk(idProduk) {
    const diskon = ambilDiskon();

    return diskon.find(function(item) {
        return (
            Number(item.idProduk) === Number(idProduk) &&
            item.status === "Aktif"
        );
    });
}

function hitungHargaDiskon(harga, persen) {
    const potongan = harga * persen / 100;
    return harga - potongan;
}

function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

function informasiHarga(produk) {
    const diskon = cariDiskonProduk(produk.id);

    let hargaNormal = Number(produk.harga);
    let hargaAkhir = hargaNormal;
    let persenDiskon = 0;

    if (diskon) {
        persenDiskon = Number(diskon.persen);
        hargaAkhir = hitungHargaDiskon(hargaNormal, persenDiskon);
    }

    return {
        hargaNormal: hargaNormal,
        hargaAkhir: hargaAkhir,
        persenDiskon: persenDiskon,
        adaDiskon: persenDiskon > 0
    };
}

function simpanPembelian(produk) {
    const harga = informasiHarga(produk);

    const username = localStorage.getItem("pelangganLogin");

    if (!username) {
        alert("Silakan login sebagai pelanggan terlebih dahulu!");
        return false;
    }

    const namaPelanggan =
        localStorage.getItem("namaPelangganLogin") || username;

    let riwayat =
        JSON.parse(localStorage.getItem("riwayatPembelian")) || [];

    const pembelian = {
        id: Date.now(),
        username: username,
        namaPelanggan: namaPelanggan,
        idProduk: produk.id,
        namaProduk: produk.nama,
        gambar: produk.gambar,
        hargaNormal: harga.hargaNormal,
        diskon: harga.persenDiskon,
        harga: harga.hargaAkhir,
        tanggal: new Date().toLocaleDateString("id-ID")
    };

    riwayat.push(pembelian);

    localStorage.setItem(
        "riwayatPembelian",
        JSON.stringify(riwayat)
    );

    return true;
}
