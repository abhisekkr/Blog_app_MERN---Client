import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import { Toaster } from "react-hot-toast";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import CreateView from "./components/blog/CreateView.jsx";
import DetailView from "./components/blog/DetailView.jsx";
import UpdateView from "./components/blog/UpdateView.jsx";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ContextProvider from "./context/ContextProvider";

function App() {
	return (
		<div>
			<ContextProvider>
				<Router>
					<Header />
					<Box style={{ marginTop: 64 }}>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/login" component={Login} />
							<Route path="/signup" component={Signup} />
							<PrivateRoute path="/create" component={CreateView} />
							<Route path="/details/:id" component={DetailView} />
							<Route path="/update/:id" component={UpdateView} />
						</Switch>
					</Box>
				</Router>
			</ContextProvider>
			<Toaster />
		</div>
	);
}

export default App;
