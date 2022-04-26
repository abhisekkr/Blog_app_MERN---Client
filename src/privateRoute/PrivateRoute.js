import React from "react";
import { isAuthenticated } from "../service/api";
import { Route, useHistory } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
	const history = useHistory();
	return (
		<Route
			{...rest}
			render={isAuthenticated() ? children : history.push("/login")}
		/>
	);
}

export default PrivateRoute;
