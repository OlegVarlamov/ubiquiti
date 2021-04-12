import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	a {
		color: #000;
		text-decoration: none;
		line-height: 60px;
		margin: auto 20px;
	}
`;

const Menu = () => <StyledMenu>
	<NavLink to="/list" activeStyle={ { color: 'red' } }>List</NavLink>
	<NavLink to="/form" activeStyle={ { color: 'red' } }>Form</NavLink>
</StyledMenu>;

export default Menu;