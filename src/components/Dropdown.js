import React from "react";
import MovieItem from "./MovieItem";
import {getGenreNameById} from "../genresMovie"

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownIsOpen: false,
    };

    this.dropdownItemRef = React.createRef();
  }

  handlerItemClick(e, id) {
    this.props.handlerClick(id);
  }

  handlerClickDropdown() {
    this.setState({
      dropdownIsOpen: !this.state.dropdownIsOpen
    })
  }

  handlerClickBody(e) {
    if (e.target.closest(".dropdown-view") !== this.dropdownItemRef.current) {
      this.setState({
        dropdownIsOpen: false
      });
    }
  }

  componentDidMount() {
    document.body.addEventListener("click", this.handlerClickBody.bind(this))
  }

  getItemClassNames(item) {
    const index = this.props.selected.findIndex(el => el === item);
    if (index >= 0) {
      return "item-dropdown selected"
    } else {
      return "item-dropdown"
    }
  }

  getItemCount() {
    if (this.props.selected.length < 1) {
      return this.props.dropdownName;
    } else if (this.props.selected.length === 1) {
      return getGenreNameById(this.props.selected[0]);
    } else {
      return "Selected(" + this.props.selected.length + ")";
    }
  }

  render() {
    return <div className={this.state.dropdownIsOpen ? "dropdown-view open" : "dropdown-view"}
                ref={this.dropdownItemRef}>
      <div className={"item-name"} onClick={() => this.handlerClickDropdown()}>
        <span className={"name-text"}>{this.getItemCount()}</span>
        <i className="fas fa-chevron-right" />
      </div>
      <div className={this.state.dropdownIsOpen ? "dropdown open" : "dropdown"}>
        {this.props.list.map(item => {
          return <div className={this.getItemClassNames(item.id)}
                      onClick={(e) => this.handlerItemClick(e, item.id)}
                      key={item.id}>
              {this.props.multiple ? <span className={"square"}>
                <i className="fas fa-check"/>
              </span> : null}
            <span className={"name"}>{item.name}</span>
          </div>
        })}
      </div>
    </div>
  }
}