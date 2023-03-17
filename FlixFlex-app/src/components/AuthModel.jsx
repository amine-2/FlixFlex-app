import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useStateContext } from "../contexts/StateContext"

import axios from "axios"



const AuthModel = () => {

    const { userName,
        setUserName,
        password,
        setPassword,
        confirmPssword,
        setConfirmPassword,
        setShowModal,
        isSignup,
        setCookie,
    } = useStateContext()


    const [error, setError] = useState(null)
    let navigate = useNavigate()

    const handleClick = () => {
        setShowModal(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isSignup && (password !== confirmPssword)) {

                setError("password need to match")
                return

            }

            const response = await axios.post(`http://localhost:8000/${isSignup ? 'signup' : 'login'}`, { userName, password })
            

            setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)


            const success = response.status === 201
            setTimeout(() => {
                if (success ) navigate('/main')     
            }, 1000);





        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="auth-modal">
            <AiOutlineCloseCircle className="close-tag" onClick={handleClick} />
            <h2> {isSignup ? "CREATE AN ACCOUNT" : "LOG IN"} </h2>
            <p>By clicking on log in , You agree on the terms, Learn how we process your data in our pravicy policy and coockies policy</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="User Name"
                    required={true}
                    onChange={(e) => setUserName(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {isSignup && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confim password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}

                <input className="secondary-button" type="submit" />


            </form>

            <p> {error} </p>
            <h2>GET THE APP</h2>
        </div>
    )
}
export default AuthModel