import React from "react";
import Slider from "react-slick";
import MovieItem from "./MovieItem";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class MoviesSlider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 1,
    };

    this.slickRef = React.createRef();
  }

  componentDidMount() {
    const countSlides = this.slickRef.current.props.slidesToShow;
    const countItems = this.slickRef.current.props.children[0].length;
    this.maxCountSlides = Math.ceil(countItems / countSlides);
  }

  handlerClickSliderPrev() {
    this.slickRef.current.slickPrev();
    if (this.state.currentSlide > 1) {
      this.setState({
        currentSlide: this.state.currentSlide - 1
      }, () => {
        console.log(this.state.currentSlide);
      })
    }
  }

  handlerClickSliderNext() {
    if (this.state.currentSlide < this.maxCountSlides ) {
      this.setState({
        currentSlide: this.state.currentSlide + 1
      }, () => {
        this.slickRef.current.slickNext();
        this.getClassNameBtnNext();
      })
    } else {
      this.slickRef.current.slickNext();
    }
  }

  getClassNameBtnNext() {
    if (this.state.currentSlide === this.maxCountSlides) {
      return "btn btn-next not-slides"
    } else {
      return "btn btn-next"
    }
  }

  getClassNameBtnPrev() {
    if (this.state.currentSlide === 1) {
      return "btn btn-next not-slides"
    } else {
      return "btn btn-prev"
    }
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
      slidesToScroll: 6,
      variableWidth: true,
    };

    return <div className={"movies-list"}>
      <div className={"movies-list-header"}>
        <div className={"headline"}>{this.props.name}</div>
        <div className={"bts"}>
          <button className={this.getClassNameBtnPrev()} onClick={() => this.handlerClickSliderPrev()}>
            <i className="fas fa-chevron-left"/>
          </button>
          <button className={this.getClassNameBtnNext()} onClick={() => this.handlerClickSliderNext()}>
            <i className="fas fa-chevron-right"/>
          </button>
        </div>
      </div>
      <div className={"list"}>
        <Slider {...settings} ref={this.slickRef}>
          {this.props.moviesList.map((item) => {
            return <div style={{width: 233}}
                        key={item.id}
                        children={<MovieItem item={item} type={this.props.type} />} />
          })}
          {this.props.isShow ? <div style={{width: 233}} key={"allmovies"}>
              <div className={"item-all-movies"} >
                <span className={"name"} children={"show all"}/>
                <i className="fas fa-long-arrow-alt-right"/>
                <Link to={this.goToPage()} className={"all-movies"}/>
              </div>
            </div>
             : null}
        </Slider>
      </div>
    </div>
  }
}