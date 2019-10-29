import React from "react";
import Dropdown from "./Dropdown";

export default class FilterYears extends React.Component {

  constructor(props) {
    super(props);

    this.years = [
      {id: -1, name: "All years"},
      {id: 2019, name: "2019 year"},
      {id: 2018, name: "2018 year"},
      {id: 2017, name: "2017 year"},
      {id: 2016, name: "2016 year"},
      {id: 2015, name: "2015 year"},
      {id: 2014, name: "2014 year"},
      {id: 2013, name: "2013 year"},
      {id: "2010,2015", name: "2010 - 2015"},
      {id: "2000,2010", name: "2000 - 2010"},
      {id: "1990,2000", name: "1990 - 2000"},
      {id: "1980,1990", name: "1980 - 1990"},
      {id: "1940,1980", name: "until 1980"},
    ];
  };

  handlerItemClick(id) {
    this.props.changeHandler(id);
  }

  render() {
    return <div className={"filter"}>
      <Dropdown list={this.years}
                selected={this.props.selected}
                dropdownName={"All years"}
                handlerClick={(id) => this.handlerItemClick(id)}
                multiple={false}/>
    </div>
  }
}