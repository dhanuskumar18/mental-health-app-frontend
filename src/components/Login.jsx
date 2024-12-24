import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import {change} from '../slices/state1';
import config from "../../config"
function Login() {
  // console.log(config);
  
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

const handleSubmit = async (event) => {
  event.preventDefault();
  if (isRegistering) {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
      }
      try 
      {
        // console.log(config);
        
        const response = await axios.post(`${config}api/register`, {
         username,
         password
        });
        
        setSuccess(response.data.message);
        // console.log(response.data.message);
        setError(null);
        setUsername("")
        setPassword("")
        setConfirmPassword("")

      }
       catch (error)
        {
        // console.log(error.response.data.message);
        setError(error.response.data.message);
        setSuccess(null);
        setUsername("")
        setPassword("")
        setConfirmPassword("")
      }
    } else {
      try {
        const response = await axios.post(`${config}api/login`, {
          username,
          password,
        });
        localStorage.setItem('token', response.data.token);
        dispatch(change(username))
        navigate('/check-in')
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>

    <div className="flex justify-center items-center h-screen checkinbg">
      <form
        onSubmit={handleSubmit}
        className="bg-teal-50 p-4 rounded shadow-md w-4/5 md:w-3/5"
      >
        <h2 className="text-lg font-bold mb-4 italic text-blue-800">
          {isRegistering ? 'Register' : 'Login'}
        </h2>
        {success && (
          <p className="text-green-500 text-sm mb-4">{success}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <div className="mb-4">
          <label className="block text-blue-600 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div className="mb-4">
          <label className="block text-blue-600 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        {isRegistering && (
            <div className="mb-4">
            <label className="block text-blue-600 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
          </div>
        )}
       
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <p className="text-gray-700 text-sm mt-4">
          {isRegistering ? (
              <span>
              Already have an account?{' '}
              <a
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  setSuccess(null)
                  setError(null)
                  setIsRegistering(false);
                }}
                className="text-blue-500 hover:text-blue-700"
                >
                Login
              </a>
            </span>
          ) : (
              <span>
              Don't have an account?{' '}
              <a
                href="#"
                onClick={(event) => {
                    event.preventDefault();
                  setSuccess(null)
                  setError(null)
                    setIsRegistering(true);
                }}
                className="text-blue-500 hover:text-blue-700"
                >
                Register
              </a>
            </span>
          )}
        </p>
      </form>
    </div>
          </>
  );
}

export default Login;