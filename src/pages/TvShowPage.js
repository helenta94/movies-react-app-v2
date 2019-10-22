import React from "react";
import Loader from "../components/Loader";
import MoviesSlider from "../components/MoviesSlider";

export default class TvShowPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tvInfo: null,
      isLoading: true,
      expandedCredits: false,
      seasons: [],
      similarTv: [],
      recommendationsTv: [],

    };

    this.months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData();

    }
  }

  fetchData() {
    this.setState({
      isLoading: true,
      seasons: [],
    });
    Promise.all([
      fetch("https://api.themoviedb.org/3/tv/"+ this.props.match.params.id +"?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&append_to_response=credits&language=en-US"),
      fetch("https://api.themoviedb.org/3/tv/"+ this.props.match.params.id +"/similar?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&page=1"),
      fetch("https://api.themoviedb.org/3/tv/"+ this.props.match.params.id +"/recommendations?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US&page=1"),
    ]).then(response => Promise.all(response.map(res => res.json())))
      .then(response => this.setState({
        tvInfo: response[0],
        similarTv: response[1].results,
        recommendationsTv: response[2].results,
        isLoading: false
      }))
      .then(() => console.log(this.state.similarTv))
      .then(() => this.fetchSeason(1))
  }

  fetchSeason(seasonNumber){
    fetch("https://api.themoviedb.org/3/tv/"+ this.props.match.params.id
      +"/season/"+seasonNumber+"?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US")
      .then(response => response.json())
      .then(response => this.setState({
        seasons: this.state.seasons.concat(response),
      }))
      .then(response => {
        if (seasonNumber < this.state.tvInfo.number_of_seasons) {
          this.fetchSeason(++seasonNumber);
        }
      })

    //console.log(this.state.tvInfo.seasons[0].season_number)
  }

  formatReleaseDate(date) {
    return this.months[new Date(date).getMonth()]+" "+new Date(date).getDate()+", "+new Date(date).getFullYear();
  }

  runtimeToHumanTime(mints) {
    const hours = Math.floor(mints / 60);
    const minutes = mints % 60;

    return hours + "h " + minutes + "min";
  }

  renderCast(cast) {
    const actors = [];
    cast.map(item => actors.push(item.name));

    if (this.state.expandedCredits) {
      return allActors()
    }

    if (cast.length > 10) {
      return <span>
        <span>{actors.filter((item,index) => index < 10 ).join(", ")}</span>
        <span className={"more-actors"} onClick={() => this.setState({
          expandedCredits: true
        })}>more...</span>
      </span>
    } else {
      return allActors()
    }

    function allActors() {
      return <span>{actors.map(item => item).join(", ")}</span>
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div className={"movie-page-loader"}>
        <Loader/>
      </div>
    }

    return <div className={"page movie-page tv-show-page"}>
      <div className={"movie-page-background"} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1280${this.state.tvInfo.backdrop_path})`}} >
        <div className={"shadow"}/>
      </div>
      <div className={"container"}>
        <div className={"movie-info"}>
          <div className={"col col-one"}>
            <img className={"poster"} src={"https://image.tmdb.org/t/p/w200"+this.state.tvInfo.poster_path} alt={"movie poster"}/>
          </div>
          <div className={"col col-two"}>
            <div className={"headline"}>{this.state.tvInfo.name}
              <span className={"type tv"}>TV Show</span>
            </div>
            <div className={"genres"}>
              {this.state.tvInfo.genres.map(item => {
                return <a href={"#"} className={"genres-item"} key={item.id} children={item.name} />
              })}
            </div>
            {/*<span className={"name"}>Description:</span>*/}
            <p className={"text"}>{this.state.tvInfo.overview}</p>
            <div className={"info"}>
              <div className={"col"}>
                <div className={"info-item"}>
                  <span className={"name"}>Status</span>
                  <span className={"value"}>{this.state.tvInfo.status}</span>
                </div>
                <div className={"info-item"}>
                  <span className={"name"}>Countries</span>
                  <span className={"value"}>{this.state.tvInfo.origin_country.map(item => item).join(", ")}</span>
                </div>
                <div className={"info-item"}>
                  <span className={"name"}>Total seasons</span>
                  <span className={"value"}>{this.state.tvInfo.number_of_seasons}</span>
                </div>
                <div className={"info-item"}>
                  <span className={"name"}>Networks</span>
                  <span className={"value"}>{this.state.tvInfo.networks.map(item => item.name).join(", ")}</span>
                </div>
              </div>
              <div className={"col"}>
                <div className={"info-item"}>
                  <span className={"name"}>First air date</span>
                  <span className={"value"}>{this.formatReleaseDate(this.state.tvInfo.first_air_date)}</span>
                </div>
                <div className={"info-item"}>
                  <span className={"name"}>Last air date</span>
                  <span className={"value"}>{this.formatReleaseDate(this.state.tvInfo.last_air_date)}</span>
                </div>
                {this.state.tvInfo.next_episode_to_air === null
                ? null
                : <div className={"info-item"}>
                    <span className={"name"}>Next episode to air</span>
                    <span className={"value"}>{this.formatReleaseDate(this.state.tvInfo.next_episode_to_air.air_date)}</span>
                  </div>}
                <div className={"info-item"}>
                  <span className={"name"}>Episode duration</span>
                  <span className={"value"}>{this.state.tvInfo.episode_run_time.map(item => this.runtimeToHumanTime(item)).join(", ")}</span>
                </div>
              </div>
              <div className={"info-item"}>
                <span className={"name"}>Created by</span>
                <span className={"value"}>{this.state.tvInfo.created_by.map(item => item.name).join(", ")}</span>
              </div>
              <div className={"info-item "}>
                <span className={"name"}>Actors</span>
                <span className={"value"}>{this.renderCast(this.state.tvInfo.credits.cast)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={"seasons"}>
          {/*{console.log(this.state.tvInfo.seasons)}*/}
          {this.state.seasons.map((item, index) => {
            //console.log(item);
            {if (item.season_number > 0) {
              return <div className={"season"} key={item.id}>
                <div className={"season-name"}>
                  <span className={"name"}>{item.name}</span>
                  <div className={"poster"}>
                    <img src={"https://image.tmdb.org/t/p/w200" + item.poster_path} />
                  </div>
                </div>
                <div className={"episodes"}>
                  <table className={"episode"}>
                    <tbody>
                      {this.state.seasons[index].episodes.map(item => {
                        return <tr key={item.id}>
                            <td>{item.season_number + "x" + item.episode_number}</td>
                            <td>{" " + item.name}</td>
                            <td>{" " + this.formatReleaseDate(item.air_date)}</td>
                          </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            }}
          })}
        </div>
        <MoviesSlider moviesList={this.state.similarTv}
                      name={"Similar TV"}
                      isShow={false}
                      type={"tv"}/>
        <MoviesSlider moviesList={this.state.recommendationsTv}
                      name={"Recomendations TV"}
                      isShow={false}
                      type={"tv"}/>
      </div>
    </div>
  }
}