import React from "react";
import Banner from "../banner/Banner";
import HomeCategories from "./HomeCategories";
import Posts from "../blogCard/Posts";
import { Grid } from "@material-ui/core";

function Home() {
	return (
		<>
			<Banner />
			<Grid container>
				<Grid
					style={{ background: "#1E1C1B", border: "none", outline: "none" }}
					item
					lg={2}
					xm={12}
					sm={2}>
					<HomeCategories />
				</Grid>
				<Grid
					style={{ background: "#1E1C1B" }}
					container
					item
					lg={10}
					xs={12}
					sm={10}>
					<Posts />
				</Grid>
			</Grid>
		</>
	);
}

export default Home;
