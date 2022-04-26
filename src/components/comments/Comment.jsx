import React from "react";
import { deleteComment, isAuthenticated } from "../../service/api";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import toast from "react-hot-toast";

const useStyles = makeStyles({
	component: {
		marginTop: 30,
		background: "#5D6D7E",
		padding: 10,
		borderRadius: 10,
		width: "50%",
		marginLeft: "auto",
	},
	container: {
		display: "flex",
		marginBottom: 5,
	},
	name: {
		fontSize: 15,
		fontWeight: 600,
		marginRight: 20,
		letterSpacing: 0.9,
	},
	date: {
		fontSize: 12,
		color: "#88888",
		textAlign: "center",
	},
	delete: {
		marginLeft: "auto",
		cursor: "pointer",
	},
	comment: {
		color: "white",
		fontSize: 13,
	},
});

function Comment({ data, commentDeleted, post }) {
	const { user } = isAuthenticated();
	const classes = useStyles();

	const removeComment = async () => {
		await deleteComment(data._id);
		toast.success("Comment deleted");
		commentDeleted((prev) => !prev);
	};

	return (
		<Box className={classes.component}>
			<Box className={classes.container}>
				<Typography className={classes.name}>{data.name}</Typography>
				<Typography className={classes.date}>
					{new Date(data.date).toDateString()}
				</Typography>
				{isAuthenticated() && user.username === data.name && (
					<Delete onClick={removeComment} className={classes.delete} />
				)}
			</Box>

			<Typography className={classes.comment}>{data.comments}</Typography>
		</Box>
	);
}

export default Comment;
