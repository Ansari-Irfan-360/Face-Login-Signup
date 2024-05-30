import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import MovieList from './Pages/MovieList/MovieList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MovieList />} />
      </Routes>
    </div>
  );
}

export default App;
