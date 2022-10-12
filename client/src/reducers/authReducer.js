let user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : '';

export const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };

    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      };

    case 'LOGIN_ERROR':
      return {
        user: null,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };

    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case 'REGISTER':
      return {
        user: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case 'REGISTER_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      };
    case 'REGISTER_ERROR':
      return {
        user: null,
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };

    default:
      return { ...initialState };
  }
};

export default AuthReducer;
