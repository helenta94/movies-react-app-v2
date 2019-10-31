import React from 'react';
import {NavLink} from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchResults from "./SearchResults";
import moment from "moment";

export default class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			searchValue: "",
			persons: [],
			movies: [],
		};

	}

	fetchData() {
		console.log(7);
		fetch("https://api.themoviedb.org/3/search/multi?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&query="
			+ this.state.searchValue +"&page=1&include_adult=false")
			.then(res => res.json())
			.then(res => {
				let persons = [];
				let movies = [];
				res.results.map(item => {
					item.media_type === "person"
						? persons.push(item)
						: movies.push(item);
				});

				this.setState({
					pesons: persons,
					movies: movies,
				}, () => {
					console.log(this.state.persons, this.state.movies)
				})
			})
	}

	handlerChangeSearch(e) {
		this.setState({
			searchValue: e.target.value
		}, () => {
			if (this.state.searchValue !== "") {
				this.fetchData()
			}
		})
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
						<div className={"movies"}>
							{this.state.movies.map((item, index) => {
								if (index < 4) {
									return <Link to={item.media_type === "movie" ? "/movies/" + item.id : "/tv-shows/" + item.id}
															 className={"search-movie-item"}
															 key={item.id}>
										<img className={"poster"}
												 alt={"poster image"}
												 src={"https://image.tmdb.org/t/p/w200" + item.poster_path} />
										<div className={"info"}>
											<div>
												<span className={"name"}>{item.title || item.name}</span>
												<span className={item.media_type === "movie" ? "type" : "type tv"}>
													{item.media_type === "tv" ? "tv-show" : item.media_type}
												</span>
											</div>
										</div>
									</Link>
								}
							})}
						</div>

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