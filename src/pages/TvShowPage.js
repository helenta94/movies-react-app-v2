import React from "react";

export default class TvShowPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tvInfo: null,

    };

    this.fetchData();
  }

  fetchData() {
    Promise.all([
      fetch("https://api.themoviedb.org/3/tv/"+ this.props.match.params.id +"?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US")
    ]).then(response => Promise.all(response.map(res => res.json())))
      .then(response => this.setState({
        tvInfo: response
      }))
  }

  render() {
    return <div className={"page movie-page tv-show-page"}>
      {/*<div className={"movie-page-background"} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${this.state.movieInfo.backdrop_path})`}} >*/}
      {/*  <div className={"shadow"}/>*/}
      {/*</div>*/}
      <div className={"container"}>

      </div>
    </div>
  }
}