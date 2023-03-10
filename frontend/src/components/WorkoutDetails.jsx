import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from '../hooks/useAuthContext'
import { formatDistanceToNow } from "date-fns";
import TrashIcon from "../assets/trash-bin.png";
import PropTypes from "prop-types";

const WorkoutDetails = ({workout}) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext()

  const handleDelete = async () => {
    if (!user) {
      return
    }
    // we didn't put localhost:4000 in the fetch url because we set the proxy in package.json
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
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
      <span onClick={handleDelete}>
        <img src={TrashIcon} alt="" width={40} height={40} />
      </span>
    </div>
  );
};

// check prop-types
WorkoutDetails.propTypes = {
  workout: PropTypes.object.isRequired,
};

export default WorkoutDetails;
