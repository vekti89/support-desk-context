import axios from 'axios';
const API_URL = '/api/tickets/';

export const getNotes = async (dispatch, token, ticketId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: 'GET_NOTES' });
    const response = await axios.get(API_URL + `${ticketId}/notes`, config);
    if (response.data) {
      dispatch({ type: 'GET_NOTES_SUCCESS', payload: response.data });
      return response.data;
    }
  } catch (error) {
    dispatch({ type: 'GET_NOTES_ERROR', payload: error.response.data.message });
  }
};

export const createNote = async (
  dispatch,
  token,
  ticketId,
  noteText,
  notes
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    dispatch({ type: 'CREATE_NOTE' });
    const response = await axios.post(
      API_URL + `${ticketId}/notes`,
      { text: noteText },
      config
    );
    if (response.data) {
      dispatch({
        type: 'CREATE_NOTE_SUCCESS',
        payload: [...notes, response.data],
      });
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: 'CREATE_NOTE_ERROR',
      payload: error.response.data.message,
    });
  }
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
