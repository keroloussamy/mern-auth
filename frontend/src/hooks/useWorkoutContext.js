import { useContext } from 'react';
import { WorkoutContext } from '../context/workoutContext';

const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error('useWorkoutContext must be used within a WorkoutProvider');
  }

  return context;
}

export default useWorkoutContext;