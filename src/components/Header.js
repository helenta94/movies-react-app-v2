import React from 'react';
import {NavLink} from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchResults from "./SearchResults";

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchValue: "",

		};

		this.fetchData()
	}

	fetchData() {
		console.log(7);
		fetch("https://api.themoviedb.org/3/search/multi?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&query="
			+ this.state.searchValue +"&page=1&include_adult=false")
			.then(res => res.json())
			.then(res => console.log(res))
	}

	handlerChangeSearch(e) {
		this.setState({
			searchValue: e.target.value
		}, () => this.fetchData())
	}

	render() {
		return <header className={"my-header"}>
			<div className={"container"}>
				<div className={"right-block"}>
					<Link to={"/"} className={"logo"}>
						<i className="fas fa-film" />
						<span>MOVIES APP</span>
					</Link>
					<div className={"choice-category"}>
						<Link to={"/movies"} className={"item active"}>Movies</Link>
						<Link to={"/tv-series"} className={"item"}>TV series</Link>
						<Link to={"/cartoons"} className={"item"}>Cartoons</Link>
					</div>
				</div>
				<div className={"left-block"}>
					<div className={"search"}>
						<i className="fas fa-search" />
						<input onChange={(e) => this.handlerChangeSearch(e)}
									 value={this.state.searchValue}
									 className={"field-search"} placeholder={"Search"}/>
					</div>
					<div className={"search-results"}>

					</div>
					{/*<div className={"user"}>*/}
					{/*	<span className={"user-name"}>John Meyer</span>*/}
					{/*	<div className={"user-photo"}>*/}
					{/*		<i className="far fa-user" />*/}
					{/*	</div>*/}
					{/*</div>*/}
				</div>
			</div>
		</header>
	}
}