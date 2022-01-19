import React from "react";
import Card from "./Card";

export default function Catalog() {
	return (
		<div>
			<h1 className="text-xl font-bold mb-5">Catalog</h1>
			<div className="flex flex-wrap gap-5">
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
				<Card />
			</div>
		</div>
	);
}
