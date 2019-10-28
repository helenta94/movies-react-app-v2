import React from "react";
import {countries} from "../countries"
import Dropdown from "./Dropdown";

export default class FilterCountry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      countriesList: this.getCountriesList()
    };
  }

  getCountriesList() {
    let countriesList = [];
    for (let key in countries) {
      countriesList.push({id: key, name: countries[key]})
    }

    return countriesList;
  }

  render() {
    return <div className={"filter"}>
      <Dropdown list={this.state.countriesList}
                selected={this.props.selected}
                dropdownName={"Country"}
                handlerClick={(id) => this.props.changeHandler(id)}
                multiple={true} />
    </div>
  }
}