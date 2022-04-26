import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles({
	image: {
		background: `url(${"https://techstory.in/wp-content/uploads/2018/05/how-to-start-a-successful-blog.png"}) center/55% repeat-x #000`,
		width: "100%",
		height: "50vh",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		color: "white",

		"& :first-child": {
			fontSize: 66,
			color: "white",
			lineHeight: 1,
		},
		"& :last-child": {
			fontSize: 20,
			background: "white",
			color: "black",
		},
	},
});

const Banner = () => {
	const classes = useStyles();
	return <Box className={classes.image}></Box>;
};

export default Banner;
