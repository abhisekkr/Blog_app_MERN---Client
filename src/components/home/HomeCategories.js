import React from "react";
import {
	Button,
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { categoriesData } from "../constants/data";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
	create: {
		margin: 20,
		width: "85%",
		background: "#6495ED",
		color: "white",
		textDecoration: "none",
	},
	table: {
		border: "1px solid rgba(224,224,224,1)",
	},
	link: {
		textDecoration: "none",
		color: "white",
	},
});

function HomeCategories() {
	const classes = useStyle();
	return (
		<div>
			<Link to="/create" className={classes.link}>
				<Button variant="contained" className={classes.create}>
					Create Blog
				</Button>
			</Link>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell>
							<Link to={"/"} className={classes.link}>
								All
							</Link>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{categoriesData.map((category) => (
						<TableRow key={category}>
							<TableCell>
								<Link to={`/?category=${category}`} className={classes.link}>
									{category}
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default HomeCategories;
