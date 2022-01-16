import React from "react";
import { Switch, Route } from "react-router-dom";
import { SignIn, SignUp } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

function App() {
	// const location = useLocation();

	// useEffect(() => {
	// 	document.querySelector("html").style.scrollBehavior = "auto";
	// 	window.scroll({ top: 0 });
	// 	document.querySelector("html").style.scrollBehavior = "";
	// }, [location.pathname]); // triggered on route change

	return (
		<Switch>
			<Route path="/auth/signin" component={SignIn} exact />
			<Route path="/auth/signup" component={SignUp} exact />
			<Route path="/" component={Dashboard} />
		</Switch>
	);
}

export default App;
