import { Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// Never used as of now! 

const AuthenticatedRoute = ({children, ...rest}) => {

    let isUserAuthenticated = false;

    return (
        <Route {...rest}>{!isUserAuthenticated ? <Link to='/login' /> : children} </Route>
    );
}

export default AuthenticatedRoute;
