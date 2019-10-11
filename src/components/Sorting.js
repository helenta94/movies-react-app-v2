import React from 'react';
import DropdownItem from "./DropdownItem";

export default class Sorting extends React.Component {

	constructor(props) {
		super(props);

	}



	render() {
		return <div className={"sorting"}>

			<DropdownItem type={"genres"} />
		</div>
	}
}