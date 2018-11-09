import React, { Component } from "react";


class List extends Component {

  renderRow = (item) => {
    var display = '';
    for (var property in item) {
      display += item[property];
    }
    return display;
  }
   
  render() {
    return (
      <div className="list">
        {this.props.items.map((item, index) => {
          return (
            <div index={index} key={item.id} className="row"> 
              {this.renderRow(item, index)} 
              <span onClick={() => this.props.onRowClick(item, 'detail')} className="rowButton">View</span>
              <span onClick={() => this.props.onRowClick(item, 'edit')} className="rowButton">Edit</span>
            </div>)
        })}
      </div>
    );
  }
}

export default List;