import React, { useEffect, useState } from 'react'
import * as re from "react-router-dom";
import {getAuth, onAuthStateChanged} from "firebase/auth"
export default function Header() {
  const [pageState , setPageState] = useState("Sign in");
  const location = re.useLocation();
  const navigate = re.useNavigate();
  const auth = getAuth();
  useEffect(()=> {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setPageState('Profile');
      }
      else{
        setPageState('Sign in');
      }
    })
  },[auth])
  // console.log(location.pathname);
  function matchRoute(route){
    if(route === location.pathname){
      // console.log(route,location.pathname)
      return true
    }
  }
  return (
    <>
  <nav className="p-4 bg-white border-b shadow-md sticky top-0 z-40">
    <header className='flex justify-between items-center
    px-3 max-w-7xl mx-auto'>
        <div>
        <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor"
         className='h-9 cursor-pointer' 
         onClick={()=> navigate('/')}
         />
        </div>
        <div>
          <ul className='flex space-x-10 items-center'>
            <li className={`cursor-pointer text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${matchRoute("/") && "text-black font-bold border-b-red-500"}`}
             onClick={()=> navigate('/')}>Home</li>
            <li  className={`cursor-pointer text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${matchRoute("/offers") && "text-black font-bold border-b-red-500"}`}
            onClick={()=> navigate('/offers')}>Offers</li>
            <li  className={`cursor-pointer text-sm font-semibold text-grey-400 border-b-[3px] border-b-transparent ${(matchRoute("/sign-in") || matchRoute("/profile")) && "text-black font-bold border-b-red-500"}`}
            onClick={()=> navigate('/profile')}>{pageState}</li>
            {/* <li>
              <img src="https://blog.seagate.com/wp-content/uploads/2019/01/Level-Up-Gaming.jpg" alt='profile'
               className="self-center w-10 h-10 rounded-full" />
            </li> */}
          </ul>
        </div>
    </header>
    
  </nav>
      {/* <div className="float-right" >
        <div className='flex items-center drop-shadow-2xl transition ease-in-out delay-150 bg-slate-200 hover:-translate-y-1 hover:scale-110 hover:bg-slate-200 duration-300 cursor-pointer rounded-full p-2'>
        <img src="https://blog.seagate.com/wp-content/uploads/2019/01/Level-Up-Gaming.jpg" alt='profile' className="self-center w-10 h-10 rounded-full" />
        <div className='tracking-wide '>
          <strong>Andrew Alfred</strong><br/>
          <span>Technical advisor</span>
        </div> 
        </div>
      </div> */}
  </>
  )
}
