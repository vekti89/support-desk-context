import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { getTicket, closeTicket } from '../services/ticketService';
import { getNotes, createNote } from '../services/noteService';
import { useTicketState, useTicketDispatch } from '../context/ticketContext';
import { useAuthState } from '../context/authContext';
import { useNoteState, useNoteDispatch } from '../context/noteContext';

import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';

const customStyles = {
  content: {
    width: '400px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
    backgroundColor: '#3a372a',
  },
};

Modal.setAppElement('#root');

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const { ticket, isLoading, isError, message } = useTicketState();
  const { notes, isLoading: notesIsLoading } = useNoteState();

  const navigate = useNavigate();
  const dispatch = useTicketDispatch();
  const noteDispatch = useNoteDispatch();
  const { ticketId } = useParams();
  const { user } = useAuthState();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    getTicket(dispatch, user.token, ticketId);
    getNotes(noteDispatch, user.token, ticketId);
    // eslint-disable-next-line
  }, [dispatch, user, noteDispatch]);

  // Close ticket
  const onTicketClose = () => {
    closeTicket(dispatch, user.token, ticketId);
    toast.success('Ticket Closed');
    navigate('/tickets');
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    createNote(noteDispatch, user.token, ticketId, noteText, notes);
    setNoteText('');
    closeModal();
  };

  // Open/close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>;
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h3>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h3>
        <h4>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h4>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h4>Description of Issue</h4>
          <p>{ticket.description}</p>
        </div>
        <h3>Notes</h3>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn btn-reverse'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h3>Add Note</h3>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default Ticket;
