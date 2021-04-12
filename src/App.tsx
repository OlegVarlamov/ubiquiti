import React from "react";
import { Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { PublicRoute } from "components/routeComponents";
import Form from "components/form/Form";
import Table from "components/table/Table";
import "./App.css";

function App () {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute path='/list' component={ Table } />
				<PublicRoute path='/' component={ Form } />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
