
import Landing from './pages/landingPage/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import Player from './pages/player/Player';
import Movies from './pages/Movies/Movies';
import Series from './pages/Series/Series'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStateContext } from './contexts/StateContext';
import { useCookies } from 'react-cookie';

function App() {
  const[cookies,setCookie,removeCookie]=useCookies(['user'])
  const authtoken = cookies.AuthToken
  return (
    <BrowserRouter>
      <Routes>
       <Route path={"/"} element={<Landing />} />
        <Route path={"/main"} element={<Dashboard/>} />
        {authtoken && <Route path={"/player"} element={<Player/>} />} 
        {authtoken && <Route path={"/movies"} element={<Movies/>} />} 
        {authtoken && <Route path={"/tv"} element={<Series/>} />} 
      </Routes>
    </BrowserRouter>
  )
}

export default App
