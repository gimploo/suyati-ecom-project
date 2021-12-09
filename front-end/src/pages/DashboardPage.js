import { React, useContext } from 'react'
import AuthContext from '../context/AuthContext';


const UserInfoDump = ({value}) => {

    return (
    <div class='rounded-lg w-2/3 border-4'>
        <h2 class='p-10 bg-yellow-300 font-semibold text-4xl text-blue-800'> User info </h2>
        <p class=''>
            <ul class='font-extralight text-2xl p-8 space-y-4 bg-yellow-200'>
                <li> <b>User-ID:</b>    {value.userid} </li>
                <li> <b>Location:</b>  {value.location} </li>
                <li> <b>Age:     </b>  {value.age} </li>
            </ul>
        </p>
    </div>

    );

}

const DashboardPage = () => {

    const { user } = useContext(AuthContext);

    return (
    <>
        <div class='bg-yellow-500 p-20'>
            <h1 class='text-left md:text-8xl text-2xl font-light text-gray-100'> Welcome {user.username}! </h1>

            <hr class='md:mt-10 mt-4 ml-2 md:w-40 w-10 md:mb-10 mb-5'/>

            <UserInfoDump value={user} />

        </div>
    </>
    );
}

export default DashboardPage;