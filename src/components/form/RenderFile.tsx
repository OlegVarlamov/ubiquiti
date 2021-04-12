import React from "react";
import { WrappedFieldProps } from "redux-form";
import styled from "styled-components";

const StyledError = styled.span`
	color: firebrick;
	font-size: .7rem;
`;

interface CustomFieldProps {
	type?: string;
}

const handleChange = (handler) => ({ target: { files } }) => {
	handler(files.length ? {
		name: files[ 0 ].name,
		size: files[ 0 ].size,
		localImageUrl: window.URL.createObjectURL(files[ 0 ])
	} : {});
};

// eslint-disable-next-line no-unused-vars
const RenderFile = ({ input: { onChange, onBlur, value: omitValue, ...inputProps }, meta: {touched, error, warning}, ...props }: WrappedFieldProps & CustomFieldProps) => (
	<>
		<input type="file"
			onChange={ handleChange(onChange) }
			onBlur={ handleChange(onBlur) }
			{ ...inputProps }
			{ ...props }
		/>
		{touched && ((error && <StyledError>{ error }</StyledError>) || (warning && <span>{ warning }</span>)) }
	</>
);

export default RenderFile;