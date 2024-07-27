import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser && input.email === loggedUser.email && input.password === loggedUser.password) {
      localStorage.setItem('loggedin', true);
      setAuthenticated(true);
      navigate('/');
    } else {
      setError('Incorrect email or password');
    }
  };

  return (
    <section className='login-container vh-100 bg-image'>
      <h2 className=' d-flex justify-content-center'>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='form-group mb-10 mt-10'>
          <input
            name='email'
            value={input.email}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            type='email'
            id='form3Example3cg'
            className='form-control '
          />
          <label htmlFor='form3Example3cg'>Email</label>
        </div>

        <div className='form-group '>
          <input
            name='password'
            value={input.password}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            type='password'
            id='form3Example4cg'
            className='form-control '
          />
          <label htmlFor='form3Example4cg'>Password</label>
        </div>

        {error && <div className='error'>{error}</div>}

        <div className='d-flex justify-content-center'>
          <button type='submit' className='btn-primary'>
            Login
          </button>
        </div>

        <p>
          Don't have an account?
          <a href='/register'>
            <u className='navigate-link'>Register here</u>
          </a>
        </p>
      </form>
    </section>
  );
};

export default Login;
