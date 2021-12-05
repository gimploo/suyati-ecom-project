import React from "react";
import { Link } from "react-router-dom";

import companyLogo from '../assets/images/Suyati-logo-01.svg';
import bookShelf from '../assets/images/login-page-bookshelf.jpg';

const SignupForm = () => {

    return (
    <>
    <div class="flex sm:flex-col justify-center align-center">

        <div class='md:max-w-4xl md:ml-auto md:mr-auto md:flex bg-gradient-to-b m-10 from-blue-300 to-blue-100 rounded-2xl drop-shadow-2xl '>

            {/* <!-- Bookshelf image --> */}
            <div class="flex-shrink">
                <img class='rounded-tl-2xl md:rounded-l-2xl h-48 w-full object-cover md:h-full md:w-48 opacity-80' src={bookShelf} />
            </div>
            
            {/* <!-- Signup  --> */}
            <div class='flex flex-col justify-center align-center flex-grow opacity-90 mx-10'>
                
                {/* <!-- Company logo --> */}
                <div class="flex justify-center align-center p-4 ">
                    <img src={companyLogo} />
                </div>

                <hr class='border-t-2 border-yellow-300'/>

                {/* <!-- Form --> */}
                <div class='md:py-10 px-2 md:px-20'>
                    <form class='flex flex-col justify-center align-center mt-8 '>

                        {/* <!-- First name and last name --> */}
                        <div class='md:flex md:justify-evenly md:space-x-3 md:mb-2 ' >
                            <input class='rounded p-2 mb-4 w-full border-2 focus:outline-none focus:border-red-500' autoCapitalize="off" autoCorrect="off" maxLength="75" name="first_name" type="text"  placeholder="First Name"/> 
                            <input class='rounded p-2 mb-4 w-full outline-none' autoCapitalize="off" autoCorrect="off" maxLength="75" name="last_name" type="text"  placeholder="Last Name"/> 
                        </div>

                        <input class='rounded p-2 border-2 focus:outline-none focus:border-red-500 ' type='date' name='DOB'/><br/>
                        <input class='rounded p-2 border-2 focus:outline-none focus:border-red-500 ' autoCapitalize="off" autoCorrect="off" maxLength="75" name="username" type="text"  placeholder="Username"/> <br/>
                        <input class='rounded p-2 border-2 focus:outline-none focus:border-red-500' autoCapitalize="off" autoCorrect="off" maxLength="75" name="email" type="text"  placeholder="Email"/> <br/>
                        <input class='rounded p-2 border-2 focus:outline-none focus:border-red-500' autoCapitalize="off" autoCorrect="off" maxLength="75" name="location" type="text"  placeholder="Location"/> <br/>
                        <input class='rounded p-2 border-2 focus:outline-none focus:border-red-500' type="password" name="password" placeholder="Password"/><br/>
                        <input class='rounded p-2 border-2 focus:outline-none focus:border-red-500' type="password" name="password" placeholder="Retype password"/><br/>

                        {/* <!-- Terms and conditions checkbox --> */}
                        <div class="flex space-x-2">
                            <input class='outline-none my-auto'  type='checkbox' name='terms&conditions'/>
                            <label class='text-xs lg:text-sm'>
                                I agree to the <a class='hover:text-blue-800 font-semibold' href=''>terms and conditions</a>.
                            </label> 
                        </div>

                        <br/>
                    </form>

                    
                    <button class='p-6 w-full bg-yellow-300 rounded-lg font-semibold text-yellow-700 hover:bg-yellow-400' href=''> Signup </button>

                </div>

                {/* <!-- Divider --> */}
                <div class='space-x-3 flex justify-center align-center p-4'>
                    <hr class='border-1 w-1/3 border-gray-400' />
                    <label class='text-gray-400 text-center font-thin'> or </label>
                    <hr class='border-1 w-1/3 border-gray-400' />
                </div>

                {/* <!-- Login --> */}
                <div class='mb-8'>
                    <p class='text-center font-semibold text-gray-800'> Already have an account? 
                        <Link to='/login'>
                            <button class='p-1 mb-4 font-bold text-indigo-500 hover:text-indigo-400' href=''> Login </button>
                        </Link>
                    </p>

                </div>

            </div>


        </div>

    </div>

</>
    );
}

export default SignupForm;