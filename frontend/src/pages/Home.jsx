import React, { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const Home = () => {
  // use workout context hook
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    // get all workouts
    const getWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const data = await response.json();
      if(response.ok) {
        console.log(data);
        dispatch({ type: 'SET_WORKOUTS', payload: data });
      }
    }
    getWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          console.log(workout),
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default Home;