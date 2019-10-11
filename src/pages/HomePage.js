import React from "react";
import Slider from "react-slick";
import MoviesSlider from "../components/MoviesSlider";
import {NavLink} from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upcomingMovies: [],
      popularMovies: [],
      popularTv: [],

    };

    this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.slickRef = React.createRef();
    this.apiKey = "api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d";

    this.getUpcomingMovies();
    this.getPopularMovies();
    this.getPopularTv();
  }

  getPopularMovies() {
    fetch("https://api.themoviedb.org/3/movie/popular?"+this.apiKey+"&language=en-US&page=1")
      .then(response => response.json())
      .then(response => this.setState({
        popularMovies: response.results
      }))
      .then(response => console.log(this.state.popularMovies))
  }

  getUpcomingMovies() {
    fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&page=1")
      .then(response => response.json())
      .then(response => response.results.sort((a, b) => {
        if (a > b) return 1;
        if (a == b) return 0;
        if (a < b) return -1;
      }))
      .then(response => this.setState({
        upcomingMovies: response,
      }))
      .then(response => console.log(this.state.upcomingMovies))
  }

  getPopularTv() {
    fetch("https://api.themoviedb.org/3/tv/popular?"+this.apiKey+"&language=en-US&page=1")
      .then(response => response.json())
      .then(response => this.setState({
        popularTv: response.results
      }))
      .then(response => console.log(this.state.popularTv))
  }

  formatReleaseDate(date) {
    return this.months[new Date(date).getMonth()]+" "+new Date(date).getDay();
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 4000,
      arrows: false,
      centerMode: true,
      centerPadding: "14%",
      responsive: [{
        breakpoint: 600,
        settings: {
          centerPadding: "5%",
        }
      }]
    };

    return <div className={"page home-page"}>
      <div className={""}>
        <section className={"upcoming-movies-slider"}>
          <Slider {...settings} ref={this.slickRef}>
            {this.state.upcomingMovies.map(item => {
            return <div className="item" key={item.id}>
              <div className="inner" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${item.backdrop_path})`}} />
              <div className="shadow" />
              <div className={"item-info"}>
                <div className={"info-body"}>
                  <div className={"poster"}>
                    <img className={"poster-img"} alt={"poster"} src={"https://image.tmdb.org/t/p/w200" + item.poster_path}/>
                  </div>
                  <div className={"text"}>
                    <div className={"title"}>{item.title}</div>
                    <div className={"release-date"}>{this.formatReleaseDate(item.release_date)}</div>
                    <Link to={"/movies/"+item.id} className={"btn-learn-more"} children={"learn more"} />
                  </div>
                </div>
              </div>
            </div>
          })}
          </Slider>
            <div className={"btns"}>
                <button className={"btn btn-prev"} onClick={() => this.slickRef.current.slickPrev()}>
                  <i className="fas fa-chevron-left"/>
                </button>
                <button className={"btn btn-next"} onClick={() => this.slickRef.current.slickNext()}>
                  <i className="fas fa-chevron-right"/>
                </button>
            </div>
        </section>
        <section className={"movies-slider"}>
          <div className={"container"}>
            <MoviesSlider moviesList={this.state.popularMovies} name={"Popular movies:"}/>
          </div>
        </section>
        <section className={"movies-slider"}>
          <div className={"container"}>
            <MoviesSlider moviesList={this.state.popularTv} name={"Popular TV:"}/>
          </div>
        </section>
      </div>
    </div>
  }
}

