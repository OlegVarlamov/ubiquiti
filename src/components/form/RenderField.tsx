import React from "react";
import styled from "styled-components";

const StyledError = styled.span`
	color: firebrick;
`;

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {
	return (
		<div>
			<label htmlFor={input.name}>
				{label}
				<div>
					<input {...input} placeholder={label} type={type} />
					{touched && ((error && <StyledError>{error}</StyledError>) || (warning && <span>{warning}</span>))}
				</div>
			</label>
		</div>
	);
};

export default renderField;