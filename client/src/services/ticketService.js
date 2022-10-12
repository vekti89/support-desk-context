import axios from 'axios';
const API_URL = '/api/tickets/';

export const getTickets = async (dispatch, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: 'GET_TICKETS' });
    const response = await axios.get(API_URL, config);

    if (response.data) {
      dispatch({ type: 'GET_TICKETS_SUCCESS', payload: response.data });
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: 'GET_TICKETS_ERROR',
      payload: error.response.data.message,
    });
  }
};

// ##################################################################

export const createTicket = async (dispatch, token, ticketData) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch({ type: 'CREATE_TICKET' });
    const response = await axios.post(API_URL, ticketData, config);
    if (response.data) {
      dispatch({ type: 'CREATE_TICKET_SUCCESS', payload: response.data });
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: 'CREATE_TICKET_ERROR',
      payload: error.response.data.message,
    });
  }
};
// ##################################################################
export const getTicket = async (dispatch, token, ticketId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: 'GET_TICKET' });
    const response = await axios.get(API_URL + ticketId, config);

    if (response.data.description) {
      dispatch({ type: 'GET_TICKET_SUCCESS', payload: response.data });
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: 'GET_TICKET_ERROR',
      payload: error.response.data.message,
    });
  }
};

// ##################################################################
export const closeTicket = async (dispatch, token, ticketId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    dispatch({ type: 'CLOSE_TICKET' });

    const response = await axios.put(
      API_URL + ticketId,
      { status: 'closed' },
      config
    );

    if (response.data) {
      dispatch({ type: 'CLOSE_TICKET_SUCCESS', payload: response.data });
      console.log('CLOSE TICKET SUCC : ', response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: 'CLOSE_TICKET_ERROR',
      payload: error.response.data.message,
    });
  }
};

export const reset = (dispatch) => {
  dispatch({ type: 'TICKETS_RESET' });
};

const ticketService = {
  getTickets,
  createTicket,
  getTicket,
  closeTicket,
  reset,
};

export default ticketService;
