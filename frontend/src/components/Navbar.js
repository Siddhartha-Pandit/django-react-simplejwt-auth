import React from "react";
import { logoutSuccess } from "../slicefile/authSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
export default function Navbar() {
  const authState = useSelector((state) => state.auth.auth.isAuthenticated);
  const dispatch = useDispatch();
  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/logout/`,
          {},
          config
        );
        dispatch(logoutSuccess());
      }
    } catch (error) {
      console.log("Logout Failed: ", error);
    }
  };
  return (
    <div>
      Navbar
      {authState ? (
        <input type="button" value="Logout" onClick={handlelogout} />
      ) : (
        console.log("not loddedin")
      )}
    </div>
  );
}
