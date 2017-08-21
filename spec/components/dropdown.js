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

  action = {
    label: 'Add new customer',
    callback: () => {
      alert('Adding new customer');
    },
  };

  render () {
    return (
      <div>
        <h2>DropDowns</h2>
        <Dropdown
          placeholder="Select a customer"
          listItems={this.listItems}
          emptyListLabel="No results found"
          action={this.action}
        />
      </div>
    );
  }
}

export default DropdownTest;
