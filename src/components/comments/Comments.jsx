import { useState, useEffect } from "react";
import { Box, Button, TextareaAutosize, makeStyles } from "@material-ui/core";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
//API
import { newComment, getComments, isAuthenticated } from "../../service/api";
//component
import Comment from "./Comment.jsx";

const useStyles = makeStyles({
	component: {
		marginTop: 100,
		display: "flex",
		width: "80%",
	},
	image: {
		width: 40,
		height: 40,
		borderRadius: "50%",
		background: "white",
	},
	textArea: {
		width: "100%",
		margin: "0 20px",
		borderRadius: "10px",
		padding: 10,
		border: "none",
		outline: "none",
		background: "rgba(0, 0, 0, 0.3)",
		color: "white",
	},
	button: {
		height: 40,
	},
});

const initialValue = {
	name: "",
	postId: "",
	date: new Date(),
	comments: "",
};

function Comments({ blog, blogId }) {
	const { user } = isAuthenticated();
	const history = useHistory();
	const classes = useStyles();

	const [comment, setComment] = useState(initialValue);
	const [commentsData, setCommentsData] = useState([]);
	const [toggle, setToggle] = useState(false);

	const { name, postId, date, comments } = comment;

	useEffect(() => {
		const getCommentData = async () => {
			let response = await getComments(blogId);
			setCommentsData(response);
		};
		getCommentData();
	}, [blogId, toggle]);

	const url =
		"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=2000";

	const handleChange = (e) => {
		setComment({
			...comment,
			name: user ? user.username : "",
			postId: blog._id,
			comments: e.target.value,
		});
	};

	const postComment = async () => {
		if (!isAuthenticated()) {
			toast.error("Please SignIn to comment");
			return history.push("/login");
		}
		await newComment(comment);
		setComment({ ...comment, name: "", postId: "", comments: "" });
		toast.success("Comment posted successfully");
		setToggle((prev) => !prev);
	};

	return (
		<Box>
			<Box className={classes.component}>
				<img src={url} alt="dp" className={classes.image} />
				<TextareaAutosize
					minRows={4}
					className={classes.textArea}
					placeholder="What's on your mind?"
					value={comments}
					onChange={(e) => handleChange(e)}
				/>
				<Button
					variant="contained"
					color="primary"
					size="medium"
					className={classes.button}
					onClick={() => postComment()}>
					Post
				</Button>
			</Box>
			{commentsData?.map((com) => (
				<Comment
					key={com._id}
					data={com}
					commentDeleted={setToggle}
					post={blog}
				/>
			))}
		</Box>
	);
}

export default Comments;
