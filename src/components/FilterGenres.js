import React from 'react';
import Dropdown from "./Dropdown";
import {genresMovie} from "../genresMovie"

export default class FilterGenres extends React.Component {

	constructor(props) {
		super(props);

		this.selectedMovie = [];
		console.log(this.props.genres)
	}

	handlerItemClick(id) {
		console.log(id);
		this.props.genres(id);

	}

	render() {
		return <div className={"sorting"}>
			<Dropdown list={genresMovie} selectedMovie={this.selectedMovie} handlerClick={(id) => this.handlerItemClick(id)} />
		</div>
	}
}