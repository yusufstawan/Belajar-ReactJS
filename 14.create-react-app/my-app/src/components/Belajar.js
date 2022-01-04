import React, { useState, useEffect, Fragment } from "react"
import Tombol from "./Tombol"
import styles from "./Belajar.module.css"

const Belajar = () => {
    const [judul, setJudul] = useState("React")

    useEffect(() => {
        console.log("Judul diubah menjadi:", judul)
    }, [judul])

    const handleTombolClick = (judul) => {
        setJudul(judul)
    }
    return (
        <Fragment>
            <div>
                <h1 className={styles.judul}>Belajar {judul}</h1>
                <Tombol onTombolClick={handleTombolClick}>React</Tombol>
                <Tombol onTombolClick={handleTombolClick}>JavaScript</Tombol>
            </div>
        </Fragment>
    )
}

export default Belajar;
