import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { loadUser } from "../features/authentication/auth.slice";

function useTokenRefresh() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("@fabwert_token");

    if (token) {
      dispatch(loadUser());
    }
  }, []);
}

export default useTokenRefresh;
