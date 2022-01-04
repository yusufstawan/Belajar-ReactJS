import React, { useState } from "react";
import RowMahasiswa from "./components/RowMahasiswa"
import RowTambahMahasiswa from "./components/RowTambahMahasiswa"

// Data awal tabel mahasiswa
const arrMahasiswas = [
    {
        nim: "18010245",
        nama: "Eka Putra",
        jurusan: "Teknik Informatika",
        asalProvinsi: "DKI Jakarta"
    },
    {
        nim: "19010214",
        nama: "Lisa Permata",
        jurusan: "Sistem Informasi",
        asalProvinsi: "Simatera Barat"
    },
    {
        nim: "20010710",
        nama: "Rudi Setiawan",
        jurusan: "Ilmu Komputer",
        asalProvinsi: "Jawa Tengah"
    },
    {
        nim: "20010790",
        nama: "Friska Ramadhani",
        jurusan: "Ilmu Komputer",
        asalProvinsi: "Kalimantan Barat"
    }
];

const App = () => {
    const [mahasiswas, setMahasiswas] = useState(arrMahasiswas);

    return (
        <div className="container mt-5">
            <div className="row mt-5">
                <div className="col">
                    <h1 className="text-center">Tabel Mahasiswa</h1>

                    <table className="table mt-4">
                        <thead>
                            <tr>
                                <th>NIM</th>
                                <th>Nama</th>
                                <th>Jurusan</th>
                                <th>Asal Provinsi</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                mahasiswas.map((mahasiswa) =>
                                    <RowMahasiswa
                                        key={mahasiswa.nim}
                                        mahasiswa={mahasiswa}
                                    />
                                )
                            }
                            <RowTambahMahasiswa />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default App;
