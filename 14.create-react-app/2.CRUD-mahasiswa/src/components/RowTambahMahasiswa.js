import React, { useState } from "react";

const RowTambahMahasiswa = (props) => {

    // state untuk inputan form
    const [formInput, setFormInput] = useState({
        nim: "",
        nama: "",
        jurusan: "",
        asalProvinsi: "",
    });

    // state untuk menampung pesan error
    const [errors, setErrors] = useState({
        nim: "",
        nama: "",
        jurusan: "",
        asalProvinsi: ""
    });

    // function untuk membuat 2 ways binding antara form dengan state
    const handleInputChange = (event) => {
        setFormInput({ ...formInput, [event.target.name]: event.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let pesanErrors = {};

        // function untuk memeriksa apakah ada nim yang sama atau tidak
        const cekDuplikasiNim = () => {
            return (props.mahasiswas.find((mahasiswa) =>
                mahasiswa.nim === formInput.nim))
        }

        // validasi nim
        if (formInput.nim.trim() === "") {
            pesanErrors.nim = "Nim tidak bolek kosong"
        } else if (!/^[0-9]{8}$/.test(formInput.nim)) {
            pesanErrors.nim = "Nim harus 8 karakter angka"
        } else if (cekDuplikasiNim()) {
            pesanErrors.nim = "Nim sudah dipakai"
        }
        else {
            pesanErrors.nim = "";
        }

        // validasi nama
        if (formInput.nama.trim() === "") {
            pesanErrors.nama = "Nama tidak boleh kosong";
        } else {
            pesanErrors.nama = "";
        }

        // validasi jurusan
        if (formInput.jurusan.trim() === "") {
            pesanErrors.jurusan = "Jurusan tidak boleh kosong";
        } else {
            pesanErrors.jurusan = "";
        }

        // validasi asalProvinsi
        if (formInput.asalProvinsi.trim() === "") {
            pesanErrors.asalProvinsi = "Asal Provinsi tidak boleh kosong";
        } else {
            pesanErrors.asalProvinsi = "";
        }

        // update error state
        setErrors(pesanErrors);

        // cek apakah seluruh form valid atau masih ada error
        let formValid = true;
        for (let inputName in pesanErrors) {
            if (pesanErrors[inputName].length > 0) {
                formValid = false;
            }
        }

        // proses data jika form valid
        if (formValid) {
            props.onTambahMahasiswa(formInput);

            // kosongkan inputan form
            setFormInput({
                nim: "",
                nama: "",
                jurusan: "",
                asalProvinsi: "",
            })
        }
    }

    return (
        <tr>
            <td colSpan={5}>
                <form onSubmit={handleFormSubmit}>
                    <div className="row row-cols-5 g-3">
                        <div className="col">
                            <input type="text" className="form-control"
                                name="nim" placeholder="00000000" onChange={handleInputChange} value={formInput.nim} />
                            {errors.nim && <small>{errors.nim}</small>}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control"
                                name="nama" placeholder="Fulan Fulana" onChange={handleInputChange} value={formInput.nama} />
                            {errors.nama && <small>{errors.nama}</small>}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control"
                                name="jurusan" placeholder="Sistem Informasi" onChange={handleInputChange} value={formInput.jurusan} />
                            {errors.jurusan && <small>{errors.jurusan}</small>}
                        </div>
                        <div className="col">
                            <input type="text" className="form-control"
                                name="asalProvinsi" placeholder="DKI Jakarta" onChange={handleInputChange} value={formInput.asalProvinsi} />
                            {errors.asalProvinsi && <small>{errors.asalProvinsi}</small>}
                        </div>
                        <div className="col">
                            <button type="submit" className="btn btn-primary">Tambah</button>
                        </div>
                    </div>
                </form>
            </td>
        </tr>
    )
}

export default RowTambahMahasiswa;
