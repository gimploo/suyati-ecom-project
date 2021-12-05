import React,{useState} from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import companyLogo from '../assets/images/Suyati-logo-01.svg';
import bookShelf from '../assets/images/login-page-bookshelf.jpg';



const LoginForm = () => {
    let navigate=useNavigate();
    const[formdata,setFormdata] = useState({
        username:"",
        password:""
    });
    console.log(formdata)

    const { username, password } = formdata;
    const onChange = (e) =>
    setFormdata({ ...formdata, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        login(username, password);
      };
    
     const login = (username, password) => {
        const url='http://127.0.0.1:8000/api/login/';
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ username, password });
        
    
        try {
            axios.post(url, body, config).then((res)=>{
                localStorage.setItem('token',res.data.token)
                navigate("/")
                
            })
        
        } catch (error) {
            console.log('post error')
        }
    
    };
    
    
    return (
    <>
        <div class=" flex sm:flex-col justify-center align-center">

            <div class=' md:max-w-4xl md:ml-auto md:mr-auto md:flex m-10 bg-gradient-to-b from-blue-300 to-blue-100 rounded-2xl drop-shadow-2xl '>

                {/* <!-- Book shelf image  --> */}
                <div class="flex-shrink">
                    <img class='rounded-tl-2xl md:rounded-l-2xl h-48 w-full object-cover md:h-full md:w-48 opacity-80' src={bookShelf} />
                </div>
                
                {/* <!-- Login  --> */}
                <div class='flex flex-col justify-center align-center flex-grow opacity-90 mx-10'>

                    {/* <!-- Company logo --> */}
                    <div class="flex justify-center align-center p-4 ">
                        <img src={companyLogo} />
                    </div>

                    <hr class='border-t-2 border-yellow-300'/>

                    {/* <!-- Form --> */}
                    <div class='px-20'>
                        <form onSubmit={(e) => onSubmit(e)} class='border-none flex flex-col justify-center align-center mt-16 '>
                            <input class='outline-none rounded p-2' autoCapitalize="off"
                             autoCorrect="off" maxLength="75" name="username" value={username} type="text" 
                              onChange={(e) => onChange(e)}
                               placeholder="Username"/> <br/>
                            <input class='outline-none rounded p-2' type="password" 
                             name="password" value={password} onChange={(e) => onChange(e)}
                             placeholder="Password"/><br/>
                             <button class='p-6 w-full bg-yellow-400 rounded-lg font-semibold text-yellow-800 hover:bg-yellow-300' href='../index.html' 
                              type='submit'> Login </button>
                        </form>

                        

                    </div>

                    <div class='space-x-3 flex justify-center align-center p-4'>
                        <hr class='border-1 w-1/3 border-gray-400' />
                        <label class='text-gray-400 text-center font-thin'> or </label>
                        <hr class='border-1 w-1/3 border-gray-400' />
                    </div>

                    {/* <!-- Signup --> */}
                    <div class='mb-8'>
                        <p class='text-center font-semibold text-gray-800'> Don't have an account? 
                            <Link to='/signup'>
                                <button class='p-1 mb-4 font-bold text-indigo-500 hover:text-indigo-400' > Signup </button>
                            </Link>
                        </p>

                    </div>

                </div>

            </div>
        </div>
    </>
    );
}

export default LoginForm;