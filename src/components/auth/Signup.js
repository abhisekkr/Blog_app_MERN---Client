import React, { useState, useEffect } from "react";
import SignupForm from "./SignupForm";
import { userSignup, isAuthenticated } from "../../service/api";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";

function Signup() {
	const history = useHistory();
	const { user } = isAuthenticated();

	useEffect(() => {
		if (user) {
			history.push("/");
		}
	}, [user, history]);

	const [signup, setSignup] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [formError, setFormError] = useState({});
	const [readytoSubmit, setReadyToSubmit] = useState(false);

	const { username, email, password } = signup;

	useEffect(() => {
		if (readytoSubmit === true) {
			signupUser();
		} else if (formError) {
			toast.error(Object.values(formError)[0]);
		}
	}, [formError, readytoSubmit]);

	const onInputChange = (e) => {
		setSignup({ ...signup, [e.target.name]: e.target.value });
	};

	const validate = (values) => {
		const errors = {};
		if (!values.username) {
			errors.username = "Please Enter Username";
		}
		if (!values.email) {
			errors.email = "Please Enter Email";
		}
		if (values.email && !values.email.includes("@")) {
			errors.email = "Invalid Email Format";
		}
		if (!values.password) {
			errors.password = "Please Enter Password";
		}
		if (
			values.username &&
			values.email &&
			values.email.includes("@") &&
			values.password
		) {
			setReadyToSubmit(true);
		}
		return errors;
	};

	const validateSignup = (e) => {
		e.preventDefault();
		setFormError(validate(signup));
	};

	const signupUser = async () => {
		let { data } = await userSignup(signup);
		if (data.error) {
			return toast.error(data.error);
		} else {
			toast.success("Signup Successfull , Please Login", {
				duration: 1500,
			});
			history.push("/login");
		}
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
			<SignupForm
				onInputChange={onInputChange}
				validateSignup={validateSignup}
				username={username}
				email={email}
				password={password}
			/>
		</div>
	);
}

export default Signup;
