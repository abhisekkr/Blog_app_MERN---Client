import React from "react";
import "./signupForm.css";
import { useHistory } from "react-router-dom";

function SignupForm({
	onInputChange,
	validateSignup,
	username,
	email,
	password,
}) {
	const history = useHistory();

	return (
		<div className="signupForm">
			<h2>SIGNUP</h2>
			<form>
				<input
					onChange={(e) => onInputChange(e)}
					name="username"
					type="text"
					placeholder="Enter Username"
					value={username}
					autoComplete="off"
				/>
				<input
					onChange={(e) => onInputChange(e)}
					name="email"
					type="email"
					placeholder="Enter Email"
					value={email}
					autoComplete="off"
				/>
				<input
					onChange={(e) => onInputChange(e)}
					name="password"
					type="password"
					placeholder="Enter Password"
					value={password}
				/>
			</form>

			<button onClick={(e) => validateSignup(e)}>Sign up</button>
			<p>
				Existing User ?
				<span onClick={() => history.push("/login")}> Log in</span>
			</p>
		</div>
	);
}

export default SignupForm;
