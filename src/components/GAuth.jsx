import React from 'react'
import {FcGoogle} from 'react-icons/fc'
export default function GAuth() {
  return (
    <button className='flex
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
