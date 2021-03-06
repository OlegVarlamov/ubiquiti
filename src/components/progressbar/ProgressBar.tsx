import React from "react";

interface Props {
  completed: number;
}

const ProgressBar = ({ completed }: Props) => {
	const containerStyles = {
		height: 20,
		width: "100%",
		backgroundColor: "#e0e0de",
		borderRadius: 50,
		margin: 50
	};

	const fillerStyles = {
		height: "100%",
		width: `${ completed }%`,
		backgroundColor: "#008000",
		borderRadius: "inherit",
	};

	const labelStyles = {
		padding: 5,
		color: "white",
		fontWeight: 600
	};

	return (
		<div style={ containerStyles }>
			<div style={ fillerStyles }>
				<span style={ labelStyles }>{ `${ completed }%` }</span>
			</div>
		</div>
	);
};

export default ProgressBar;