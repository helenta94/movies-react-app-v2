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
    console.log(id);
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
    return <div className={this.state.dropdownIsOpen ? "dropdown-view genre open" : "dropdown-view genre"}
                ref={this.dropdownItemRef}>
      <div className={"item-name"} onClick={() => this.handlerClickDropdown()}>
        <span className={"name-text"}>{"Genres"}</span>
        <i className="fas fa-chevron-right" />
      </div>
      <div className={this.state.dropdownIsOpen ? "dropdown open" : "dropdown"}>
        {this.props.list
          ? this.props.list.map(item => {
              return <div className={"item-dropdown"}
                          onClick={(e) => this.handlerItemClick(e, item.id)}
                          key={item.id}>
                <label className={"label-checkbox"}>
                  <input type={"checkbox"} className={"field-checkbox"}/>
                  <span className={"custom-checkbox"}>
                    <i className="fas fa-check"/>
                  </span>
                  <span className={"text"}>{item.name}</span>
                </label>
              </div>
        }) : null}
      </div>
    </div>
  }
}