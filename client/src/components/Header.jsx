import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthState, useAuthDispatch } from '../context/authContext';
import { logout } from '../services/authService';
function Header() {
  const navigate = useNavigate();
  const { user } = useAuthState();
  const dispatch = useAuthDispatch();
  const onLogout = () => {
    logout(dispatch);
    toast.success('Logged you out');
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>
        {user !== null ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt />
                Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser />
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
