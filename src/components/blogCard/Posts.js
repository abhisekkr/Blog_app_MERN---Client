import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Post from "./Post.jsx";
import { Link, useLocation } from "react-router-dom";
import { getAllPosts } from "../../service/api";
import NotFound from "../error/NotFound";

function Posts() {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();

	useEffect(() => {
		const fetchData = async () => {
			let data = await getAllPosts(search);
			setPosts(data);
		};
		fetchData();
	}, [search]);

	return (
		<>
			{posts.length === 0 ? (
				<NotFound />
			) : (
				posts.map((post) => (
					<Grid item lg={3} sm={4} xs={12} key={post._id}>
						<Link
							to={`/details/${post._id}`}
							style={{ textDecoration: "none", color: "inherit" }}>
							<Post post={post} />
						</Link>
					</Grid>
				))
			)}
		</>
	);
}

export default Posts;
