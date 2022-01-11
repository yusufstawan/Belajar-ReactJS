import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Movie from "./components/Movie";


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

    return (
        <React.Fragment>
            <Header />
            <main className="pb-5">
                <div className="container">
                    <h2 className="py-5 text-white text-center">Best Movie</h2>
                    <div className="row">
                        {
                            movies.map((movie) => <Movie key={movie.id} movie={movie} />
                            )
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default App;
