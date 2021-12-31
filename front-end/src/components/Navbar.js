import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchField from 'react-search-field';

import COMPANYLOGO from '../assets/images/Suyati-logo-01.svg';
import UserContext from '../context/UserContext';

const SearchBar = () => {

    const style = 'm-3 w-full md:w-1/4 bg-blue-800'

    return (
        <SearchField
            classNames={style}
            placeholder="Search books"
            // onChange={}
            searchText=""
        />
    );

}

const Navbar = ({toggle}) => {

    let  { user, logoutUser }  = useContext(UserContext);

    const LeftNavbar = () => {
        return (
            <Link to='/'>
                <div class='w-40 h-20 cursor-pointer' >
                    <img src={COMPANYLOGO} alt='suyati-company-logo'/>
                </div>
            </Link>
        );
    }

    const RightNavbar = () => {

        if (!user) {

            return (
                <div class='md:flex hidden space-x-2 justify-evenly'>
                    <Link to='/login'>
                        <button class='mt-1 mr-4 px-8 py-4 text-blue-100 hover:bg-blue-600 font-semibold bg-blue-700 rounded-3xl drop-shadow' > 
                            Login 
                        </button>
                    </Link>
                </div>
            );

        } else {

            return (

                <div class='md:flex hidden justify-evenly'>
                    <Link to=''>
                        <button onClick={logoutUser} class='mt-1 mr-2 px-8 py-4 text-gray-800 hover:bg-gray-400 font-semibold bg-gray-200 rounded-3xl drop-shadow' > 
                            Logout
                        </button>
                    </Link>
                </div>

            )
        }

    };

    const MiddleNavbar = () => {

        return ( <>

            <div class='p-3 cursor-pointer md:hidden' onClick={toggle}>
                <svg
                    class='text-blue-800 w-10 h-10'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M4 6h16M4 12h16M4 18h16'
                    />
                </svg>
            </div>

            <div class='md:flex hidden font-semibold text-blue-800'>

                <Link to='/' class='px-10 py-5  hover:text-blue-400  rounded-3xl drop-shadow' >
                    My Orders
                </Link>

                <Link to='/books' class='px-10 py-5  hover:text-blue-400  rounded-3xl drop-shadow' >
                    My Ratings
                </Link>

                <Link to='/dashboard' class='px-10 py-5  hover:text-blue-400  rounded-3xl drop-shadow' >
                    Dashboard
                </Link>

            </div>

        </>)

    }

    return (
        <header class='bg-white border-b-2 drop-shadow-lg '>
            <div class="w-full h-30 justify-between mt-2 start-end p-2 max-w-full max-h-full flex space-x-10 md:w-auto md:justify-center mx-auto ">
                <LeftNavbar />
                <SearchBar />
                <MiddleNavbar />
                <RightNavbar /> 
            </div>
        </header>
    );
}

export default Navbar;
