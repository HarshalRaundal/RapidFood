import React, { useState} from 'react';
import Footer from '../components/Footer';
import Navigationbar from '../components/Navbar';
import { BsPersonCircle } from 'react-icons/bs';
import { FaAddressCard } from 'react-icons/fa';
import { AiTwotoneMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link ,useNavigate} from 'react-router-dom';

export default function SignUp() {
    let navigate = useNavigate();

    const [userData , setUserData] = useState({name:"",email:"",password:"",location:""});

    const handleInput= (e) =>{
        setUserData({...userData , [e.target.name] : e.target.value});
    }
    const handleSignUp = async(e) =>{
        //synthetic event
        e.preventDefault();
        //check for data validation <- handled in backend
        //register user
        const response = await fetch('http://localhost:5000/api/createUser',{
            method : 'POST',
            headers :{
                'Content-Type' : 'application/json'
            },
            body :JSON.stringify(userData)
        });

        const isValid = await response.json();

        console.log(isValid);
        
        if(!isValid.success) {
            alert('Enter valid Credentials!!!');
        }
        //print response from server
        console.log(isValid);
        //redirect to signIn page
        if(isValid.success) {navigate("/signIn");}
    }
    return (
        <>
            <Navigationbar />
            <div className=' container-fluid  row align-items-center justify-content-center p-0 m-0  border' style={{ height: "95vh" }} >
                <div className='left  col-md-6 col-lg-6 d-none d-sm-flex align-items-center m-0 p-0'   style={{ height: "100%" }}>
                    <div className='container w-100 h-100 m-0 p-0'>
                    <img src="https://source.unsplash.com/random/900×700/?food" className="w-100" alt="..." 
                    style={{ filter: "brightness(30%)", maxHeight: "100%", objectFit: "cover !important", objectPosition: "center center" }} />
                    </div>
                   
                </div>
                <div className='right  col-xs-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center '>
                    <form className='w-100 p-2 m-2 p-lg-5 m-lg-5 ' onSubmit={handleSignUp}>
                        <div className="mb-3 d-flex ">
                            <div className='fs-2  d-flex align-items-top mx-2' ><BsPersonCircle /> </div>
                            <label htmlFor="name" className="form-label  w-100">
                                <input type="text" className="form-control d-inline" id="name" placeholder='Username' name='name' onChange={handleInput} value={userData.name}/>
                            </label>


                        </div>
                        <div className="mb-3 d-flex ">
                            <div className='fs-2  d-flex align-items-top mx-2' ><FaAddressCard /> </div>
                            <label htmlFor="location" className="form-label  w-100">
                                <input type="text" className="form-control d-inline" id="location" name= 'location' onChange = {handleInput} placeholder='Address'  value={userData.location}/>
                            </label>


                        </div>
                        <div className="mb-3 d-flex">
                            <div className='fs-2  d-flex align-items-top mx-2 ' ><AiTwotoneMail /> </div>
                            <label htmlFor="exampleInputEmail1 " className="form-label  w-100">
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleInput} placeholder='Email'  value={userData.email}/>
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </label>


                        </div>
                        <div className="mb-3 d-flex ">
                            <div className='fs-2  d-flex align-items-top mx-2 ' ><RiLockPasswordFill /> </div>
                            <label htmlFor="exampleInputPassword1 " className="form-label w-100">
                                <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleInput} value={userData.password} placeholder='Password' />
                            </label>

                        </div>

                        <button type="submit" className="btn btn-primary mx-2" >Submit</button>
                        <Link to='/signIn'  className="btn btn-danger mx-2" > Alredy a user !</Link >
                        
                    </form>

                </div>
            </div>

            <Footer />
        </>
    )
}
