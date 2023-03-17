import React, {
    createContext, useContext,
    useState, useEffect
} from "react";
import {useCookies} from 'react-cookie'

const Context = createContext()

export const StateContext = ({ children }) => {

    const [userName, setUserName] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPssword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [isSignup, setIsSignup] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    //authModalstate

    const [cookies , setCookie , removeCookie] = useCookies (['user'])
    //cookies 
    

    const [searchKey, setSearchKey] = useState("")
    //searchkey

    const [trailer, setTrailer] = useState(null)
   

    return (
        <Context.Provider
            value={{
                userName,
                setUserName,
                password,
                setPassword,
                confirmPssword,
                setConfirmPassword,
                error,
                setError,
                showModal,
                setShowModal,
                isSignup, 
                setIsSignup,
                cookies,
                setCookie, 
                removeCookie,
                loggedIn,
                setLoggedIn,
                searchKey, 
                setSearchKey,
                trailer,
                setTrailer
                
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)