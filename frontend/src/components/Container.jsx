import React from "react";
import { Container as MUIContainer } from "@material-ui/core";

export default function Container({ children }) {
	return (
		<MUIContainer maxWidth="xl" style={{ background: "red" }}>
			{children}
		</MUIContainer>
	);
}
