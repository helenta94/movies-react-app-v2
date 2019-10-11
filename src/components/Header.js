import React from 'react';
import {NavLink} from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

export default class Header extends React.Component {

	render() {
		return <header className={"my-header"}>
			<div className={"container"}>
				<div className={"right-block"}>
					<Link to={"/"} className={"logo"}>
						<i className="fas fa-film" />
						<span>MOVIES APP</span>
					</Link>
					<div className={"choice-category"}>
						<Link to={"/movies"} className={"item active"}>Movies</Link>
						<Link to={"/tv"} className={"item"}>TV series</Link>
						<Link to={"/cartoons"} className={"item"}>Cartoons</Link>
					</div>
					<div className={"search"}>
						<i className="fas fa-search" />
						<input className={"field-search"} placeholder={"Search"}/>
					</div>
				</div>
				<div className={"left-block"}>
					<div className={"user"}>
						<span className={"user-name"}>John Meyer</span>
						<div className={"user-photo"}>
							<i className="far fa-user" />
						</div>
					</div>
				</div>
			</div>
		</header>
	}
}