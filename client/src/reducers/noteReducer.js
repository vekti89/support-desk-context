export const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
const NoteReducer = (initialState, action) => {
  switch (action.type) {
    case 'GET_NOTES':
      return {
        notes: [],
        isError: false,
        isSuccess: false,
        isLoading: true,
        message: '',
      };

    case 'GET_NOTES_SUCCESS':
      return {
        notes: action.payload,
        isError: false,
        isSuccess: true,
        isLoading: false,
        message: '',
      };

    case 'GET_NOTES_ERROR':
      return {
        notes: [],
        isError: true,
        isSuccess: false,
        isLoading: false,
        message: action.payload,
      };
    // #################################################################
    case 'CREATE_NOTE':
      return {
        notes: [],
        isError: false,
        isSuccess: false,
        isLoading: true,
        message: '',
      };

    case 'CREATE_NOTE_SUCCESS':
      return {
        notes: action.payload,
        isError: false,
        isSuccess: true,
        isLoading: false,
        message: '',
      };

    case 'CREATE_NOTE_ERROR':
      return {
        notes: [],
        isError: true,
        isSuccess: false,
        isLoading: false,
        message: action.payload,
      };
    default:
      return initialState;
  }
};

export default NoteReducer;
