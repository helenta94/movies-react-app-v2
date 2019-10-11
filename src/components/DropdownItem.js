import React from "react";
import Sorting from "../components/Sorting";

export default class DropdownItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownIsOpen: false,
            moviesGenres: [],

        };

        this.dropdownItemRef = React.createRef();
        this.getGenre()
    }

    getGenre() {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=b4d514a9c5639b1b1d3f0ab2bf94f96d&language=en-US")
            .then(response => response.json())
            .then(response => this.setState({
                moviesGenres: response,
            }));
    }

    listGenre() {
        if (this.state.moviesGenres.genres !== undefined) {
            return this.state.moviesGenres.genres.map(item => {
                return <div className={"item-dropdown"} key={item.id}>
                    <label className={"label-checkbox"}>
                        <input type={"checkbox"} className={"field-checkbox"}/>
                        <span className={"custom-checkbox"}>
									<i className="fas fa-check"/>
								</span>
                        <span className={"text"}>{item.name}</span>
                    </label>
                </div>
            })
        }
    }

    handlerItemClick() {
        this.setState({
            dropdownIsOpen: !this.state.dropdownIsOpen
        })
    }

    handlerClickBody(e) {
        // console.log(this.dropdownItemRef.current);
        if (e.target.closest(".dropdown-view") !== this.dropdownItemRef.current) {
            this.setState({
                dropdownIsOpen: false
            });
        }
    }

    componentDidMount() {
        document.body.addEventListener("click", this.handlerClickBody.bind(this))
    }

    render() {
        return <div className={this.state.dropdownIsOpen ? "dropdown-view genre open" : "dropdown-view genre"} ref={this.dropdownItemRef}>
            <div className={"item-name"} onClick={() => this.handlerItemClick()}>
                <span className={"name-text"}>{this.props.type}</span>
                <i className="fas fa-chevron-right" />
            </div>
            <div className={this.state.dropdownIsOpen ? "dropdown open" : "dropdown"}>
                {this.props.type === "genres" ? this.listGenre() : null}
            </div>
        </div>
    }
}