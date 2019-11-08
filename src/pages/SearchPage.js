import React from "react";
import MovieItem from "../components/MovieItem";

export default class SearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: (this.props.location && this.props.location.state && this.props.location.state.searchValue) || "",
      moviesList: [],
      currentPage: 1,
      totalPages: null
    };

  }

  componentDidMount() {
    this.fetchData()
  }

  getMoviesList(response) {
    let moviesList = this.state.moviesList;

    if (response.results) {
      response.results.map(item => {
        if (item.media_type !== "person") {
          moviesList.push(item)
        }
      });
    }

    this.setState({
      moviesList: moviesList,
      totalPages: response.total_pages,

    })
  }

  handleLoadMore() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    }, () => this.fetchData())
  }

  fetchData() {
    console.log(this.state.searchValue)
    fetch("https://api.themoviedb.org/3/search/multi?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&query="
      + this.state.searchValue +"&include_adult=false&page="+this.state.currentPage)
      .then(response => response.json())
      .then(response => this.getMoviesList(response))
  }

  handleSearchFieldChange(e) {
    this.setState({
      moviesList: [],
      searchValue: e.target.value,
    }, () => this.fetchData())
  }

  render() {
    return <div className={"page search-page"}>
      <div className={"container"}>
        <h1 className={"headline"}>Searching results
          {this.state.searchValue.length > 0
            ? <span>{' "' + this.state.searchValue + '"'}</span>
            : null
          }
        </h1>
        <div className={"search"}>
          <input className={"search-field"}
                 value={this.state.searchValue}
                 onChange={this.handleSearchFieldChange.bind(this)}
                 placeholder={"Search"} />
        </div>
        <div className={"results"}>
          {this.state.moviesList.map(item => {
            return <div className={"result"} key={item.media_type + item.id}>
              <MovieItem item={item}
                         type={item.media_type}
                         isShowType={true}/>
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