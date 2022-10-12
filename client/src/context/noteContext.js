import React, { createContext, useReducer } from 'react';
import { initialState } from '../reducers/noteReducer';
import NoteReducer from '../reducers/noteReducer';

const NoteStateContext = createContext();
const NoteDispatchContext = createContext();

export function useNoteState() {
  const context = React.useContext(NoteStateContext);
  if (context === undefined) {
    throw new Error('useNoteState must be used within a NoteProvider');
  }
  return context;
}
export function useNoteDispatch() {
  const context = React.useContext(NoteDispatchContext);
  if (context === undefined) {
    throw new Error('useNoteDispatch must be used within a NoteProvider');
  }
  return context;
}

export function NoteProvider(props) {
  const [notes, dispatch] = useReducer(NoteReducer, initialState);
  return (
    <NoteStateContext.Provider value={notes}>
      <NoteDispatchContext.Provider value={dispatch}>
        {props.children}
      </NoteDispatchContext.Provider>
    </NoteStateContext.Provider>
  );
}
