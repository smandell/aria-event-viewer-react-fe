import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Event from './Event';

class App extends Component {
  constructor(props) {
    super(props);
    this.setClientNumber = this.setClientNumber.bind(this);
    this.resetClientNumber = this.resetClientNumber.bind(this);
    this.state = {
      selectedClientNumber: '',
      eventList: [
        {
          id: "1235",
          datetime: "12/2/2017",
          type: "instance",
          data: {
            type: 'instance',
            eventTitles: [
              {
                event_no: '724',
                event_name: 'Master Plan Instance Assigned'
              },
              {
                event_no: '726',
                event_name: 'Master Plan Instance Made Up Event'
              }          
            ],
            acct_no: '123456',
            plandata: [
              {
                plan_instance_title: "203052 - STARLINK Safety"
              },
              {
                plan_instance_title: "234522 - STARLINK Remote Services"
              }          
            ]
          },
          payload: "hello"
        },
        {
          id: "12356",
          datetime: "12/2/2017",
          type: "instance",
          data: {
            type: 'instance',
            eventTitles: [
              {
                event_no: '724',
                event_name: 'Master Plan Instance Assigned 2'
              },
              {
                event_no: '726',
                event_name: 'Master Plan Instance Made Up Event 2'
              }          
            ],
            acct_no: '123456',
            plandata: [
              {
                plan_instance_title: "203052 - STARLINK Safety"
              },
              {
                plan_instance_title: "234522 - STARLINK Remote Services"
              }          
            ]
          },
          payload: "hello"
        }    
      ]
    }
  }

  setClientNumber(clientNumber){
    this.setState( { selectedClientNumber: clientNumber } );
  }

  resetClientNumber(){
    this.setState( {
      selectedClientNumber: '',
      eventList: []
    })
  }

  render() {

    return (
      <div className="App containter-fluid">
        <Header selectedClientNumber={this.state.selectedClientNumber} setClientNumber={this.setClientNumber} resetClientNumber={this.resetClientNumber}/>
        <Event events={this.state.eventList} />
      </div>
    );
  }
}

export default App;
