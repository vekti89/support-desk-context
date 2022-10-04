import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import TicketItem from '../components/TicketItem';
import BackButton from '../components/BackButton';

function Tickets() {
  const { isLoading, isSuccess, tickets } = useSelector(
    (state) => state.tickets
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

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
