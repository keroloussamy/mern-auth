import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

// Workout Reducer 
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state;  
  }
 };

const WorkoutContextProvider = (props) => {
  const [workouts, dispatch] = useReducer(workoutReducer, { workouts: null}); // initial state is null

  return (
    <WorkoutContext.Provider value={{ ...workouts, dispatch }}>
      {props.children}
    </WorkoutContext.Provider>
  );
}

export default WorkoutContextProvider;