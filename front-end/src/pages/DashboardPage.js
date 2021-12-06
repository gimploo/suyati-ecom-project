import { React, useContext } from 'react'
import AuthContext from '../context/AuthContext';


const DashboardPage = () => {

    let { user } = useContext(AuthContext);

    return (
        <h1> Dashboard of {user.username} </h1>
    );
}

export default DashboardPage;