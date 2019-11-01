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
					persons: persons,
					movies: movies,
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
					<NavLink to={"/"} className={"logo"}>
						<i className="fas fa-film" />
						<span>MOVIES APP</span>
					</NavLink>
					<div className={"choice-category"}>
						<NavLink to={"/movies"} className={"item"}>Movies</NavLink>
						<NavLink to={"/tv-series"} className={"item"}>TV series</NavLink>
						{/*<Link to={"/cartoons"} className={"item"}>Cartoons</Link>*/}
					</div>
				</div>
				<div className={"left-block"}>
					<div className={"search"}>
						<i className="fas fa-search" />
						<input onChange={(e) => this.handlerChangeSearch(e)}
									 value={this.state.searchValue}
									 className={"field-search"} placeholder={"Search"}/>
					</div>
					{this.state.searchValue !== ""
						? <div className={"search-results"}>
							<div className={"movies"}>
								{this.state.movies.map((item, index) => {
									if (index < 3) {
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
							<div className={"persons"}>
								{this.state.persons.map((item, index) => {
									if (index < 3) {
										return <Link to={"/person/" + item.id} key={item.id} children={item.name}/>}
								})}
							</div>
							{this.state.movies.length > 3 || this.state.persons.length > 3
								? <Link to={"/search/alll-results"} className={"all-results"}>All results</Link>
								: null
							}
							{this.state.movies.length === 0 && this.state.persons.length === 0
								? <div className={"not-found-result"}>Nothing found</div>
								: null
							}
						</div>
						: null
					}

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