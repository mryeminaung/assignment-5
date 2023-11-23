import { useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const TempConverter = () => {
	const { themeStyle, mode } = useThemeContext();
	const [celsiusValue, setCelsiusValue] = useState(0);
	const [fahrenheitValue, setFahrenheitValue] = useState(32);

	const theme = mode === "light" ? themeStyle.light : themeStyle.dark;

	const tempConverter = (e) => {
		const { name, value } = e.target;
		const tempVal = parseFloat(value);

		if (name === "celsius") {
			let tempFah = (value * (9 / 5) + 32).toFixed(2);
			setFahrenheitValue(tempFah);
		} else if (name === "fahrenheit") {
			let tampCel = (value * (5 / 9) - 32).toFixed(2);
			setCelsiusValue(tampCel);
		}
	};

	return (
		<section className="container min-h-screen py-32 mx-auto h-full flex flex-col items-center justify-center">
			<div
				className="w-[80%] md:w-[600px] p-6 rounded-lg border shadow-sm shadow-[#61dafb80] border-[#61dafb]"
				style={{ backgroundColor: theme.bg }}
			>
				<div className="flex flex-col md:flex-row items-center justify-between gap-x-5">
					<div className="temp-group">
						<label htmlFor="celsius" className="temp-label">
							Celsius <span className="text-[#61DAFB]">( °C )</span>
						</label>
						<input
							type="number"
							name="celsius"
							id="celsius"
							value={celsiusValue}
							onChange={(e) => {
								setCelsiusValue(e.target.value);
								tempConverter(e);
							}}
						/>
					</div>
					<div className="temp-grou py-5 md:pt-10">
						<FaArrowRightArrowLeft className="text-4xl rotate-90 md:rotate-0" />
					</div>
					<div className="temp-group">
						<label htmlFor="fahrenheit" className="temp-label">
							Fahrenheit <span className="text-[#61DAFB]">( °F )</span>
						</label>
						<input
							type="number"
							name="fahrenheit"
							id="fahrenheit"
							value={fahrenheitValue}
							onChange={(e) => {
								setFahrenheitValue(e.target.value);
								tempConverter(e);
							}}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TempConverter;
