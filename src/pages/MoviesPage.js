import React from "react";

import FilterGenres from "../components/FilterGenres";
import FilterSortBy from "../components/FilterSortBy";
import FilterYears from "../components/FilterYears";
import MovieItem from "../components/MovieItem";
import moment from "moment";
import FilterCountry from "../components/FilterCountry";
import Loader from "../components/Loader";

export default class MoviesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popularMovies: [],
			selectedGenres: [],
			selectedSortBy: [],
			selectedYears: [],
			selectedCountry: [],
			resultsMovies: [],
			currentPage: 1,
			pageChanged: false,
			isLoading: true,
			totalPages: 1,
			response: [],

		};
	}

	componentDidMount() {
		this.setFiltersHash();
	}

	setFiltersHash(newHashdata) {
		console.log(newHashdata)
		let data= {};
		let hashdata = window.location.hash;
		let sortBy, yearLte, yearGte, year, filterGenres, years;

		if (newHashdata !== undefined) {
			hashdata = window.location.hash = newHashdata;
		}

		if (hashdata === "") {
			hashdata = window.location.hash = "&sort_by=popularity.desc&primary_release_date.gte=1940-01-01&primary_release_date.lte=2020-12-31";
		}
		hashdata.split("&").map(item => item.split("=")).forEach(item => data[item[0]] = item[1]);

		for (let key in data) {
			if (key ==="primary_release_date.gte") {
				yearGte = data[key];
			}
			if (key ==="primary_release_date.lte") {
				yearLte = data[key];
			}
			if (key ==="primary_release_year") {
				year = data[key];
			}
			if (key ==="sort_by") {
				sortBy = data[key];
			}
			if (key ==="with_genres") {
				filterGenres = data[key];
			}
		}

		years = yearLte !== undefined ? [[yearGte, yearLte]] : [year];

		if (filterGenres !== undefined) {
			this.setState({
				selectedSortBy: [sortBy],
				selectedGenres: [filterGenres],
				selectedYears: years,
			}, () => this.fetchData());
		} else {
			this.setState({
				selectedSortBy: [sortBy],
				selectedYears: years,
			}, () => this.fetchData());
		}
	}

	changeHash(frontKey, value, frontKey2, value2) {
		let hashObj = {"&sort_by=": this.state.selectedSortBy[0],
			"&primary_release_date.gte=": this.state.selectedYears[0],
			"&primary_release_date.lte=": this.state.selectedYears[1],
			"&primary_release_year=": this.state.selectedYears[0],
			"&with_genres=": this.state.selectedGenres[0] || ""
		};

		for (let key in hashObj) {
			if (frontKey2 !== undefined) {
				if (frontKey2 === key && hashObj[key] !== value2) {
					hashObj[key] = value2;
				}
				if (key === "&primary_release_date.gte=") {
					hashObj[key] = value;
				}
				if (key === "&primary_release_year=") {
					hashObj[key] = "";
				}
			} else {
				if (frontKey === key && hashObj[key] !== value) {
					hashObj[key] = value;
				}
				if (key === "&primary_release_date.lte=" || key === "&primary_release_date.gte=") {
					hashObj[key] = "";
				}
			}
		}

		let newHashObj = [];

		for (let key in hashObj) {
			newHashObj.push(key + hashObj[key])
		}

		const hash = newHashObj.join("");

		this.setFiltersHash(hash);
	}

	fetchData() {
		//let country = "&certification_country=" + this.state.selectedCountry[0];
		let page = "&page=" + this.state.currentPage;
		let results = this.state.resultsMovies;

		let genresStr = "";
		if (this.state.selectedGenres.length > 0) {
			genresStr = "&with_genres="
				+ this.state.selectedGenres.join(",");
		}

		let sortBy = "&sort_by=" + this.state.selectedSortBy[0];

		let filterYears = this.getFilterYear();

		fetch("https://api.themoviedb.org/3/discover/movie?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d"
			+"&language=en-US" + sortBy + genresStr + filterYears + page +"&include_adult=false&include_video=false&page=1"
		)
			.then(res => res.json())
			.then(res => {
				this.state.pageChanged
					? results = results.concat(res.results)
					: results = res.results;
				this.setState({
					resultsMovies: results,
					totalPages: res.total_pages,
					pageChanged: false,
					isLoading: false,
					response: res
				})
			})
	}

	getFilterYear() {
		console.log(this.state.selectedYears)
		if (Array.isArray(this.state.selectedYears[0])) {
			console.log(777)
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
				selectedGenres: selected,
				//isLoading: true,
			}, () => {
				this.fetchData()
			})
		} else {
			this.setState({
				selectedGenres: this.state.selectedGenres.concat(id),
				//isLoading: true,
			}, () => {
				this.fetchData()
			});
		}
	}

	handleSortChanged(id) {
		this.changeHash("&sort_by=", id);
	}

	handleYearsChanged(id) {
		if (id.length > 1) {
			this.changeHash("&primary_release_date.gte=", id[0],"&primary_release_date.lte=", id[1])
		} else {
			this.setState({
				selectedYears: [id]
			}, () => this.changeHash("&primary_release_year=", id))
		}
	}

	handleLoadMore() {
		this.setState({
			currentPage: this.state.currentPage + 1,
			pageChanged: true,
		}, () => {
			this.fetchData()})
	}

	render() {
		if (this.state.isLoading) {
			return <div className={"movies-page-loader"}>
				<Loader/>
			</div>
		}

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
				{this.state.totalPages > this.state.currentPage
					? <button className={"btn-more-movies"} onClick={() => this.handleLoadMore()}>
						<i className="fas fa-sync-alt"/>
						<span children={"Load more"}/>
					</button>
					: null}
				{this.state.totalPages < this.state.currentPage
					? <div>Sorry, there are no results for your request</div>
					: null
				}
			</div>
		</div>
	}
}