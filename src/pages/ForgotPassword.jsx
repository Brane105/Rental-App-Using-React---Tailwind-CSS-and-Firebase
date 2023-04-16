import * as re from 'react';
import { Link } from 'react-router-dom';
import GAuth from '../components/GAuth';
export default function ForgotPassword() {
  // ohhh this is an hook 
  const [email , setEmail] = re.useState(""); 
  function onChange(e){
    // console.log(e.target.value)
    setEmail(e.target.value);
  }
    return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>
        Forgot Password
      </h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-4'>
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80" alt="house keys" 
        className='w-full rounded-2xl '/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form>
            <input type="email" id='email' value={email} placeholder='enter email here'
            onChange={onChange} className='w-full px-4 py-2 text-xl text-gray-700 bg-white 
            border-gray-300 rounded-md transition ease-in-out'/>
            <div className='flex justify-between mt-5 whitespace-nowrap text-sm sm:text-lg'>
              <p className=' mb-6'>Don't have an account? 
                <Link className='text-blue-600 hover:text-blue-700 ml-2 transition duration-200 ease-in-out ' to="/sign-up">Register</Link>
              </p>
              <p>
                <Link className='text-green-600 hover:text-green-700 transition duration-200 ease-in-out' to="/sign-in">Sign In</Link>
              </p>
            </div>
            <button type="submit"
          className='w-full bg-blue-600 text-white font-medium uppercase px-7 py-3 rounded-md shadow-md shadow-slate-300
           hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg hover:shadow-slate-400 active:bg-blue-800'>
            Send Reset Password</button>
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
