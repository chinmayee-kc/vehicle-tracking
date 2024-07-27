import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (!input.name.trim()) {
      validationErrors.name = 'Username is required';
    }
    if (!input.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      validationErrors.email = 'Email is not valid';
    }
    if (!input.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (input.password.length < 6) {
      validationErrors.password = 'Password should be at least 6 characters long';
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(input.password)) {
      validationErrors.password = 'Password should contain at least one uppercase letter and one digit';
    }
    if (input.confirmPassword !== input.password) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem('user', JSON.stringify(input));
      setSuccessMessage('Signed up successfully!');
      navigate('/login');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <section className='register-container vh-100'>
      <h2 className='create-main'>Create an account</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            name='name'
            value={input.name}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            type='text'
            id='form3Example1cg'
            className='form-control'
          />
          <label htmlFor='form3Example1cg'>Username</label>
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className='form-group'>
          <input
            name='email'
            value={input.email}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            type='email'
            id='form3Example3cg'
            className='form-control'
          />
          <label htmlFor='form3Example3cg'>Email</label>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className='form-group'>
          <input
            name='password'
            value={input.password}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            type='password'
            id='form3Example4cg'
            className='form-control'
          />
          <label htmlFor='form3Example4cg'>Password</label>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className='form-group'>
          <input
            name='confirmPassword'
            value={input.confirmPassword}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
            type='password'
            id='form3Example5cg'
            className='form-control'
          />
          <label htmlFor='form3Example5cg'>Confirm Password</label>
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        {successMessage && <div className="success">{successMessage}</div>}

        <div className='d-flex justify-content-center'>
          <button type='submit'>Register</button>
        </div>
        <p>
          Have already an account?
          <a href='/login'>
            <u className='navigate-link'>Login here</u>
          </a>
        </p>
      </form>
    </section>
  );
};

export default Register;
