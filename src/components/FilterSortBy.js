import React from 'react';
import Dropdown from "./Dropdown";

export default class FilterGenres extends React.Component {

  constructor(props) {
    super(props);

    this.itemsSortBy = [{id: "popularity.asc", name: "Popularity asc"},
      {id: "popularity.desc", name: "Popularity desc"},
      {id: "primary_release_date.asc", name: "Release date asc"},
      {id: "primary_release_date.desc", name: "Release date desc"},
    ]
  }

  handlerItemClick(id) {
    this.props.changeHandler(id);
  }

  render() {
    return <div className={"filter"}>
      <Dropdown list={this.itemsSortBy}
                selected={this.props.selected}
                dropdownName={"Sort by"}
                handlerClick={(id) => this.handlerItemClick(id)}
                multiple={false}/>
    </div>
  }
}