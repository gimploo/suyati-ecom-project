import './App.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Login from './components/LoginForm.js';
import Signup from './components/SignupForm.js';

function App() {
  return (

  <div class=' bg-gradient-to-br from-indigo-500 to-indigo-800' >
	<Navbar />
	<Routes>

		<Route path='/login'  element={<Login/>} />
		<Route path='/signup' element={<Signup/>} />
	</Routes>
  </div>
	  
  );
}

export default App;