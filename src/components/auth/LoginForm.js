import React from "react";
import "./loginForm.css";
import { useHistory } from "react-router-dom";

function LoginForm({ onValueChange, loginUser, email, password }) {
	const history = useHistory();
	return (
		<div className="loginForm">
			<h2>LOGIN</h2>
			<form>
				<input
					onChange={(e) => onValueChange(e)}
					name="email"
					type="email"
					placeholder="Enter Email"
					value={email}
					autoComplete="off"
				/>
				<input
					onChange={(e) => onValueChange(e)}
					name="password"
					type="password"
					value={password}
					placeholder="Enter Password"
				/>
			</form>
			<button onClick={(e) => loginUser(e)}>Login</button>
			<p>OR</p>
			<p>
				New here ?{" "}
				<span onClick={() => history.push("/signup")}>Create account</span>
			</p>
		</div>
	);
}

export default LoginForm;
