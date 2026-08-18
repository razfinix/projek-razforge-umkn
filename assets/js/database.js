/* =====================================================
   DATABASE SISTEM JASA JUAL BUKU
   ===================================================== */


/* =====================================================
   DATA PRODUK DEFAULT
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


/* =====================================================
   FUNGSI GAMBAR BERDASARKAN ID PRODUK
   ===================================================== */

function gambarProduk(id) {

    const daftarGambar = {

        1: "../assets/img/buku1.png",

        2: "../assets/img/buku2.png",

        3: "../assets/img/buku3.png",

        4: "../assets/img/buku4.png",

        5: "../assets/img/buku5.png",

        6: "../assets/img/buku6.png",

        7: "../assets/img/buku7.png",

        8: "../assets/img/buku8.png"

    };

    return daftarGambar[id] || "../assets/img/buku1.png";

}


/* =====================================================
   AMBIL PRODUK
   ===================================================== */

function ambilProduk() {

    let data = localStorage.getItem("produkBuku");


    /* ==========================================
       JIKA BELUM ADA DATA
       ========================================== */

    if (!data) {

        localStorage.setItem(
            "produkBuku",
            JSON.stringify(produkDefault)
        );

        return produkDefault;

    }


    let produk = JSON.parse(data);


    /* ==========================================
       PERBAIKI GAMBAR PRODUK LAMA
       ========================================== */

    produk.forEach(function(item) {

        item.gambar = gambarProduk(
            Number(item.id)
        );

    });


    /* ==========================================
       SIMPAN KEMBALI DATA YANG SUDAH DIPERBAIKI
       ========================================== */

    localStorage.setItem(
        "produkBuku",
        JSON.stringify(produk)
    );


    return produk;

}


/* =====================================================
   SIMPAN PRODUK
   ===================================================== */

function simpanProduk(data) {

    localStorage.setItem(
        "produkBuku",
        JSON.stringify(data)
    );

}


/* =====================================================
   DISKON
   ===================================================== */

function ambilDiskon() {

    let data =
        localStorage.getItem("dataDiskon");


    if (!data) {

        return [];

    }


    return JSON.parse(data);

}


/* =====================================================
   CARI DISKON BERDASARKAN PRODUK
   ===================================================== */

function cariDiskonProduk(idProduk) {

    const diskon =
        ambilDiskon();


    return diskon.find(function(item) {

        return (

            Number(item.idProduk)
            ===
            Number(idProduk)

            &&

            item.status === "Aktif"

        );

    });

}


/* =====================================================
   HITUNG HARGA DISKON
   ===================================================== */

function hitungHargaDiskon(
    harga,
    persen
) {

    const potongan =
        harga * persen / 100;


    return harga - potongan;

}


/* =====================================================
   FORMAT RUPIAH
   ===================================================== */

function formatRupiah(angka) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(angka);

}


/* =====================================================
   INFORMASI HARGA PRODUK
   ===================================================== */

function informasiHarga(produk) {

    const diskon =
        cariDiskonProduk(
            produk.id
        );


    let hargaNormal =
        Number(produk.harga);


    let hargaAkhir =
        hargaNormal;


    let persenDiskon = 0;


    if (diskon) {

        persenDiskon =
            Number(diskon.persen);


        hargaAkhir =
            hitungHargaDiskon(
                hargaNormal,
                persenDiskon
            );

    }


    return {

        hargaNormal:
            hargaNormal,

        hargaAkhir:
            hargaAkhir,

        persenDiskon:
            persenDiskon,

        adaDiskon:
            persenDiskon > 0

    };

}


/* =====================================================
   SIMPAN PEMBELIAN
   ===================================================== */

function simpanPembelian(produk) {

    const harga =
        informasiHarga(
            produk
        );


    const username =
        localStorage.getItem(
            "pelangganLogin"
        );


    if (!username) {

        alert(
            "Silakan login sebagai pelanggan terlebih dahulu!"
        );

        return false;

    }


    const namaPelanggan =
        localStorage.getItem(
            "namaPelangganLogin"
        )
        ||
        username;


    let riwayat =
        JSON.parse(
            localStorage.getItem(
                "riwayatPembelian"
            )
        )
        ||
        [];


    const pembelian = {

        id:
            Date.now(),

        username:
            username,

        namaPelanggan:
            namaPelanggan,

        idProduk:
            produk.id,

        namaProduk:
            produk.nama,

        kategori:
            produk.kategori,

        gambar:
            gambarProduk(
                Number(produk.id)
            ),

        hargaNormal:
            harga.hargaNormal,

        diskon:
            harga.persenDiskon,

        harga:
            harga.hargaAkhir,

        tanggal:
            new Date().toLocaleDateString(
                "id-ID"
            )

    };


    riwayat.push(
        pembelian
    );


    localStorage.setItem(

        "riwayatPembelian",

        JSON.stringify(
            riwayat
        )

    );


    return true;

}