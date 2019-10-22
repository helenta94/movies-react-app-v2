import React from "react";
import Slider from "react-slick";
import MoviesSlider from "../components/MoviesSlider";

import FilterGenres from "../components/FilterGenres";

export default class MoviesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popularMovies: [],
			selectedGenres: [],

		};

		this.fetchData();
	}

	fetchData() {
		Promise.all([
			fetch("https://api.themoviedb.org/3/movie/popular?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&page=1")

		]).then(response => Promise.all(response.map(res => res.json())))
			.then(response => this.setState({
				popularMovies: response[0].results
			})).then(() => console.log(this.state.popularMovies))
	}

	genresData(id) {
		
		fetch("https://api.themoviedb.org/3/discover/movie?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d"
			+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
			+"&with_genres="+ id)
			.then(res => res.json())
			.then(res => console.log(res))
		//with_genres
	}

	render() {
		return <div className={"page"}>
			<div className={"container"}>
				<FilterGenres genres={this.genresData} />
			</div>
		</div>
	}
}