import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { customers: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

  static renderCustomersTable(customers) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer =>
            <tr key={customer.CustomerName}>
              <td>{customer.CustomerName}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderCustomersTable(this.state.customers);

    return (
      <div>
        <h1 id="tabelLabel" >Weather customer</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
      const response = await fetch('customer', {
          headers: {
              ApiKey: 'CarShareRmit'
          }
      });
    const data = await response.json();
    this.setState({ customers: data, loading: false });
  }
}
