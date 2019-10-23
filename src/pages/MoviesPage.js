import React from "react";
import Slider from "react-slick";
import MoviesSlider from "../components/MoviesSlider";

import FilterGenres from "../components/FilterGenres";
import FilterSortBy from "../components/FilterSortBy"
import MovieItem from "../components/MovieItem";

export default class MoviesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popularMovies: [],
			selectedGenres: [],
			selectedSortBy: ["popularity.desc"],
			resultsMovies: []
		};

		this.fetchData();
	}

	fetchData() {
		let genresStr = "";
		if (this.state.selectedGenres.length > 0) {
			genresStr = "&with_genres="
				+ this.state.selectedGenres.join(",");
		}

		let sortByStr = "&sort_by=" + this.state.selectedSortBy[0];

		fetch("https://api.themoviedb.org/3/discover/movie?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d"
			+"&language=en-US"+ sortByStr +"&include_adult=false&include_video=false&page=1"
		  + genresStr)
			.then(res => res.json())
			.then(res => this.setState({
				resultsMovies: res.results
			}));
	}

	handleGenreChanged(id) {
		const index = this.state.selectedGenres.findIndex((el) => el === id);

		if (index >= 0) {
			const selected = this.state.selectedGenres.slice();
			selected.splice(index,1);
			this.setState({
				selectedGenres: selected
			}, () => {
				this.fetchData()
			})
		} else {
			this.setState({
				selectedGenres: this.state.selectedGenres.concat(id)
			}, () => {
				this.fetchData()
			});
		}
	}

	handleSortChanged(id) {
		this.setState({
			selectedSortBy: [id]
		}, () => {
			this.fetchData()
		});
	}

	render() {
		return <div className={"page movies-page"}>
			<div className={"container"}>
				<div className={"filters"}>
					<FilterGenres changeHandler={this.handleGenreChanged.bind(this)}
												selected={this.state.selectedGenres}/>
					<FilterSortBy changeHandler={this.handleSortChanged.bind(this)}
												selected={this.state.selectedSortBy}/>
				</div>
				<h1 className={"headline"}>Movies according to your request</h1>
				<div className={"results"}>
					{this.state.resultsMovies.map(item => {
						return <div className={"result"}>
							<MovieItem item={item} key={item.id} type={"movie"}/>
						</div>
					})}
				</div>
			</div>
		</div>
	}
}