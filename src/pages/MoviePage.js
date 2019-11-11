import React from "react";
import MoviesSlider from "../components/MoviesSlider";
import Loader from "../components/Loader";
import {NavLink} from "react-router-dom";
import {fetchMovieData} from "../tmdb";
import NotFoundPage from "./NotFoundPage";

export default class MoviePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movieNotFound: false,
      isLoading: true,
      movieInfo: null,
      expandedCast: false,
      cast: [],
      crew: [],
      recommendationMovies: [],
      similarMovies: [],
    };

    this.id = props.match.params.id;
    this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.id != this.props.match.params.id) {
      this.id = this.props.match.params.id;
      this.setState({
        isLoading: true,
        expandedCast: false,
      }, () => {
        this.fetchData();
      });
    }
  }

  fetchData() {
    fetchMovieData(this.props.match.params.id)
      .then((res) => {
        if (res.status === 404) {
          const e = Error("Movie not found");
          e.response = res;
          throw e;
        } else {
          return res.json();
        }
      })
      .then((res) => {
        Promise.all([
          fetchMovieData(this.props.match.params.id, "credits"),
          fetchMovieData(this.props.match.params.id, "recommendations"),
          fetchMovieData(this.props.match.params.id, "similar"),
        ]).then(response => Promise.all(response.map(res => res.json())))
          .then(response => {
            this.setState({
              movieInfo: res,
              cast: response[0].cast,
              crew: response[0].crew,
              recommendationMovies: response[1].results.slice(0, 18),
              similarMovies: response[2].results.slice(0, 18),
              isLoading: false
            });
          });
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          movieNotFound: true
        });
      });
  }

  formatReleaseDate(date) {
    return this.months[new Date(date).getMonth()]+" "+new Date(date).getDate() + ", " +new Date(date).getFullYear();
  }

  runtimeToHumanTime(mints) {
    const hours = Math.floor(mints / 60);
    const minutes = mints % 60;

    return hours + "h " + minutes + "min";
  }

  renderCast() {
    let castList = [];

    if (!this.state.expandedCast) {
      castList = this.state.cast.filter((item, index) => index < 10 ).map(item => item.name)
    } else {
      castList = this.state.cast.map(item => item.name)
    }

    if (!this.state.expandedCast) {
      return this.state.cast.length > 10
        ? <span>
            {castList.join(", ")}
            <span className={"more-actors"} onClick={() => {
              this.setState({expandedCast: true})
            }}>more...</span>
          </span>
        : <span>
            {castList.join(", ")}
          </span>
    } else {
      return <span>
        {castList.join(", ")}
      </span>
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div className="movie-page-loader">
        <Loader size="64px" />
      </div>;
    }

    if (this.state.movieNotFound) {
      return <NotFoundPage />;
    }

    const settings = {
      dots: false,
      infinite: true,
      touchMove: false,
      swipe: false,
      speed: 1000,
      slidesToShow: 13,
      slidesToScroll: 13,
      autoplay: false,
      autoplaySpeed: 3000,
      arrows: false,
      centerMode: true,
    };

    return <div className={"page movie-page"}>
      <div className={"movie-page-background"} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${this.state.movieInfo.backdrop_path})`}} >
        <div className={"shadow"}/>
      </div>
      <div className={"container"}>
        <div className={"movie-info"}>
          <div className={"col col-one"}>
            <img className={"poster"} src={"https://image.tmdb.org/t/p/w200"+this.state.movieInfo.poster_path} alt={"movie poster"}/>
          </div>
          <div className={"col col-two"}>
            <div className={"headline"}>
              {this.state.movieInfo.title}
              <span className={"type movie"}>Movie</span>
            </div>
            <div className={"genres"}>
              {this.state.movieInfo.genres.map(item => {
                return <NavLink key={item.id}
                                to={"/movies#genres=" + item.id}
                                className={"genres-item"}
                                children={item.name} />
              })}
            </div>
            {/*<span className={"name"}>Description:</span>*/}
            <p className={"text"}>{this.state.movieInfo.overview}</p>
            <div className={"info"}>
              <div className={"info-item"}>
                <span className={"name"}>Status:</span>
                <span className={"value"}>{this.state.movieInfo.status}</span>
              </div>
              <div className={"info-item"}>
                <span className={"name"}>Release date:</span>
                <span className={"value"}>{this.formatReleaseDate(this.state.movieInfo.release_date)}</span>
              </div>
              <div className={"info-item"}>
                <span className={"name"}>Countries:</span>
                <span className={"value"}>{this.state.movieInfo.production_countries.map(item => item.name).join(", ")}</span>
              </div>
              <div className={"info-item"}>
                <span className={"name"}>Duration:</span>
                <span className={"value"}>{this.runtimeToHumanTime(this.state.movieInfo.runtime)}</span>
              </div>
              <div className={"info-item "}>
                <span className={"name"}>Actors:</span>
                <span className={"value"}>{this.renderCast()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {this.state.similarMovies.length > 0
        ? <section className={"movies-slider"}>
          <div className={"container"}>
              <MoviesSlider moviesList={this.state.similarMovies}
                            name={"Similar movies"}
                            isShow={false}
                            type={"movie"}/>
            </div>
          </section>
        : null}
      {this.state.recommendationMovies.length > 0
        ? <section className={"movies-slider"}>
            <div className={"container"}>
              <MoviesSlider moviesList={this.state.recommendationMovies}
                            name={"Recommendation movies"}
                            isShow={false}
                            type={"movie"}/>
            </div>
          </section>
        : null
      }
    </div>
  }
}