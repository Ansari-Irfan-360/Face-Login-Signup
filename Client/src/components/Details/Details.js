import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "./details.css"
const API_KEY = "3d34edc9"

const Details = (props) => {
    const [movieInfo, setMovieInfo] = useState();
    let { selectedMovie, onMovieSelect } = props;
    // console.log(selectedMovie);
    useEffect(() => {
        Axios.get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
            .then((response) => { setMovieInfo(response.data); console.log(response.data) });
    }, [selectedMovie]);
    return (
        <div className='details'>
            {movieInfo ? <>
                <img className='poster' src={movieInfo?.Poster} alt="" />
                <div className='content'>
                    <span className='MovieName'>{movieInfo?.Type}: <span>{movieInfo?.Title}</span></span>
                    <span className='MovieInfo'>Year: <span>{movieInfo?.Year}</span></span>
                    <span className='MovieInfo'>IMDB Rating: <span>{movieInfo?.imdbRating}</span></span>
                    <span className='MovieInfo'>Language: <span>{movieInfo?.Language}</span></span>
                    <span className='MovieInfo'>Released: <span>{movieInfo?.Released}</span></span>
                    <span className='MovieInfo'>Runtime: <span>{movieInfo?.Runtime}</span></span>
                    <span className='MovieInfo'>Director: <span>{movieInfo?.Director}</span></span>
                    <span className='MovieInfo'>Actors: <span>{movieInfo?.Actors}</span></span>
                    <span className='MovieInfo'>Awards: <span>{movieInfo?.Awards}</span></span>
                    <span className='MovieInfo'>BoxOffice: <span>{movieInfo?.BoxOffice}</span></span>
                    <span className='MovieInfo'>Plot: <span>{movieInfo?.Plot}</span></span>
                </div>
                <div className='close' onClick={() => onMovieSelect()}>X</div>
            </> : "Loading..."}
        </div>
    )
}

export default Details