import axios from 'axios';
const API_URL = 'api/users';

export const login = async (dispatch, userData) => {
  try {
    dispatch({ type: 'LOGIN' });
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', payload: error.response.data.message });
  }
};

export const logout = async (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('user');
};

export const register = async (dispatch, userData) => {
  try {
    dispatch({ type: 'REGISTER' });
    const response = await axios.post(`${API_URL}`, userData);

    if (response.data) {
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    dispatch({ type: 'REGISTER_ERROR', payload: error.response.data.message });
  }
};

const authService = {
  register,
  logout,
  login,
};
export default authService;
