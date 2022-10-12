export const initialState = {
  tickets: [],
  ticket: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

const TicketReducer = (initalState, action) => {
  switch (action.type) {
    case 'GET_TICKETS':
      return {
        tickets: [],
        ticket: {},
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };

    case 'GET_TICKETS_SUCCESS':
      return {
        tickets: action.payload,
        ticket: {},
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      };

    case 'GET_TICKETS_ERROR':
      return {
        tickets: [],
        ticket: {},
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    // ##################################################################
    case 'CREATE_TICKET':
      return {
        tickets: [],
        ticket: {},
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case 'CREATE_TICKET_SUCCESS':
      return {
        tickets: [],
        ticket: action.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      };
    case 'CREATE_TICKET_ERROR':
      return {
        tickets: [],
        ticket: {},
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    // ##################################################################
    case 'GET_TICKET':
      return {
        tickets: [],
        ticket: {},
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case 'GET_TICKET_SUCCESS':
      return {
        tickets: [],
        ticket: action.payload,
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      };
    case 'GET_TICKET_ERROR':
      return {
        tickets: [],
        ticket: {},
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };
    // ##################################################################
    case 'CLOSE_TICKET':
      return {
        tickets: [],
        ticket: {},
        isLoading: true,
        isSuccess: false,
        isError: false,
        message: '',
      };
    case 'CLOSE_TICKET_SUCCESS':
      return {
        tickets: initalState.tickets.map((t) =>
          t._id === action.payload ? { t, status: 'closed' } : t
        ),
        ticket: {},
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      };
    case 'CLOSE_TICKET_ERROR':
      return {
        tickets: [],
        ticket: {},
        isLoading: false,
        isSuccess: false,
        isError: true,
        message: action.payload,
      };

    case 'TICKETS_RESET':
      return {
        tickets: [],
        ticket: {},
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: '',
      };
    default:
      return initalState;
  }
};

export default TicketReducer;
