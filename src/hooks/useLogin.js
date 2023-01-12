import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoanding, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext(); /* 
  const url = "https://scanback.adaptable.app"; */

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch(
      /* url + */ "https://scanback.adaptable.app/api/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update th
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoanding, error };
};
