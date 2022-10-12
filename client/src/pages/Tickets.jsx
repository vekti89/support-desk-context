import { useEffect } from 'react';
import { useAuthState } from '../context/authContext';
import { useTicketState, useTicketDispatch } from '../context/ticketContext';
import Spinner from '../components/Spinner';
import { getTickets } from '../services/ticketService';
import TicketItem from '../components/TicketItem';
import BackButton from '../components/BackButton';
import { reset } from '../services/ticketService';

function Tickets() {
  const { user } = useAuthState();
  const { isLoading, isSuccess, tickets } = useTicketState();
  const dispatch = useTicketDispatch();

  //when unmounting Tickets component
  useEffect(() => {
    return () => {
      if (isSuccess) {
        reset(dispatch);
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    getTickets(dispatch, user.token);
  }, [dispatch, user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <div className='heading'>
        <h2>Tickets</h2>
        {tickets.length === 0 && <p>No tickets yet...</p>}
      </div>
      {tickets.length !== 0 && (
        <div className='tickets'>
          <div className='ticket-headings'>
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
          </div>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </>
  );
}

export default Tickets;
