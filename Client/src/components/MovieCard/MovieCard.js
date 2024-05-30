import React from 'react'
import "./movieCard.css"
const MovieCard = (props) => {
    return (
        <div className='moviecard' onClick={() => props.onMovieSelect(props.movie.imdbID)}>
            <img src={props.movie.Poster} alt="" />
            <span className='title'>{props.movie.Title}</span>
            <div className='column2'>
                <span className='year'>Year: {props.movie.Year}</span>
                <span className='movie'>Type: {props.movie.Type}</span>
            </div>
        </div>
    )
}

export default MovieCard