import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const myFetch = async () => {
            try {
                let url = "https://api.themoviedb.org/3/discover/movie?api_key=248be2d424b1886d3106f9aa4d1e1079&certification_country=US&certification.lte=PG-13";
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Terjadi gangguan dengan kode: ${response.status}`)
                }
                let data = await response.json();
                setMovies(data.results)
            } catch (error) {
                console.log(error)
            }
        }
        myFetch();
    }, [])
    console.log(movies)

    return (
        <React.Fragment>
            <Header />
            <Footer />
        </React.Fragment>
    )
}

export default App;
