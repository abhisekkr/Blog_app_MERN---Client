import React, { useState, useEffect, useContext } from "react";
import LoginForm from "./LoginForm.js";
import {
	userSignin,
	authenticateSignin,
	isAuthenticated,
} from "../../service/api";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/ContextProvider";

function Login() {
	const history = useHistory();
	const { user } = isAuthenticated();
	const { setAccount } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			return history.push("/");
		}
	}, [user, history]);

	const [login, setLogin] = useState({
		email: "",
		password: "",
	});

	const { email, password } = login;
	const [formError, setFormError] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const onValueChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		if (isSubmit === true) {
			logUser();
		} else if (formError) {
			toast.error(Object.values(formError)[0]);
		}
	}, [isSubmit, formError]);

	const loginUser = (e) => {
		e.preventDefault();
		setFormError(validate(login));
	};

	const logUser = async () => {
		let { data } = await userSignin(login);

		if (data.error) {
			return toast.error(data.error);
		} else {
			authenticateSignin(data);
			setAccount(true);
			setLogin({ ...login, email: "", password: "" });
			toast.success("Login Successfull");
		}
	};

	const validate = (values) => {
		const errors = {};
		if (!values.email) {
			errors.email = "PLEASE ENTER EMAIL";
		}
		if (values.email && !values.email.includes("@")) {
			errors.email = "INVALID EMAIL FORMAT";
		}
		if (!values.password) {
			errors.password = "PLEASE ENTER PASSWORD";
		}
		if (values.email && values.email.includes("@") && values.password) {
			setIsSubmit(true);
		}
		return errors;
	};

	const authPage = {
		width: "100vw",
		height: "100vh",
		backgroundColor: "#17202A",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "-64px",
	};

	return (
		<div style={authPage}>
			<LoginForm
				onValueChange={onValueChange}
				loginUser={loginUser}
				email={email}
				password={password}
			/>
		</div>
	);
}

export default Login;
