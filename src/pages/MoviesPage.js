import React from "react";

import FilterGenres from "../components/FilterGenres";
import FilterSortBy from "../components/FilterSortBy";
import FilterYears from "../components/FilterYears";
import MovieItem from "../components/MovieItem";
import moment from "moment";
import FilterCountry from "../components/FilterCountry";

export default class MoviesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popularMovies: [],
			selectedGenres: [],
			selectedSortBy: ["popularity.desc"],
			resultsMovies: [],
			selectedYears: [-1],
			selectedCountry: [],
			page: 1,
			pageChanged: false,

		};

		this.fetchData();
	}

	fetchData() {
		console.log(8);
		let genresStr = "";
		if (this.state.selectedGenres.length > 0) {
			genresStr = "&with_genres="
				+ this.state.selectedGenres.join(",");
		}

		let sortByStr = "&sort_by=" + this.state.selectedSortBy[0];
		let pageCount = "&page=" + this.state.page;

		//let country = "&certification_country=" + this.state.selectedCountry[0];
		let results = this.state.resultsMovies;

		fetch("https://api.themoviedb.org/3/discover/movie?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d"
			+"&language=en-US" + sortByStr + this.getFilterYear() +"&include_adult=false&include_video=false&page=1"
		  + genresStr + pageCount)
			.then(res => res.json())
			.then(res => {
				this.state.pageChanged
					? results = results.concat(res.results)
					: results = res.results
			})
			.then(() => this.setState({
				resultsMovies: results,
				pageChanged: false,
			}));
	}

	getFilterYear() {
		if (Array.isArray(this.state.selectedYears[0])) {
			let start = moment(this.state.selectedYears[0][0], "YYYY")
				.startOf("year")
				.format("YYYY-MM-DD");

			let end = moment(this.state.selectedYears[0][1], "YYYY")
				.endOf("year")
				.format("YYYY-MM-DD");

			return `&primary_release_date.gte=${start}&primary_release_date.lte=${end}`;
		} else if (this.state.selectedYears[0] === -1) {
			let start = moment(1940, "YYYY")
				.startOf("year")
				.format("YYYY-MM-DD");

			let end = moment()
				.add(1, "years")
				.endOf("year")
				.format("YYYY-MM-DD");

			return `&primary_release_date.gte=${start}&primary_release_date.lte=${end}`;
		}

		return "&primary_release_year=" + this.state.selectedYears[0];
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

	handleYearsChanged(id) {
		this.setState({
			selectedYears: [id]
		}, () => this.fetchData());
	}

	handleMoreMovie() {
		this.setState({
			page: this.state.page + 1,
			pageChanged: true,

		}, () => {
			this.fetchData()})

	}

	// componentDidMount() {
	// 	window.addEventListener('scroll', this.handleMoreMovie.bind(this));
	// }
	//
	// componentWillUnmount() {
	// 	window.addEventListener('scroll', this.handleMoreMovie.bind(this));
	// }

	render() {
		return <div className={"page movies-page"}>
			<div className={"container"}>
				<div className={"filters"}>
					<FilterGenres changeHandler={this.handleGenreChanged.bind(this)}
												selected={this.state.selectedGenres}/>
					<FilterYears changeHandler={this.handleYearsChanged.bind(this)}
											 selected={this.state.selectedYears}/>
					<FilterSortBy changeHandler={this.handleSortChanged.bind(this)}
												selected={this.state.selectedSortBy}/>
				</div>
				{/*<h1 className={"headline"}>Movies according to your request</h1>*/}
				<div className={"results"}>
					{this.state.resultsMovies.map(item => {
						return <div className={"result"}>
							<MovieItem item={item} key={item.id} type={"movie"}/>
						</div>
					})}
				</div>
				<button className={"btn-more-movies"} onClick={() => this.handleMoreMovie()}>
					<i className="fas fa-sync-alt"/>
					<span children={"Load more"}/>
				</button>
			</div>
		</div>
	}
}