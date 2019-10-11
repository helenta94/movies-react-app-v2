import React from "react";

import Sorting from "../components/Sorting";

export default class MoviesPage extends React.Component {
	render() {
		return <div className={"page"}>
			<div className={"container"}>

				<Sorting/>
				<Sorting/>

				<h1 className={"headline"}>Films according to your request:</h1>
			</div>
		</div>
	}
}