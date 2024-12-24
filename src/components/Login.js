import React, { useRef, useState } from 'react'
import {checkValidateData} from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import Header from './Header';

const Login = () => {
    const navigate= useNavigate();
    const dispath=useDispatch()

    const [isSignInForm, setIsSignInForm]= useState(true);
    const[errorMessage, setErrorMessage]=useState(null);

    const email= useRef(null);
    const password=useRef(null);

    const handleButton=()=>{
        const errorMsg=checkValidateData(email.current.value,password.current.value);
        setErrorMessage(errorMsg);
        // console.log(email);
        // console.log(password);

        if(errorMessage){
            return;
        }

        if(!isSignInForm){
            //sign-up form
            createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    // console.log(user);
                    navigate("/browse")

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMSG = error.message;
                    setErrorMessage(errorCode + "-"+ errorMSG);
                });

        }else{
            // log in form
            signInWithEmailAndPassword(auth, email.current.value,password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: user.current.value, photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBfQx521fbZr48l8-ozCiI9DCLDIMX6GiIuA&s"
                      }).then(() => {
                        const {uid,email,displayName,photoURL} = auth.currentUser //getting the current updated value
                        dispath(addUser({
                            uid:uid, 
                            email:email , 
                            displayName:displayName,
                            photoURL: photoURL
                        }))
                        navigate("/browse")
                      }).catch((error) => {
                        setErrorMessage(error.message)
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMSG = error.message;
                    setErrorMessage(errorCode + "-"+ errorMSG);
                });
        }
    }
    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm);
    }
  return (

    <div>
        <Header/>
        <div className='absolute'>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg'
            alt='logo'>
            </img>
        </div>

        <form
            onSubmit={(e)=>{
                e.preventDefault();
                handleButton();
            }} 
            className='absolute w-3/12 p-10 rounded-lg bg-black text-black my-36 mx-auto right-0 left-0 bg-opacity-80'>
            <h1 
                className='text-2xl text-white font-bold p-2 m-2'
            >
                {isSignInForm? "Login" :"Sign Up"}
            </h1>
            {!isSignInForm?
                <input 
                    type='text' 
                    placeholder='Username' 
                    className='rounded-md p-2 m-2 w-full text-white bg-gray-600'/>:""}
            {!isSignInForm && 
                <input 
                    type='text' 
                    placeholder='Country' 
                    className='rounded-md p-2 m-2 w-full text-white bg-gray-600'
                />}
            <input
                ref={email} 
                type='text' 
                placeholder='Email Address' 
                className='rounded-md p-2 m-2 w-full text-white bg-gray-600'
            />
            <input 
                ref={password}
                type='password' 
                placeholder='Password'
                className='p-2 m-2 w-full text-white rounded-md bg-gray-600'
            />
            <button 
                className='p-2 m-2 bg-red-700 text-white w-full rounded-md'
                type='submit'
                onSubmit={handleButton}>
                    {isSignInForm? "Sign In" : "Sign Up"}
            </button>

            <p className='py-4 m-2 font-bold text-red-700'>
            {errorMessage}
            </p>
            <p 
                className='py-4 m-2 text-white cursor-pointer' 
                onClick={toggleSignInForm}>
                    {isSignInForm?"New to Netflix, Sign Up here!":"Already registered! Login here"}
            </p>
        </form>
    </div>
    
  )
}

export default Login