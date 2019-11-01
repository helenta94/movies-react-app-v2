import React from "react";

export default class PersonPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      actorsData: [],

    };

    this.fetchData();
  }

  fetchData() {
    console.log(this.props.match.params.id);
    Promise.all([
      fetch("https://api.themoviedb.org/3/person/"+this.props.match.params.id+"?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US"),
      fetch("https://api.themoviedb.org/3/discover/movie?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_cast="+this.props.match.params.id)
    ]).then(response => Promise.all(response.map(res => res.json())))
      .then(response => console.log(response[1]))
  }

  render() {
    return <div>

    </div>
  }
}