import { useState } from 'react'
import logo from '../assets/logo2.png'
import { useStateContext } from '../contexts/StateContext'
import { FaPowerOff, FaSearch, FaSleigh } from "react-icons/fa";
import { Link } from 'react-router-dom'
import {BiMenuAltRight} from 'react-icons/bi'
import {IoCloseOutline} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';


const Nav = ({ isScrolled,fetch }) => {
   const [showMenu, setShowMenu] = useState(false)
    
    if (showMenu){
        document.getElementById("links").style.display = "flex"
    }
    
    function hide() {
        setShowMenu(false)
        document.getElementById("links").style.display = "none"
    
    }

    /*-toggll--*/

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
        { name: "Home", link: "/main" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
    ];

    const handleClick = () => {
        setShowModal(true)
        setIsSignup(false)
    }

    const logout = () => {
        navigate('/')
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

                    <ul id="links" className="links flex">
                        <button className='close-menu' onClick={() => hide()}>
                           <IoCloseOutline/>
                        </button>
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
                        <button className='signout' onClick={() => logout()}>
                            <FaPowerOff />
                        </button>
                        <button className='menu' onClick={()=>setShowMenu(true)}>
                            <BiMenuAltRight/>
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