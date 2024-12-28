import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebaseAPI';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { toggleGPTSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constant';

const Header = () => {

  const navigate= useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(store=>store.user)
  const showGPTSearch = useSelector(store => store.gpt.showGPTSearch)

  const handleSignOut=()=>{
    signOut(auth).then(() => {
    }).catch((error) => {
      // An error happened.
      console.log("Error : "+ error);
    });
    
  }

  const handleGPTSearch=()=>{
    dispatch(toggleGPTSearchView())
  }

  const handleLanguageChange =(e)=>{
    dispatch(changeLanguage(e.target.value))
  }

  useEffect(()=>{
    const unsubscribe= onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid,email,displayName,photoURL} = user.uid;
          dispatch(addUser({
            uid:uid, 
            email:email , 
            displayName:displayName,
            photoURL: photoURL
          }))
          navigate("/browse")
        } else {
          dispatch(removeUser())
          navigate("/");
        }
      });

      return ()=> unsubscribe(); //unsubscribing the component
  },[])


  return (
    <div className='absolute w-screen px-7 py-3 bg-gradient-to-b from-black z-20 flex justify-between'>
        <img className='w-44' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt='logo'>
        </img>
        {user && 
        <div className='flex p-2'>

            {showGPTSearch && 
              <select
                className="p-2 m-2 bg-gray-900 text-white"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            }

          <button className='bg-sky-500 text-white rounded-md p-2 m-2'
            onClick={handleGPTSearch}>
            {!showGPTSearch ?"GPT Search":"HomePage"}
          </button>
          <img className='w-12 h-12' src={user.photoURL}></img>
          <button onClick={handleSignOut} className='cursor-pointer font-bold text-white bg-red-500'>Sign Out</button>
        </div>
        }
    </div>
  )
}

export default Header