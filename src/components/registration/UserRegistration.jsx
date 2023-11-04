import React, { useReducer, useState } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useThemeContext } from "../../contexts/ThemeContext";
import UserProfile from "./UserProfile";
import { FaSpinner } from "react-icons/fa6";

const initialState = {
	nameError: false,
	emailError: false,
	phone_noError: false,
	pwdError: false,
	comfirmPwdError: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "setError":
			return { ...state, [action.errorName]: true };
		case "clearError":
			return { ...state, [action.errorName]: false };
		default:
			return state;
	}
};

const UserRegistration = () => {
	const { themeStyle, mode } = useThemeContext();
	const {
		state,
		dispatchHandler,
		showData,
		setShowData,
		showForm,
		setShowForm,
		loading,
		setLoading,
	} = useUserContext();

	const [error, dispatch] = useReducer(reducer, initialState);

	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	const handleValidationAndSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		const { name, email, phone_no, pwd, comfirmPwd } = state;

		if (name && email && phone_no && pwd && comfirmPwd && pwd === comfirmPwd) {
			dispatch({ type: "clearError", errorName: "nameError" });
			dispatch({ type: "clearError", errorName: "emailError" });
			dispatch({ type: "clearError", errorName: "phone_noError" });
			dispatch({ type: "clearError", errorName: "pwdError" });
			dispatch({ type: "clearError", errorName: "comfirmPwdError" });

			setTimeout(() => {
				setShowData(true);
				setShowForm(false);
			}, 1500);
		} else {
			if (!name) {
				dispatch({ type: "setError", errorName: "nameError" });
			} else {
				dispatch({ type: "clearError", errorName: "nameError" });
			}

			if (!email) {
				dispatch({ type: "setError", errorName: "emailError" });
			} else {
				dispatch({ type: "clearError", errorName: "emailError" });
			}
			if (!phone_no) {
				dispatch({ type: "setError", errorName: "phone_noError" });
			} else {
				dispatch({ type: "clearError", errorName: "phone_noError" });
			}
			if (!pwd) {
				dispatch({ type: "setError", errorName: "pwdError" });
			} else {
				dispatch({ type: "clearError", errorName: "pwdError" });
			}
			if (!comfirmPwd || pwd !== comfirmPwd) {
				dispatch({ type: "setError", errorName: "comfirmPwdError" });
			} else {
				dispatch({ type: "clearError", errorName: "comfirmPwdError" });
			}
			setLoading(false);
		}
	};

	return (
		<div className="h-full flex items-center justify-center">
			{showForm && (
				<form
					method="post"
					onSubmit={(e) => handleValidationAndSubmit(e)}
					className="rounded-md w-[500px] px-5 py-3 border border-[#61dafb] shadow-sm shadow-[#61dafb80]"
					style={{ backgroundColor: theme.bg }}
				>
					{/* username input field */}
					<div className="input-group">
						<label className="input-label" htmlFor="name">
							Name <span className="required-field">*</span>
						</label>
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Enter your name"
							value={state.name}
							onChange={(e) => {
								dispatchHandler({ type: "name_change", payload: e.target.value });
							}}
						/>

						{/* username error checking */}
						{error.nameError && <p className="error">required</p>}
					</div>

					{/* email input field */}
					<div className="input-group">
						<label className="input-label" htmlFor="email">
							Email <span className="required-field">*</span>
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Enter your email"
							value={state.email}
							onChange={(e) => {
								dispatchHandler({ type: "email_change", payload: e.target.value });
							}}
						/>

						{/* email error checking */}
						{error.emailError && <p className="error">required</p>}
					</div>

					{/* phone number input field */}
					<div className="input-group">
						<label className="input-label" htmlFor="phone_no">
							Phone Number <span className="required-field">*</span>
						</label>
						<input
							type="tel"
							name="phone_no"
							id="phone_no"
							placeholder="Enter your phone number"
							value={state.phone_no}
							onChange={(e) => {
								dispatchHandler({ type: "phone_no_change", payload: e.target.value });
							}}
						/>
						{/* phone number error checking */}
						{error.phone_noError && <p className="error">required</p>}
					</div>

					{/* color choice input field */}
					<div className="input-group">
						<label className="input-label" htmlFor="color">
							Select your favorite color <span className="required-field">*</span>
						</label>
						<input
							type="color"
							name="color"
							id="color"
							className="h-[40px]"
							value={state.color}
							onChange={(e) =>
								dispatchHandler({ type: "color_change", payload: e.target.value })
							}
						/>
					</div>

					{/* password input field */}
					<div className="input-group">
						<label className="input-label" htmlFor="pwd">
							Password <span className="required-field">*</span>
						</label>
						<input
							type="password"
							name="pwd"
							id="pwd"
							placeholder="Enter your password"
							value={state.pwd}
							onChange={(e) => {
								dispatchHandler({ type: "pwd_change", payload: e.target.value });
							}}
						/>

						{/* password error checking */}
						{error.pwdError && <p className="error">required</p>}
					</div>

					{/* comfirm password input field */}
					<div className="input-group">
						<label className="input-label" htmlFor="comfirm_pwd">
							Comfirm Password <span className="required-field">*</span>
						</label>
						<input
							type="password"
							name="comfirm_pwd"
							id="comfirm_pwd"
							placeholder="Comfirm your password"
							value={state.comfirmPwd}
							onChange={(e) => {
								dispatchHandler({ type: "comfirmPwd_change", payload: e.target.value });
							}}
						/>

						{/* comfirm password error checking */}
						{error.comfirmPwdError && (
							<p className="error">passwords are not identical...</p>
						)}
					</div>

					<div className="input-group">
						<button
							type="submit"
							className="border border-[#61dafb] mt-3 py-2 w-full rounded-md hover:bg-[#61dafb] hover:text-black transition-all duration-150"
						>
							{loading ? (
								<span className="flex items-center gap-x-3 justify-center">
									Submitting
									<FaSpinner className="spinner" />
								</span>
							) : (
								"Submit"
							)}
						</button>
					</div>
				</form>
			)}

			{/* This will be shown when the user filled all the required fields and submitted the form */}
			{showData && <UserProfile handleLoading={setLoading} />}
		</div>
	);
};

export default UserRegistration;
