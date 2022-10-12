import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

import { login } from '../services/authService';
import { useAuthState, useAuthDispatch } from '../context/authContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const dispatch = useAuthDispatch();
  const { user, isLoading, isSuccess, isError, message } = useAuthState();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    //Redirect if logged in
    if (isSuccess || user) {
      toast.success('Wellcome back ' + user.name);
      navigate('/');
    }
    //dispatch(reset());
  }, [isError, isLoading, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((previousState) => ({
      ...previousState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    try {
      login(dispatch, userData);
    } catch (error) {
      console.log(error);
    }

    setFormData({
      email: '',
      password: '',
    });
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please log in to get support</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Login</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
