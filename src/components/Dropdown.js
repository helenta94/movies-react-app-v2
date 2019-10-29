import React from "react";

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

  getItemClassNames(id) {
    if (this.props.selected.includes(id)) {
      return "item-dropdown selected"
    } else {
      return "item-dropdown"
    }
  }

  getLabel() {
    if (this.props.selected.length < 1) {
      return this.props.dropdownName;
    } else if (this.props.selected.length === 1
      && this.props.list.find(el => el.id === this.props.selected[0]) !== undefined) {
      return this.props.list.find(el => JSON.stringify(el.id) === JSON.stringify(this.props.selected[0])).name;
    } else {
      return "Selected(" + this.props.selected.length + ")";
    }
  }

  render() {
    return <div className={this.state.dropdownIsOpen ? "dropdown-view open" : "dropdown-view"}
                ref={this.dropdownItemRef}>
      <div className={"item-name"} onClick={() => this.handlerClickDropdown()}>
        <span className={"name-text"}>{this.getLabel()}</span>
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