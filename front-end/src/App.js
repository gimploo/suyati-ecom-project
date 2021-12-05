import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Login from './components/LoginForm.js';
import Signup from './components/SignupForm.js';
import Footer from './components/Footer';

function App() {

	// State to check if the user is logged in
	const [userLoggedIn, setUserLoggedIn] = useState(() => { 
		return false; // change this value to trigger the navbar thing 
	});

  return (
	<>
		<Navbar isUserLoggedIn={userLoggedIn}/>
		<div class=' bg-gradient-to-br from-indigo-500 to-indigo-800' >
		<Routes>
			<Route path='/login'  element={<Login/>} />
			<Route path='/signup' element={<Signup/>} />
		</Routes>
		</div>
		<Footer />
	</>
  );
}

export default App;