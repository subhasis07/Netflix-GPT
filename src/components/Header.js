import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebaseAPI';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate= useNavigate();
  const user=useSelector(store=>store.user)

  const handleSignOut=()=>{
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      // An error happened.
      console.log("Error : "+ error);
    });
    
  }
  return (
    <div className='absolute w-screen px-7 py-3 bg-gradient-to-b from-black z-20 flex justify-between'>
        <img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt='logo'>
        </img>
        {user && 
        <div>
          <img className='w-12 h-12' src={user.photoURL}></img>
          <button onClick={handleSignOut} className='cursor-pointer font-bold text-white bg-red-500'>Sign Out</button>
        </div>
        }
    </div>
  )
}

export default Header