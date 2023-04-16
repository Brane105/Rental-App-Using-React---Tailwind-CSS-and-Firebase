import * as re from 'react';
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import GAuth from '../components/GAuth';
export default function SignUp() {
  // create hook for show password 
  const [showPassword, setShowPassword] = re.useState(false)
  // ohhh this is an hook 
  const [formData , setFormData] = re.useState({
    name : "",
    email : "",
    password : ""
  }); 
  // destructure this form-data 
  const {name,email , password} = formData
  function onChange(e){
    // console.log(e.target.value)
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id] : e.target.value
    }))
  
  }
    return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>
        Sign Up
      </h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-2 '>
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80" alt="house keys" 
        className='w-full rounded-2xl '/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form>
          <input type="text" id='name' value={name} placeholder='enter full name here'
            onChange={onChange} className='w-full px-4 py-2 mb-5 text-xl text-gray-700 bg-white 
            border-gray-300 rounded-md transition ease-in-out'/>
            <input type="email" id='email' value={email} placeholder='enter email here'
            onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-700 bg-white 
            border-gray-300 rounded-md transition ease-in-out'/>
            <div className='relative mt-5'>
            <input type={showPassword ? "text" : "password"} id='password' value={password} placeholder='enter password here'
            onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-700 bg-white 
            border-gray-300 rounded-md transition ease-in-out'/>
            {showPassword ? (
              <AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer'
              onClick={()=>setShowPassword((prevState)=>!prevState)}/>
            ) : (
              <AiFillEye className='absolute  right-3 top-3 text-xl cursor-pointer'
              onClick={()=>setShowPassword((prevState)=>!prevState)}/>
            )}
            </div>
            <div className='flex justify-between mt-5 whitespace-nowrap text-sm sm:text-lg'>
              <p className=' mb-5'>Have an account? 
                <Link className='text-blue-600 hover:text-blue-700 ml-2 transition duration-200 ease-in-out ' to="/sign-in">Sign In</Link>
              </p>
              <p>
                <Link className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out' to="/forgot-password">Forgot Password?</Link>
              </p>
            </div>
            <button type="submit"
            className='w-full bg-blue-600 text-white font-medium uppercase px-7 py-3 rounded-md shadow-md shadow-slate-300
           hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-slate-400 active:bg-blue-800'>
            Sign Up</button>
            <div className='my-4 before:border-t
             flex before:flex-1 
             items-center 
             before:border-gray-300 
             after:border-t
             after:flex-1 
             after:border-gray-300'>
              <p className='text-center font-semibold mx-4'>
                OR
              </p>
            </div>
            <GAuth/>
          </form>
        </div>
        
      </div>
    </section>
  )
}
