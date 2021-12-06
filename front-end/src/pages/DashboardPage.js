import { React, useContext } from 'react'
import AuthContext from '../context/AuthContext';


const DashboardPage = () => {

    let name = useContext(AuthContext);

    return (
        <h1> Dashboard of {name} </h1>
    );
}

export default DashboardPage;