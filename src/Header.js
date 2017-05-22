import React, { Component } from "react";

var Header = props => {
  return (
    <div className="col-sm-12" id="header">
      <div className="col-sm-4" id="page-title">
        <h2>Aria Event Viewer</h2>
      </div>
      <div className="col-sm-4" id="client-select">
        <ClientSelection
          selectedClientNumber={props.selectedClientNumber}
          setClientNumber={props.setClientNumber}
          resetClientNumber={props.resetClientNumber}
        />
      </div>
      <div className="col-sm-4" id="instructions-section">
        <button type="button" className="btn btn-info">Instructions</button>
      </div>
    </div>
  );
};

class ClientSelection extends Component {
  constructor(props) {
    super(props);
    this.resetClientNumber = this.resetClientNumber.bind(this);
    this.selectClientNumber = this.selectClientNumber.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isClientSelect: false,
      value: ""
    };
  }

  //handle change for Controlled Component form
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  //Sets the client selection
  selectClientNumber(event) {
    event.preventDefault();

    const clientNumber = this.state.value;
    if (clientNumber === "") {
      return;
    }
    this.props.setClientNumber(clientNumber);
  }

  //Resets the client selection
  resetClientNumber() {
    this.props.resetClientNumber();

    this.setState({
      value: ""
    });
  }

  render() {
    if (this.props.selectedClientNumber) {
      return (
        <div>
          <span className="label label-success" id="selected-client-number">
            Listening on {this.props.selectedClientNumber}
          </span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.resetClientNumber}
          >
            Reset
          </button>
        </div>
      );
    }
    return (
      <form className="form-inline" onSubmit={this.selectClientNumber}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a client id"
          id="client-number-input"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default Header;
