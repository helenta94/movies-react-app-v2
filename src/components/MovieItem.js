import React from "react";
import {getGenreNameById} from "../genresMovie";
import {Link} from "react-router-dom";

export default class MovieItem extends React.Component {

  renderGenres(genreIds) {
    return genreIds.map(getGenreNameById).join(", ")
  }

  render() {
    return <div className={"movie-item"}>
      <div className={"poster"}>
        {this.props.item.poster_path !== null
          ? <img alt={"movie-image"} src={"https://image.tmdb.org/t/p/w200" + this.props.item.poster_path}/>
          : <div className={"no-poster"}>
              <i className="far fa-frown" />
              <span className={"text"}>Sorry, no poster</span>
            </div>}
        {this.props.isShowType
          ? <div className={this.props.type === "tv" ? "type-show" : "type-show purple"}>
            {this.props.type === "tv" ? "tv show" : "movie"}
          </div>
          : null}
      </div>
      <div className={"info"}>
        <span className={"name"}>{this.props.item.title || this.props.item.name}</span>
        <div className={"genres"}>{this.renderGenres(this.props.item.genre_ids)}</div>
      </div>
      {this.props.type === "movie"
        ? <Link to={"/movies/" + this.props.item.id} />
        : <Link to={"/tv-series/" + this.props.item.id} />}
    </div>
  }
}