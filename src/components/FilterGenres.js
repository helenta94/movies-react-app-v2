import React from 'react';
import Dropdown from "./Dropdown";
import {genresMovie} from "../genresMovie"

export default class FilterGenres extends React.Component {

	constructor(props) {
		super(props);
	}

	handlerItemClick(id) {
		this.props.changeHandler(id);
	}

	render() {
		return <div className={"filter"}>
			<Dropdown list={genresMovie}
								selected={this.props.selected}
								dropdownName={"Genres"}
                handlerClick={(id) => this.handlerItemClick(id)}
								multiple={true} />
		</div>
	}
}