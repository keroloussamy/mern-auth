import { useState } from "react";
import useAuthContext from "./useAuthContext";


const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (email, password) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch('/api/users/signup',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))

      // update the auth context
      dispatch({type: 'LOGIN', payload: data})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signUp, isLoading, error };
}

export default useSignup;