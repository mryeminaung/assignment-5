import { createContext, useContext, useReducer, useState } from "react";

const initialState = {
	name: "",
	email: "",
	phone_no: "",
	color: "#08011C",
	pwd: "",
	comfirmPwd: "",
};

const reducer = (state, action) => {
	switch (action.type) {
		case "name_change":
			return { ...state, name: action.payload };
		case "email_change":
			return { ...state, email: action.payload };
		case "phone_no_change":
			return { ...state, phone_no: action.payload };
		case "color_change":
			return { ...state, color: action.payload };
		case "pwd_change":
			return { ...state, pwd: action.payload };
		case "comfirmPwd_change":
			return { ...state, comfirmPwd: action.payload };
		case "reset":
			return initialState;
		default:
			return state;
	}
};

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [showData, setShowData] = useState(false);
	const [showForm, setShowForm] = useState(true);
	const [loading, setLoading] = useState(false);

	return (
		<UserContext.Provider
			value={{
				state,
				dispatchHandler: dispatch,
				showData,
				setShowData,
				showForm,
				setShowForm,
				loading,
				setLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	return useContext(UserContext);
};

export default UserContext;
