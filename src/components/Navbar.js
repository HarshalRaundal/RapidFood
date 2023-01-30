import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BsFillCartCheckFill } from 'react-icons/bs';
import { useCart } from './CartContext';
import Modal from '../Modal';
import Cart from '../screens/Cart';
function Navigationbar() {

    const [cartView, setCartView] = useState(false);
    const naviagte = useNavigate();
    let cartData = useCart();
    const handleSignOut = () => {

        console.log("authToken : ", localStorage.getItem("authToken"));
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        console.log("Logged Out");
        console.log("authToken : ", localStorage.getItem("authToken"));
        naviagte('/signIn');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link className="navbar-brand fs-3" to="/">RapidFood</Link>

                <div className="collapse navbar-collapse justify-content-between " id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active d-flex">
                            <Link className="nav-link" to="/">Home </Link>
                            {(localStorage.getItem("authToken")) != null && (<Link className="nav-link" to="/orders">My orders </Link>)}
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0 m-2">
                        {(localStorage.getItem("authToken")) != null ?
                            (
                                <>
                                    <div className="btn  my-2 my-sm-0 m-2  " >
                                        <div className='fs-3  d-flex align-items-top mx-2 ' >
                                            <div className='position-relative m-1 ' onClick={() => { setCartView(!cartView) }}>
                                                <BsFillCartCheckFill />
                                                <span className="position-absolute top-0 fs-6 start-100 translate-middle badge rounded-pill bg-danger">
                                                    {cartData.length}
                                                </span>
                                            </div>
                                            {cartView &&
                                                <div>
                                                    <Modal>
                                                        <Cart onClose = {() => setCartView(false)}/>
                                                    </Modal>
                                                </div>}
                                        </div>
                                    </div>
                                    <div className="btn btn-dark my-2 my-sm-0 m-2  " onClick={handleSignOut}>SignOut</div>

                                </>
                            ) :
                            (<><Link className="btn btn-outline-success my-2 my-sm-0 m-2" to='/signIn'>SignIn</Link>
                                <Link className="btn btn-outline-success my-2 my-sm-0 m-2" to='/signUp'>SignUp</Link></>)

                        }
                    </form>
                </div>


            </nav>
        </>
    );
}

export default Navigationbar;
