import { BrowserRouter,  Route } from 'react-router-dom';
import AuthenticatedRoute from './utils/AutheticatedRoute.js';

import { AuthProvider } from './context/AuthContext'

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';

const App = () => {

  return (
	<>
	<div class=' bg-gradient-to-br from-indigo-500 to-indigo-800' >
		<BrowserRouter>
			<AuthProvider>
				<Navbar />
				<Route path='/' component={HomePage} exact/>
				<Route path='/login' component={LoginPage} />
				<Route path='/signup' component={SignupPage} />
				<Route path='/dashboard' component={DashboardPage} />
			</AuthProvider>
			<Footer />
		</BrowserRouter>
	</div>
	</>
  );
}

export default App;