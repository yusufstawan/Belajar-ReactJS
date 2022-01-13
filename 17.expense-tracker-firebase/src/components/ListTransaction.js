const ListTransaction = (props) => {

    // Atur tanggal untuk tampilan
    const getTanggal = (tanggal) => {
        let dateObj = new Date(tanggal);

        const arrBulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];

        let bulan = arrBulan[dateObj.getMonth()];
        return `${dateObj.getDate()} ${bulan} ${dateObj.getFullYear()}`;
    }

    // untuk menentukan style list transaction (warna border kiri)
    let classTransaction = (props.nominal > 0) ?
        "list-pemasukan" : "list-pengeluaran";

    return (
        <div className={`list-transaction p-1 mb-2 ${classTransaction}`}>
            <div className="ms-2 d-flex flex-column">
                <p className="m-0 fs-5">{props.keterangan}</p>
                <small>{getTanggal(props.tanggal)}</small>
            </div>
            <p className="fs-5 mb-1 me-3 text">
                Rp. {props.nominal.toLocaleString('id-ID')}
            </p>
            <span className="delete-icon" id={props.id} onClick={props.onHapusTransaction} >x</span>
        </div>
    )
}

export default ListTransaction;
