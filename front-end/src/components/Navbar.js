import React from 'react';
import { Link } from 'react-router-dom';


import companyLogo from '../assets/images/Suyati-logo-01.svg';

const Navbar = () => {
    return (
<> 
    <header class='bg-white border-b-2 drop-shadow-lg'>
         <div class="w-full h-20 justify-between start-end p-2 flex max-w-full max-h-full flex space-x-2">

            <Link to='/'>
                <div class='w-40 h-20 cursor-pointer' >
                    <img src={companyLogo} alt='suyati-company-logo'/>
                </div>
            </Link>

            <div class='flex space-x-2 justify-evenly'>
                <Link to='/login'>
                    <button class='px-10 py-5 text-blue-800 hover:text-blue-400 font-semibold rounded-3xl drop-shadow' > 
                        Login 
                    </button>
                </Link>
                <Link to='/signup'>
                    <button class='mt-1 mr-2 px-8 py-4 text-blue-100 hover:bg-blue-500 font-semibold bg-blue-700 rounded-3xl drop-shadow' > 
                        Signup
                    </button>
                </Link>
            </div>
        </div>

    </header>

</>
    );
}

export default Navbar;