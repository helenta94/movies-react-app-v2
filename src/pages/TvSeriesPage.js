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
      selectedSortBy: ["popularity.desc"],
      resultsMovies: [],
      selectedYears: [-1],
      selectedCountry: [],
      currentPage: 1,
      pageChanged: false,
      isLoading: true,
      totalPages: 1,
      response: [],
    };

  }

  componentDidMount() {
    this.configFilters();
  }

  configFilters() {
    const result = {};
    const hashObject = {};
    let hashString = window.location.hash;
    if (hashString.length > 0 && hashString[0] === "#") {
      hashString = hashString.substr(1);
    }

    hashString.split("&").forEach((item) => {
      const kv = item.split("=", 2);
      if (kv.length === 2) {
        hashObject[kv[0]] = kv[1];
      }
    });

    if (hashObject.sortby) {
      result.selectedSortBy = [hashObject.sortby];
    }

    if (hashObject.genres) {
      result.selectedGenres = hashObject.genres.split(",").map(id => parseInt(id));
    }

    if (hashObject.year) {
      const data = hashObject.year.split(",").map(item => parseInt(item));
      if (data.length === 2) {
        result.selectedYears = [data.join(",")];
      } else {
        result.selectedYears = [data[0]];
      }
    }

    console.log(hashObject, result);

    this.setState(result, () => {
      this.fetchData();
    });
  }

  updateHash() {
    const hashdata = {};

    if (this.state.selectedSortBy.length) {
      hashdata.sortby = this.state.selectedSortBy[0];
    }

    if (this.state.selectedGenres.length) {
      hashdata.genres = this.state.selectedGenres.join(",");
    }

    if (this.state.selectedYears.length) {
      hashdata.year = this.state.selectedYears[0];
    }

    const hashParts = [];
    for (let key in hashdata) {
      hashParts.push(key + "=" + hashdata[key]);
    }

    window.location.hash = hashParts.join("&");
  }


  fetchData() {
    let genresStr = "";
    if (this.state.selectedGenres.length > 0) {
      genresStr = "&with_genres="
        + this.state.selectedGenres.join(",");
    }

    let sortByStr = "&sort_by=" + this.state.selectedSortBy[0];
    let pageCount = "&page=" + this.state.currentPage;

    //let country = "&certification_country=" + this.state.selectedCountry[0];
    let results = this.state.resultsMovies;

    fetch("https://api.themoviedb.org/3/discover/tv?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d"
      +"&language=en-US" + sortByStr + this.getFilterYear() +"&include_adult=false&include_video=false&page=1"
      + genresStr + pageCount)
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
      .then(res => console.log(this.state.response));

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
        currentPage: 1,
        selectedGenres: selected,
        //isLoading: true,
      }, () => {
        this.updateHash();
        this.fetchData();
      })
    } else {
      this.setState({
        currentPage: 1,
        selectedGenres: this.state.selectedGenres.concat(id),
        //isLoading: true,
      }, () => {
        this.updateHash();
        this.fetchData();
      })
    }
  }

  handleSortChanged(id) {
    this.setState({
      currentPage: 1,
      selectedSortBy: [id],
      isLoading: true,
    }, () => {
      this.updateHash();
      this.fetchData();
    })
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
          <FilterSortBy changeHandler={this.handleSortChanged.bind(this)}
                        selected={this.state.selectedSortBy}/>
        </div>
        {/*<h1 className={"headline"}>Movies according to your request</h1>*/}
        <div className={"results"}>
          {this.state.resultsMovies.map(item => {
            return <div className={"result"}>
              <MovieItem item={item} key={item.id} type={"tv"}/>
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