import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebaseAPI';

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {

    const dispath=useDispatch();

    const appRoute= createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/browse",
            element:<Browse/>
        }
    ])

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const {uid,email,displayName,photoURL} = user.uid;
              dispath(addUser({
                uid:uid, 
                email:email , 
                displayName:displayName,
                photoURL: photoURL
              }))
            } else {
              dispath(removeUser())

            }
          });
    },[])
  return (
    <div>
        <RouterProvider router={appRoute}/>
    </div>
    
  )
}

export default Body