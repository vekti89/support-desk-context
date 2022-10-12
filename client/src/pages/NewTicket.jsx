import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthState } from '../context/authContext';
import { useTicketState, useTicketDispatch } from '../context/ticketContext';
import { createTicket } from '../services/ticketService';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useAuthState();
  const { tickets, isLoading, isError, isSuccess, message } = useTicketState();
  console.log('TICKETS ', tickets);
  const dispatch = useTicketDispatch();
  const navigate = useNavigate();

  const name = user.name;
  const email = user.email;
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success('Ticket created');

      navigate('/tickets');
    }
  }, [isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    createTicket(dispatch, user.token, { product, description });
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input type='text' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Email</label>
          <input type='text' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='iMac'>iMac</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description of the issue</label>
            <textarea
              name='description'
              id='description'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
