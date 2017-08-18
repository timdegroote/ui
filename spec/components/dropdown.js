import React from 'react';
import Dropdown from '../../components/dropdown';

class DropdownTest extends React.Component {

  listItems = [
    {
      value: 1,
      title: 'Ron Swanson',
      subtitle: 'ron@swanson.com',
      image: 'http://lorempixel.com/200/300/people/?test=1',
    },
    {
      value: 2,
      title: 'Leslie Knope',
      subtitle: 'leslie@pawnee.com',
    },
    {
      value: 3,
      title: 'Andy Dwyer',
      subtitle: 'andy@pawnee.com',
    },
    {
      value: 4,
      title: 'Tom Haverford',
      subtitle: 'tom@rentaswag.com',
    },
  ];

  listItems = [];

  render () {
    return (
      <div>
        <h2>DropDowns</h2>
        <Dropdown
          placeholder="Select a customer"
          initialValue="4"
          initialInputValue="Tom Haverford"
          listItems={this.listItems}
          emptyListLabel="No results found"
        />
      </div>
    );
  }
}

export default DropdownTest;
