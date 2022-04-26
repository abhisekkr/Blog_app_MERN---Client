import { useState, useEffect } from "react";
import { getPost, updatePost, uploadFile } from "../../service/api";
import {
	Box,
	makeStyles,
	FormControl,
	InputBase,
	Button,
	TextareaAutosize,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";

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
	form: {
		display: "flex",
		flexDirection: "row",
		marginTop: 10,
	},
	textField: {
		flex: 1,
		margin: "0 30px",
		fontSize: 25,
	},
	textArea: {
		width: "100%",
		marginTop: 50,
		border: "none",
		outline: "none",
		fontSize: 18,
	},
}));

const initialValue = {
	title: "",
	description: "",
	picture: "",
	username: "codeForInterview",
	categories: "ALL",
	createdDate: new Date(),
};

const UpdateView = () => {
	const classes = useStyle();
	const { id } = useParams();
	const history = useHistory();

	const [post, setPost] = useState(initialValue);
	const [file, setFile] = useState("");
	const [imageURL, setImageURL] = useState("");

	useEffect(() => {
		const getImage = async () => {
			if (file) {
				const data = new FormData();
				data.append("name", file.name);
				data.append("file", file);

				const image = await uploadFile(data);
				post.picture = image.data;
				setImageURL(image.data);
			}
		};
		getImage();
	}, [file, post]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getPost(id);
			console.log(data);
			setPost(data);
		};
		fetchData();
	}, [id]);

	const handleChange = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value });
	};

	const updateBlog = async () => {
		await updatePost(id, post);
		toast.success("Blog updated Successfully");
		history.push(`/details/${id}`);
	};

	const url =
		post.picture ||
		"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
	return (
		<Box style={{ background: "#17202A" }}>
			<Box className={classes.container}>
				<img src={url} alt="banner" className={classes.image} />
				<FormControl className={classes.form}>
					<label htmlFor="fileInput">
						<AddCircle
							fontSize="large"
							color="action"
							className={classes.icons}
						/>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<InputBase
						placeholder="Title"
						value={post.title}
						onChange={(e) => handleChange(e)}
						className={classes.textField}
						name="title"
					/>
					<Button
						variant="contained"
						onClick={() => updateBlog()}
						color="primary">
						Update
					</Button>
				</FormControl>
				<TextareaAutosize
					minRows={5}
					placeholder="Let's Start"
					value={post.description}
					onChange={(e) => handleChange(e)}
					className={classes.textArea}
					name="description"
				/>
			</Box>
		</Box>
	);
};

export default UpdateView;
