import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Transaction from './components/Transaction';
import SaldoBox from './components/SaldoBox';
import AddTransaction from './components/AddTransaction';

let url = "https://expense-tracker-react-11057-default-rtdb.";
url += "asia-southeast1.firebasedatabase.app";
url += "/transaction.json";

const App = () => {
    const [transactions, setTransaction] = useState([]);
    const [submitCount, setSubmitCount] = useState(0);

    // Use effect untuk mengakses data dari API firebase
    useEffect(() => {
        const myFetch = async () => {
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.status);
                }
                let responseData = await response.json();

                const initTansactions = [];
                for (const key in responseData) {
                    initTansactions.push({
                        id: key,
                        tanggal: responseData[key].tanggal,
                        keterangan: responseData[key].keterangan,
                        nominal: responseData[key].nominal,
                    })
                }
                console.log(JSON.stringify(initTansactions));
                // atur ulang urutan transaction agar tanggal terkecil di bagian atas
                initTansactions.sort((a, b) => a.tanggal - b.tanggal);

                setTransaction(initTansactions);
            }

            catch (error) {
                console.log(`Terjadi gangguan dengan pesan: "${error}"`);
            }
        }
        myFetch();
    }, [submitCount]);

    // handler untuk menambah data transaction, 
    // akan di-trigger dari komponen AddTransaction
    const handleTambahTransaction = async (data) => {
        // Kirim data ke server (firebase)
        try {
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
            })

            const newTransactions = [
                ...transactions, data
            ];

            newTransactions.sort((a, b) => a.tanggal - b.tanggal);
            setTransaction(newTransactions)

            if (!response.ok) {
                throw new Error(response.status);
            }
            setSubmitCount(submitCount + 1);
        }
        catch (error) {
            console.log(`Terjadi gangguan dengan pesan: "${error}"`);
        }
    }

    // handler untuk menghapus data transaction di komponen AddTransaction
    const handleHapusTransaction = async (e) => {
        // Rangkai alamat URL agar berisi id data yang dihapus

        let url = "https://expense-tracker-react-11057-default-rtdb.";
        url += "asia-southeast1.firebasedatabase.app";
        url += "/transaction/";
        url += `${e.target.id}.json`;

        // Kirim delete request ke server (firebase)
        try {
            let response = await fetch(url, {
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error(response.status);
            }
            setSubmitCount(submitCount + 1)
        }
        catch (error) {
            console.log(`Terjadi gangguan dengan pesan: "${error}"`);
        }
    }

    return (
        <React.Fragment>
            <Header />
            <SaldoBox transactions={transactions} />
            <Transaction transactions={transactions}
                onHapusTransaction={handleHapusTransaction} />
            <AddTransaction onTambahTransaction={handleTambahTransaction} />
            <Footer />
        </React.Fragment>
    )
}

export default App;
