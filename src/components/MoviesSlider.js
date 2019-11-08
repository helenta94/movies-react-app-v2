import React from "react";
import Slider from "react-slick";
import MovieItem from "./MovieItem";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class MoviesSlider extends React.Component {

  constructor(props) {
    super(props);

    this.slickRef = React.createRef();
  }

  handlerClickSliderPrev() {
    this.slickRef.current.slickPrev();
  }

  handlerClickSliderNext() {
    this.slickRef.current.slickNext();
  }

  goToPage() {
    if (this.props.type === "movie") {
      return this.props.genres
        ? "/movies#genres=" + this.props.genres
        : "/movies"
    } else {
      return this.props.genres
        ? "/tv-series#genres=" + this.props.genres
        : "/tv-series"
    }
  }

  render() {
    const settings = this.props.set || {
      dots: false,
      arrows: false,
      infinite: false,
      speed: 1000,
      slidesToShow: 6,
      slidesToScroll: 6
    };

    return <div className={"movies-list movies-slider"}>
      <div className={"movies-list-header"}>
        <div className={"headline"}>{this.props.name}</div>
        <div className={"bts"}>
          <button className={"btn btn-prev"} onClick={() => this.handlerClickSliderPrev()}>
            <i className="fas fa-chevron-left"/>
          </button>
          <button className={"btn btn-next"} onClick={() => this.handlerClickSliderNext()}>
            <i className="fas fa-chevron-right"/>
          </button>
        </div>
      </div>
      <div className={"list"}>
        <Slider {...settings} ref={this.slickRef} >
          {this.props.moviesList.map(item => {
            return <MovieItem item={item} key={item.id} type={this.props.type} />
          })}
          {this.props.isShow ? <div className={"item-all-movies"}>
            <span className={"name"} children={"show all"}/>
            <i className="fas fa-long-arrow-alt-right"/>
            <Link to={this.goToPage()} className={"all-movies"}/>
          </div> : null}
        </Slider>
      </div>
    </div>
  }
}