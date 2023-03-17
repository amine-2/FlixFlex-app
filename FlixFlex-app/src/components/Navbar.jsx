import { useState } from 'react'
import logo from '../assets/logo2.png'
import { useStateContext } from '../contexts/StateContext'
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Nav = ({ isScrolled,fetch }) => {

    const navigate= useNavigate()

    const {
        showModal,
        setShowModal,
        setIsSignup,
        loggedIn,
        cookies,
        removeCookie,
        setSearchKey
     } = useStateContext()

        const [showSearch, setShowSearch] = useState(false);
        const [inputHover, setInputHover] = useState(false);

    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
    ];

    const handleClick = () => {
        setShowModal(true)
        setIsSignup(false)
    }

    const logout = () => {
        navigate('/landing')
        removeCookie('UserId', cookies.UserId)
        removeCookie('AuthToken', cookies.AuthToken)
        window.location.reload()
      }

    return (
        <>
            {loggedIn ?
                <nav className={isScrolled ? "scrolled" : "nav"}>

                    <div className="logo-container">
                        <img src={logo} className="logo" />
                    </div>

                    <ul className="links flex">
                        {links.map(({ name, link }) => {
                            return (
                                <li key={name}>
                                    <Link to={link}>{name}</Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="right flex a-center">
                        <form onSubmit={fetch}>
                        <div className={`search ${showSearch ? "show-search" : ""}`}>
                            <button
                                onFocus={() => setShowSearch(true)}
                                onBlur={() => {
                                    if (!inputHover) {
                                        setShowSearch(false);
                                    }
                                }}
                            >
                                <FaSearch />
                            </button>
                            <input
                                type="text"
                                onInput={(event) => setSearchKey(event.target.value)}
                                placeholder="Search"
                                onMouseEnter={() => setInputHover(true)}
                                onMouseLeave={() => setInputHover(false)}
                                onBlur={() => {
                                    setShowSearch(false);
                                    setInputHover(false);
                                }}
                            />
                        </div>
                        </form>
                        <button onClick={() => logout()}>
                            <FaPowerOff />
                        </button>
                    </div>

                </nav>:                <nav className={isScrolled ? "scrolled" : "nav"}>
                    <div className="logo-container">
                        <img className="logo" src={logo} />
                    </div>

                    <button className='nav-button'
                        onClick={handleClick}
                        disabled={showModal}> Log in
                    </button>
                </nav> 

            }
        </>
    )
}
export default Nav