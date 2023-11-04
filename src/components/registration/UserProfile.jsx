import React from "react";
import { useUserContext } from "../../contexts/UserContext";
import { useThemeContext } from "../../contexts/ThemeContext";

const UserProfile = ({ handleLoading }) => {
	const { state, dispatchHandler, setShowData, setShowForm } = useUserContext();
	const { themeStyle, mode } = useThemeContext();

	const { name, email, phone_no, color } = state;
	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	return (
		<section className="h-full flex items-center justify-center">
			<div
				className="w-[500px] text-black p-4 rounded-lg border border-[#61dafb] space-y-5 shadow-sm shadow-[#61dafb80] text-lg"
				style={{ backgroundColor: color ? color : theme.bg, color: theme.text }}
			>
				<h1>
					<b>Name : </b> {name}
				</h1>
				<h1>
					<b>Email :</b> {email}
				</h1>
				<h1>
					<b>PhoneNo :</b> {phone_no}
				</h1>
				<button
					onClick={() => {
						setShowData(false);
						setShowForm(true);
						handleLoading(false);
						dispatchHandler({ type: "reset" });
					}}
					className="border border-[#61DAFB] hover:bg-[#61DAFB] hover:text-black mt-3 py-2 w-full font-semibold rounded-md transition-colors duration-200"
				>
					Close
				</button>
			</div>
		</section>
	);
};

export default UserProfile;
