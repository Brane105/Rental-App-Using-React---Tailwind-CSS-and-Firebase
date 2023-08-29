import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore"
import {db} from "../firebase"
import {FcGoogle} from 'react-icons/fc';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom"
export default function GAuth() {
  const navigate =  useNavigate()
  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth,provider);
      const user = result.user;
      console.log(user);
      //checking if the user exists
      const docRef = doc(db,"users",user.uid);
      const docSnap = await getDoc(docRef);
      console.log(docSnap);
      if(!docSnap.exists()){
        await setDoc(docRef,{
          name :user.displayName,
          email :user.email,
          timestamp: serverTimestamp()
        });
      }
      navigate('/');
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong !')
    }
  }
  return (
    <button type='button' onClick={onGoogleClick} className='flex
    items-center justify-center 
    w-full bg-red-600
    text-white px-7 py-3 uppercase
    font-medium rounded-md shadow-md shadow-slate-300
    hover:bg-red-700 transition duration-150 
    ease-in-out hover:shadow-lg hover:shadow-slate-400
     active:bg-red-800'> 
    <FcGoogle className='mr-2 bg-white text-2xl rounded-full '/>
    Continue with Google</button>
  )
}
