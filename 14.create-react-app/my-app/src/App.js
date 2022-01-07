import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const initTransactions = [
    {
        "id": "619941345654",
        "tanggal": new Date("01 Nov 2021 9:30").getTime(),
        "keterangan": "Gaji bulanan",
        "nominal": 2500000
    },
    {
        "id": "741941345654",
        "tanggal": new Date("23 Nov 2021 10:30").getTime(),
        "keterangan": "Uang Lembur",
        "nominal": 75000
    },
    {
        "id": "568941345654",
        "tanggal": new Date("24 Sept 2021 10:00").getTime(),
        "keterangan": "Gaji bulanan",
        "nominal": -250000
    }
]

const App = () => {
    const [transactions, setTransaction] = useState(initTransactions);
    console.log(transactions)
    return (
        <React.Fragment>
            <Header />
            <Footer />
        </React.Fragment>
    )
}

export default App;
