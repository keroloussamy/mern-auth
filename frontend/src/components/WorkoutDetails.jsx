import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { formatDistanceToNow } from "date-fns";

const WorkoutDetails = ({workout}) => {
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    // we didn't put localhost:4000 in the fetch url because we set the proxy in package.json
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: data });
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  );
};

export default WorkoutDetails;