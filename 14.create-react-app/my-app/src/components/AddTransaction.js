import React, { useState, useRef } from 'react';

const AddTransaction = (props) => {

    // Format tampilan tanggal menjadi dd/mm/yyyy
    const getTanggal = () => {
        let dateObj = new Date();

        // perlu tambahan padStart() agar tanggal tampil 2 digit dengan awal 0
        let tanggal = dateObj.getDate().toString().padStart(2, "0");

        // bulan harus ditambah 1 karena getMonth() mulai dari 0 untuk januari
        let bulan = (dateObj.getMonth() + 1).toString().padStart(2, "0");

        return `${tanggal}/${bulan}/${dateObj.getFullYear()}`;
    }

    const [formInput, setFormInput] = useState({
        tanggal: getTanggal(),
        keterangan: "",
        nominal: "",
    });

    const [errors, setErrors] = useState({
        tanggal: "",
        keterangan: "",
        nominal: "",
    });

    const formValid = useRef(true);

    const handleInputChange = (event) => {
        setFormInput({ ...formInput, [event.target.name]: event.target.value })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let pesanErrors = {};

        // validasi tanggal
        if (formInput.tanggal.trim() === "") {
            pesanErrors.tanggal = "Tanggal tidak boleh kosong";
        }
        else if (!/^[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}$/.test(formInput.tanggal)) {
            pesanErrors.tanggal = "Format tanggal tidak sesuai";
        }
        else {
            pesanErrors.tanggal = "";
        }

        // validasi keterangan
        if (formInput.keterangan.trim() === "") {
            pesanErrors.keterangan = "Keterangan tidak boleh kosong";
        } else {
            pesanErrors.keterangan = "";
        }

        // validasi nominal
        if (formInput.nominal.trim() === "") {
            pesanErrors.nominal = "Nominal tidak boleh kosong";
        }
        else if (!/^[+|-]?\d+$/.test(formInput.nominal)) {
            pesanErrors.nominal = "Nominal harus angka";
        }
        else {
            pesanErrors.nominal = "";
        }

        // update error state
        setErrors(pesanErrors);

        // cek apakah seluruh form valid atau masih ada error
        formValid.current = true;
        for (let inputName in pesanErrors) {
            if (pesanErrors[inputName].length > 0) {
                formValid.current = false;
            }
        }

        // proses data jika form valid
        if (formValid.current) {

            let tanggalInput = new Date();
            tanggalInput.setDate(parseInt(formInput.tanggal.substr(0, 2)));
            tanggalInput.setMonth(parseInt(formInput.tanggal.substr(3, 2) - 1));
            tanggalInput.setFullYear(parseInt(formInput.tanggal.substr(6, 4)));

            let transaction = {
                "id": Math.floor(Math.random() * 1000000000000).toString(),
                "tanggal": tanggalInput.getTime(),
                "keterangan": formInput.keterangan,
                "nominal": parseInt(formInput.nominal),
            };

            console.log(transaction);

            // kosongkan inputan form
            setFormInput({
                tanggal: getTanggal(),
                keterangan: "",
                nominal: ""
            })
        }
    }

    return (
        <section id="add-transaction">
            <div className="container py-5">
                <h2 className="fw-light mb-3 text-center">Tambah Transaksi</h2>
                <hr className="w-75 mx-auto mb-4" />
                {!formValid.current && (
                    <div className="row">
                        <div className=" col-12 col-lg-6 error-box my-2">
                            <ul className="py-3">
                                {errors.tanggal && <li> {errors.tanggal}</li>}
                                {errors.keterangan && <li> {errors.keterangan}</li>}
                                {errors.nominal && <li> {errors.nominal}</li>}
                            </ul>
                        </div>
                    </div>)}
                <form onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-3 col-lg-2 mb-3">
                            <label htmlFor="tanggal" className="form-label">Tanggal</label>
                            <input type="text" id="tanggal" name="tanggal"
                                placeholder="dd/mm/yyy"
                                className={`form-control ${errors.tanggal && "is-invalid"}`}
                                value={formInput.tanggal} onChange={handleInputChange} />
                        </div>
                        <div className="col-12 col-md-6 col-lg-5 mb-3">
                            <label htmlFor="Keterangan" className="form-label">
                                Keterangan</label>
                            <input type="text" id="keterangan" name="keterangan"
                                placeholder="Bayar Cicilan"
                                className={`form-control ${errors.keterangan && "is-invalid"}`}
                                value={formInput.keterangan} onChange={handleInputChange} />
                        </div>
                        <div className="col-12 col-md-3 col-lg-3 mb-3">
                            <label htmlFor="nominal" className="form-label">
                                Nominal* (+/-)</label>
                            <input type="text" id="nominal" name="nominal"
                                placeholder="-150000"
                                className={`form-control ${errors.nominal && "is-invalid"}`}
                                value={formInput.nominal} onChange={handleInputChange} />
                        </div>
                        <div className="col-12 col-lg-2 mb-3 d-flex align-items-end">
                            <button type="submit" className="btn btn-primary flex-fill">
                                Tambah</button>
                        </div>
                    </div>
                    <p><small>* Jika diisi angka negatif,
                        akan tercatat di pengeluaran</small></p>
                </form>
            </div>
        </section>
    )
}

export default AddTransaction;
