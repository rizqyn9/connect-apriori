import React from "react";
import Sidebar from "./Sidebar";

function Home() {
	const [sideBarOpen, setSideBarOpen] = useState(false);
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />
			<h1>This is home page.</h1>
		</div>
	);
}

export default Home;
