import React from "react";
import { Route } from "react-router";
import Menu from "./menu/Menu";
import styled from "styled-components";

const TopBar = styled.header`
	width: 100vw;
	height: 60px;
	box-shadow: 0 0 5px rgba(0,0,0,.2);
`;

export const PublicRoute = ({ component: Component, ...rest }: any) => {
	return (
		<Route
			{ ...rest }
			render={ props => (
				<>
					<TopBar><Menu /></TopBar>
					<Component { ...props } />
				</>
			) }
		/>
	);
};
