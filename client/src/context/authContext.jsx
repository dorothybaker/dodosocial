
import { createContext, useEffect, useState } from "react";
import { API } from "../utils/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me");

      setCurrentUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (inputs) => {
    const res = await API.post("/auth/login", inputs);
    setCurrentUser(res.data);
  };

  const logout = async () => {
    await API.post("/auth/logout", {});
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
