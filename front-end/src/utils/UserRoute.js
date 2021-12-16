import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/UserContext';


const UserRoute = ({children, ...rest}) => {

    let { user } = useContext(UserContext);

    return (
        <Route {...rest}>{ !user ? <Redirect to='/login' /> : children } </Route>
    );
}

export default UserRoute;