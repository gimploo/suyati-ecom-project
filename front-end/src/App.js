import { BrowserRouter,  Route } from 'react-router-dom';

import { UserProvider } from './context/UserContext.js';

import React, { useState } from 'react'

import UserRoute from './utils/UserRoute'


import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import MyBooksPage from './pages/MyBooksPage'
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import Footer from './components/Footer';
import Dropdown from './components/Dropdown.js';

const App = () => {

	const [isOpen, setIsOpen] = useState(false)
	const toggle = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div class=' bg-gradient-to-br from-indigo-500 to-indigo-800' >
			<BrowserRouter>
				<UserProvider>
					<Navbar toggle={toggle}/>
					<Dropdown isOpen={isOpen} toggle={toggle}/>
					<Route path='/' component={HomePage} exact />
					<Route path='/login' component={LoginPage} />
					<UserRoute component={MyBooksPage} path='/books'/>
					<Route path='/signup' component={SignupPage} />
					<UserRoute component={DashboardPage} path='/dashboard'/>
				</UserProvider>
				<Footer />
			</BrowserRouter>
		</div>
  );
}

export default App;