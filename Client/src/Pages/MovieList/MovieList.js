import React, { useEffect, useState } from 'react'
import MovieCard from "../../components/MovieCard/MovieCard";
import Details from "../../components/Details/Details"
import "./movieList.css"
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
const API_KEY = "3d34edc9";

const MovieList = () => {
    const [searchQuery, updateSearchQuery] = useState('');
    const [MovieList, updateMovieList] = useState([]);
    const [selectedMovie, onMovieSelect] = useState();
    const [timeoutId, updateTimeoutId] = useState();
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            navigate('/login');
            return;
        };
        setUser(JSON.parse(localStorage.getItem("user")))
        fetchData('avengers');
    }, [])


    const fetchData = async (searchString) => {
        const response = await Axios.get(
            `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
        );
        // console.log(response.data.Search);
        updateMovieList(response.data.Search);
    };
    const onTextChange = (e) => {
        // onMovieSelect("")
        clearTimeout(timeoutId);
        updateSearchQuery(e.target.value);
        const timeout = setTimeout(() => fetchData(e.target.value), 500);
        updateTimeoutId(timeout);
    };
    const logout = () => {
        localStorage.removeItem("user")
        navigate('/login')
    }
    // <img onClick={logout} className="profile" src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=" alt="" title={user?.user?.name} />
    
    return (
        <div className="main">
            <div className="header">
                <div id="Appname">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5KVHxT71ITuzT-U5VOVrLNq_0wcsL6RLo5lz52wFTgXnEYtrLiVARwAEfwgIPkaXEg9M&usqp=CAU"
                        alt=""
                    />
                    MovieApp
                </div>
                <div id="Search">
                    <input id="search_input" type="search" placeholder="Search" value={searchQuery} onChange={onTextChange} />
                </div>
                <span onClick={logout} className="logout">Logout</span>
            </div>
            <h1>Welcome {user?.user?.name}</h1>
            {selectedMovie && <Details selectedMovie={selectedMovie} onMovieSelect={onMovieSelect} />}
            <div className="movielist">
                {MovieList?.length ? MovieList.map((movie, index) => (<MovieCard key={index} movie={movie} onMovieSelect={onMovieSelect} />))
                    : <img className='home' src="https://cdn.pixabay.com/photo/2012/04/14/13/58/negative-34025__340.png" alt="Search Movie Here" />}
            </div>
        </div>
    )
}

export default MovieList
