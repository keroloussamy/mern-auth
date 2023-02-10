import { useState } from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';


const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const workout = {title, load, reps};
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(workout)
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error)
      setEmptyFields(data.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyFields([])
      console.log('new workout added', data)
      dispatch({type: 'CREATE_WORKOUT', payload: data})
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h2>Add a new workout</h2>

      <label htmlFor="title">Exercise title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label htmlFor="load">Load (in kg):</label>
      <input
        type="number"
        id="load"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label htmlFor="reps">Reps:</label>
      <input
        type="number"
        id="reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm;