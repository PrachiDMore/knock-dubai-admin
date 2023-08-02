import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { createContext, useContext, useState } = require("react");

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState();
	const navigate = useNavigate();
	useEffect(() => {
	}, []);

	const logoutUser = () => {
		localStorage.removeItem("token")
		window.location.href = "/"
	}

	return <AuthContext.Provider value={{ user, setUser, logoutUser }}>
		{children}
	</AuthContext.Provider>
}

const UseAuth = () => {
	return useContext(AuthContext)
}

export { UseAuth, AuthContextProvider };