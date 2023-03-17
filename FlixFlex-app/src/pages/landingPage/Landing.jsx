import Nav from "../../components/Navbar";
import AuthModel from "../../components/AuthModel";
import { useStateContext } from "../../contexts/StateContext"; 


const Landing = () => {
    const {
        showModal,
        setShowModal, 
        setIsSignup}=useStateContext()


    const clickHandle = () => {
        setShowModal(true)
        setIsSignup(true)
    }

    return (


        <div className="overlay">
            <Nav
                minimal={false}
            ></Nav>
            <div className="home">
                <h1 className="primary-title">FlixFlex</h1>

                <h2 className="primary-text">Watch your favorit movies for
                 free with FLIXFLEX. signup now! </h2>
                <button className="primery-button" onClick={clickHandle}>
                     create an account
                </button>
                {showModal && (<AuthModel/>)}
            </div>
        </div>
    )
}
export default Landing