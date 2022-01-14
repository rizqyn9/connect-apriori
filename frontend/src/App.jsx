import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";

function App() {
	// const location = useLocation();

	// useEffect(() => {
	// 	document.querySelector("html").style.scrollBehavior = "auto";
	// 	window.scroll({ top: 0 });
	// 	document.querySelector("html").style.scrollBehavior = "";
	// }, [location.pathname]); // triggered on route change

	return (
		<BrowserRouter>
			<Auth />
		</BrowserRouter>
	);
}

export default App;
