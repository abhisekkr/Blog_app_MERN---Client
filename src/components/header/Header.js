import React, { useContext, useEffect } from "react";
import { isAuthenticated, userSignout } from "../../service/api";
import { UserContext } from "../../context/ContextProvider";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";

const useStyles = makeStyles({
	component: {
		background: "#1E1C1B",
		color: "white",
	},
	container: {
		justifyContent: "center",
		"& > * ": {
			//this will apply to all the child elements
			padding: 20,
		},
	},
	link: {
		textDecoration: "none",
		color: "inherit",
	},
	headers: {
		cursor: "pointer",
	},
});

const Header = () => {
	const history = useHistory();
	const classes = useStyles();
	const { user } = isAuthenticated();
	const { account, setAccount } = useContext(UserContext);

	useEffect(() => {
		if (user) {
			setAccount(true);
		} else {
			setAccount(false);
		}
	}, [account, setAccount, user]);

	const signout = () => {
		userSignout(() => {
			setAccount(!account);
			history.push("/");
			toast.success("Signout Successfull");
		});
	};

	return (
		<AppBar className={classes.component}>
			<Toolbar className={classes.container}>
				<Link to="/" className={classes.link}>
					<Typography>HOME</Typography>
				</Link>
				<Typography className={classes.headers}>ABOUT</Typography>
				<Typography className={classes.headers}>CONTACT</Typography>

				{account === false && (
					<>
						<Typography>
							<Link to="/login" className={classes.link}>
								SIGNIN
							</Link>
						</Typography>
						<Typography>
							<Link to="/signup" className={classes.link}>
								SIGNUP
							</Link>
						</Typography>
					</>
				)}
				{account === true && (
					<Typography className={classes.headers} onClick={signout}>
						SIGNOUT
					</Typography>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
