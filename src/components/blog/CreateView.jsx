import { useEffect, useState } from "react";
import {
	Box,
	makeStyles,
	FormControl,
	InputBase,
	Button,
	TextareaAutosize,
	Select,
	MenuItem,
	InputLabel,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { categoriesData } from "../constants/data";
import { createPost, uploadFile, isAuthenticated } from "../../service/api";
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
		verticalAlign: "baseline",
	},
	textField: {
		flex: 0.7,
		margin: "0 30px",
		fontSize: 25,
		color: "white",
	},
	select: {
		flex: 0.2,
	},
	button: {
		flex: 0.1,
	},
	textArea: {
		width: "100%",
		marginTop: 50,
		border: "none",
		outline: "none",
		fontSize: 18,
	},
	icons: {
		cursor: "pointer",
	},
	text: {
		color: "white",
	},
}));

const { user } = isAuthenticated();

const initialValue = {
	title: "",
	description: "",
	picture: "",
	username: user ? user.username : "",
	categories: "",
	createdDate: new Date(),
};

const CreateView = () => {
	const classes = useStyle();
	const history = useHistory();

	const [post, setPost] = useState(initialValue);
	const [file, setFile] = useState("");
	const [imageURL, setImageURL] = useState("");
	const [isReady, setIsReady] = useState(false);
	const [formError, setFormError] = useState({});
	const { category } = post;

	const url =
		post.picture ||
		"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

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
		if (isReady === true) {
			savePost();
		} else {
			if (formError.title && formError.description && formError.categories) {
				return toast.error("Please Enter all Fields");
			}
			if (formError.title) {
				return toast.error("Please Enter Title");
			}
			if (formError.description) {
				return toast.error("Please Enter Description");
			}
			if (formError.categories) {
				return toast.error("Please Select a Category");
			}
		}
	}, [formError, isReady]);

	const handleChange = (e) => {
		setPost({ ...post, [e.target.name]: e.target.value });
	};

	const validate = (values) => {
		const errors = {};
		if (!values.title) {
			errors.title = "Please Enter a Title";
		}
		if (!values.description) {
			errors.description = "Please Enter Description";
		}
		if (!values.categories) {
			errors.categories = "Please Select a  Category";
		}
		if (values.title && values.description && values.categories) {
			setIsReady(true);
		}
		return errors;
	};

	const validateCreateBlog = () => {
		setFormError(validate(post));
	};

	const savePost = async () => {
		await createPost(post);
		toast.success("Blog posted Successfully");
		history.push("/");
	};

	return (
		<Box style={{ background: "#17202A" }}>
			<Box className={classes.container}>
				<img src={url} alt="blogBanner" className={classes.image} />
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
						onChange={(e) => handleChange(e)}
						className={classes.textField}
						name="title"
					/>
					<FormControl className={classes.select}>
						<InputLabel className={classes.text} id="selectCategory-label">
							Category
						</InputLabel>
						<Select
							className={classes.text}
							labelId="selectCategory-label"
							id="selectCategory"
							value={category}
							name="categories"
							onChange={(e) => handleChange(e)}>
							{categoriesData.map((item) => (
								<MenuItem key={item} value={item}>
									{item}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Button
						className={classes.button}
						onClick={() => validateCreateBlog()}
						variant="contained"
						color="primary">
						Publish
					</Button>
				</FormControl>
				<TextareaAutosize
					minRows={5}
					placeholder="Let's Start"
					onChange={(e) => handleChange(e)}
					className={classes.textArea}
					name="description"
				/>
			</Box>
		</Box>
	);
};

export default CreateView;
