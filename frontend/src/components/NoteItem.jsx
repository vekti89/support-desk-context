import { useSelector } from 'react-redux';

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? '#fff' : 'rgb(189, 184, 148)',
        color: note.isStaff ? '#fff' : '#3a372a',
      }}
    >
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  );
}

export default NoteItem;
