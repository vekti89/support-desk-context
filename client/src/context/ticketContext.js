import React, { createContext, useReducer } from 'react';
import { initialState } from '../reducers/ticketReducer';
import TicketReducer from '../reducers/ticketReducer';

const TicketStateContext = createContext();
const TicketDispatchContext = createContext();

export function useTicketState() {
  const context = React.useContext(TicketStateContext);
  if (context === undefined) {
    throw new Error('useTicketState must be used within a TicketProvider');
  }
  return context;
}
export function useTicketDispatch() {
  const context = React.useContext(TicketDispatchContext);
  if (context === undefined) {
    throw new Error('useTicketDispatch must be used within a TicketProvider');
  }
  return context;
}

export function TicketProvider(props) {
  const [tickets, dispatch] = useReducer(TicketReducer, initialState);
  return (
    <TicketStateContext.Provider value={tickets}>
      <TicketDispatchContext.Provider value={dispatch}>
        {props.children}
      </TicketDispatchContext.Provider>
    </TicketStateContext.Provider>
  );
}
