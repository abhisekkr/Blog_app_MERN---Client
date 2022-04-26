import { useState, useEffect } from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { Link, useHistory, useParams } from "react-router-dom";
import { getPost, deletePost } from "../../service/api";
import { isAuthenticated } from "../../service/api";
import toast from "react-hot-toast";
//components
import Comments from "../comments/Comments.jsx";

const useStyle = makeStyles((theme) => ({
	container: {
		width: "70%",
		padding: " 50px 100px",
		background: "#2E4053 ",
		margin: "auto",
		[theme.breakpoints.down("md")]: {
			margin: "auto",
		},
	},
	image: {
		width: "100%",
		height: "50vh",
		objectFit: "cover",
	},
	icons: {
		float: "right",
	},
	icon: {
		margin: 5,
		padding: 5,
		border: "1px solid #B3B6B7",
		borderRadius: 10,
		cursor: "pointer",
	},
	heading: {
		fontSize: 38,
		fontWeight: 600,
		textAlign: "center",
		margin: "50px 0 10px 0",
		color: "white",
	},
	subHeading: {
		color: "#B3B6B7",
		display: "flex",
		margin: "20px 0",

		[theme.breakpoints.down("sm")]: {
			display: "block",
		},
	},
	link: {
		textDecoration: "none",
		color: "inherit",
		cursor: "pointer",
	},
	details: {
		maxWidth: "100%",
		color: "white",
		marginTop: 50,
		border: "none",
		outline: "none",
		fontSize: 18,
		textAlign: "justify",
	},
}));

const DetailView = () => {
	const { user } = isAuthenticated();
	const classes = useStyle();
	const history = useHistory();
	const url =
		"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

	const { id } = useParams();

	const [blog, setBlog] = useState({});

	useEffect(() => {
		const fetchBlogData = async () => {
			let data = await getPost(id);
			setBlog(data);
		};
		fetchBlogData();
	}, [id]);

	const deleteBlog = async () => {
		await deletePost(blog._id);
		toast.success("Blog Deleted Successfully");
		history.push("/");
	};

	return (
		<Box style={{ background: "#17202A" }}>
			<Box className={classes.container}>
				<img
					src={blog.picture || url}
					alt="blogBanner"
					className={classes.image}
				/>

				{isAuthenticated() && user.username === blog.username && (
					<Box className={classes.icons}>
						<Link to={`/update/${blog._id}`} className={classes.link}>
							<Edit className={classes.icon} color="primary" />
						</Link>
						<Delete
							className={classes.icon}
							onClick={() => deleteBlog()}
							color="error"
						/>
					</Box>
				)}

				<Typography className={classes.heading}>{blog.title}</Typography>

				<Box className={classes.subHeading}>
					<Link to={`/?username=${blog.username}`} className={classes.link}>
						<Typography>
							Author: <span style={{ fontWeight: 600 }}>{blog.username}</span>
						</Typography>
					</Link>

					<Typography style={{ marginLeft: "auto" }}>
						{new Date(blog.createdDate).toDateString()}
					</Typography>
				</Box>

				<Typography className={classes.details}>{blog.description}</Typography>
				<Comments blog={blog} blogId={id} />
			</Box>
		</Box>
	);
};

export default DetailView;
