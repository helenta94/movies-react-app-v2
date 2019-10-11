import React from "react";
import {genres, getGenreNameById} from "../genresMovie";
import {Link} from "react-router-dom";

export default class MovieItem extends React.Component {

  renderGenres(genreIds) {
    return genreIds.map(getGenreNameById).join(", ");
  }

  render() {
    return <div className={"movie-item"}>
      <div className={"poster"}>
        <img className={"movie-poster"} alt={"movie-image"} src={"https://image.tmdb.org/t/p/w200" + this.props.item.poster_path}/>
      </div>
      <div className={"info"}>
        <span className={"name"}>{this.props.item.title}</span>
        <div className={"genres"}>{this.renderGenres(this.props.item.genre_ids)}</div>
      </div>
      <Link to={"/movies/" + this.props.item.id} />
    </div>
  }
}