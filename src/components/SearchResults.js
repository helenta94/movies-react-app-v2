import React from "react";

export default class SearchResults extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    };

    this.fetchData();
  }

  fetchData() {

    fetch("https://api.themoviedb.org/3/search/multi?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&query="
      + this.props.requestStr +"&page=1&include_adult=false")
      .then(res => res.json())
      .then(res => console.log(res))
  }



  render() {
    return <div className={"search-results"}>
      {/*{this.props.requestStr}*/}
    </div>
  }
}