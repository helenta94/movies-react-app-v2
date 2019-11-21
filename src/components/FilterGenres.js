import React from 'react';
import Dropdown from "./Dropdown";
import {genres, genresMovie, genresTv} from "../genresMovie"

export default class FilterGenres extends React.Component {

	constructor(props) {
		super(props);
	}

	handlerItemClick(id) {
		this.props.changeHandler(id);
	}

	render() {
		return <div className={"filter"}>
			<Dropdown list={this.props.type === "tv" ? genresTv : genresMovie}
								selected={this.props.selected}
								dropdownName={"Genres"}
                handlerClick={(id) => this.handlerItemClick(id)}
								multiple={true} />
		</div>
	}
}