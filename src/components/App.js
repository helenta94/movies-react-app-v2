import React from 'react';
import Header from "./Header";
import MoviesPage from "../pages/MoviesPage";
import MoviePage from "../pages/MoviePage";
import HomePage from "../pages/HomePage";
import TvShowPage from "../pages/TvShowPage";
import {BrowserRouter as Router, Route} from "react-router-dom";

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <Router>
      <div className={"my-app"}>
        <Header />
        <Route path={"/"} exact component={HomePage}/>
        <Route path={"/movies"} exact component={MoviesPage}/>
        <Route path={"/movies/:id"} exact component={MoviePage} />
        <Route path={"/tv-shows/:id"} exact component={TvShowPage} />
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
