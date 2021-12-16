import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './../context/UserContext'

const Dropdown = ({ isOpen, toggle }) => {

    let { user, logoutUser } = useContext(UserContext) 

  return (
    <div
      class={
        isOpen
          ? 'md:hidden flex flex-col text-center font-light text-xl justify-center items-center text-white bg-blue-500'
          : 'hidden'
      }
      onClick={toggle}
    >
      <Link to='/' class='p-4 hover:bg-blue-400 bg-blend-normal bg-blue-600 min-w-full '>
        Home
      </Link>
      <Link to='/books' class='p-4 hover:bg-blue-400 bg-blue-700 min-w-full'>
        Books
      </Link>
        <Link to='/dashboard' class='p-4 hover:bg-blue-400 bg-blue-800 min-w-full'>
            Dashboard
        </Link>
      {!user ?
        <Link to='/login' class='p-4 bg-black min-w-full'>
            Login
        </Link>
        : 
        <Link to='/' onClick={logoutUser} class='p-4 bg-black min-w-full'>
            Logout
        </Link>
      }
    </div>
  );
};

export default Dropdown;