const RowMahasiswa = (props) => {
    return (
        <tr key={props.mahasiswa.nim}>
            <td>{props.mahasiswa.nim}</td>
            <td>{props.mahasiswa.nama}</td>
            <td>{props.mahasiswa.jurusan}</td>
            <td>{props.mahasiswa.asalProvinsi}</td>
            <td>
                <button className="btn btn-secondary me-t">Edit</button>
                <button className="btn btn-danger">Hapus</button>
            </td>
        </tr>
    )
}

export default RowMahasiswa;
