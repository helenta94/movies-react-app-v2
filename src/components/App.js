import React from 'react';
import Header from "./Header";
import MoviesPage from "../pages/MoviesPage";
import MoviePage from "../pages/MoviePage";
import HomePage from "../pages/HomePage";
import TvShowPage from "../pages/TvShowPage";
import TvSeriesPage from "../pages/TvSeriesPage";
import PersonPage from "../pages/PersonPage";
import {BrowserRouter as Router, Route} from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import NotFoundPage from "../pages/NotFoundPage";
import {Switch} from "react-router";

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <Router>
      <div className={"my-app"}>
        <Header />
        <Switch>
          <Route path={"/"} exact component={HomePage}/>
          <Route path={"/movies"} exact component={MoviesPage}/>
          <Route path={"/movies/:id"} exact component={MoviePage} />
          <Route path={"/tv-series"} exact component={TvSeriesPage} />
          <Route path={"/tv-series/:id"} exact component={TvShowPage} />
          <Route path={"/person/:id"} exact component={PersonPage} />
          <Route path={"/search"} exact component={SearchPage} />
          <Route path={"*"} component={NotFoundPage} />
        </Switch>
        <footer className={"footer"}>
          <div className={"container"}>
            <span className={"text"}>Data provided by </span>
            <a href={"https://www.themoviedb.org"}>TMDB</a>
          </div>
        </footer>
      </div>
    </Router>
  }
}
