import React from "react";
import FilterGenres from "./FilterGenres";

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownIsOpen: false,
    };

    console.log(this.props);

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

  render() {
    return <div className={this.state.dropdownIsOpen ? "dropdown-view open" : "dropdown-view"}
                ref={this.dropdownItemRef}>
      <div className={"item-name"} onClick={() => this.handlerClickDropdown()}>
        <span className={"name-text"}>{"Genres"}</span>
        <i className="fas fa-chevron-right" />
      </div>
      <div className={this.state.dropdownIsOpen ? "dropdown open" : "dropdown"}>
        {this.props.list
          ? this.props.list.map(item => {
              return <div className={this.state.itemIsChecked ? "item-dropdown checked" : "item-dropdown"}
                          onClick={(e) => this.handlerItemClick(e, item.id)}
                          key={item.id}>
                <span className={"square"}>
                  <i className="fas fa-check"/>
                </span>
                <span className={"name"}>{item.name}</span>
              </div>
        }) : null}
      </div>
    </div>
  }
}