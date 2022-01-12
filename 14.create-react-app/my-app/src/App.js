import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Movie from "./components/Movie";

// Generate genre
const genres = [
    { "id": "", "name": "All" },
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 16, "name": "Animation" },
    { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" },
    { "id": 99, "name": "Documentary" },
    { "id": 18, "name": "Drama" },
    { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" },
    { "id": 36, "name": "History" },
    { "id": 27, "name": "Horror" },
    { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" },
    { "id": 10749, "name": "Romance" },
    { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" },
    { "id": 53, "name": "Thriller" },
    { "id": 10752, "name": "War" },
    { "id": 37, "name": "Western" }
];

// Generate tahun
let years = [];
const thisYear = new Date().getFullYear();
for (let i = 0; i < 10; i++) {
    years.push(thisYear - i)
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [year, setYear] = useState(thisYear);
    const [genreId, setGenreId] = useState("");
    const [genreName, setGenreName] = useState("All");
    const [page, setPage] = useState(1);

    const handleYearChange = (event) => {
        // untuk mengambil tahun dari select
        setYear(event.target.value)

        // untuk reset page
        setPage(1)
    }

    const handleGenreChange = (event) => {
        setGenreId(event.target.value)
        // untuk mengambil nama genre dari <select>
        let index = event.target.selectedIndex
        setGenreName(event.target[index].text)

        setPage(1)
    }

    const handleMoreClick = () => {
        setPage(prevPage => prevPage + 1)
    }

    useEffect(() => {
        const myFetch = async () => {
            try {
                let url = `https://api.themoviedb.org/3/discover/movie`;
                url += `?api_key=03ba3f08aa74bf56d5c7f2aa868aad00`;
                url += `&certification_country=US`;
                url += `&certification.lte=PG-13`;
                url += `&primary_release_year=${year}`;
                url += `&with_genres=${genreId}`;
                url += `&page=${page}`;

                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Terjadi gangguan dengan kode: ${response.status}`)
                }
                let data = await response.json();
                if (page === 1) {
                    setMovies(data.results);
                } else {
                    setMovies((prevMovie) => [...prevMovie, ...data.results])
                }
            } catch (error) {
                console.log(error)
            }
        }
        myFetch();
    }, [year, genreId, page])

    return (
        <React.Fragment>
            <Header />

            <nav>
                <div className="container text-white">
                    <div className="row">
                        <div className="col d-flex align-items-center">
                            <hr className="flex-grow-1 me-3" />
                            <small>powered by themoviedb.org</small>
                        </div>
                        <div className="col-3 d-flex">
                            <div className="me-3">
                                <label htmlFor="year" className="form-label">Year</label>
                                <select className="form-select" onChange={handleYearChange} value={year} id="year">
                                    {
                                        years.map((year) =>
                                            <option key={year.toString()} value={year}>
                                                {year}
                                            </option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <label htmlFor="genre" className="form-label">Genre</label>
                                <select className="form-select" onChange={handleGenreChange} value={genreId} id="genre">
                                    {
                                        genres.map((genre) =>
                                            <option key={genre.id} value={genre.id}>
                                                {genre.name}
                                            </option>)
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pb-5">
                <div className="container">
                    <h2 className="py-5 text-white text-center">
                        {`Best Movie ${year}, Genre: ${genreName}`}
                    </h2>
                    <div className="row">
                        {
                            movies.map((movie) => <Movie key={movie.id} movie={movie} />
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <button className="btn btn-dark" onClick={handleMoreClick}>
                                Load More...
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default App;
