import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import Event from './Event';
import io from 'socket.io-client';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.setClientNumber = this.setClientNumber.bind(this);
    this.resetClientNumber = this.resetClientNumber.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.displayRawPayload = this.displayRawPayload.bind(this);
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
          rawPayloadData: "hello"
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
          rawPayloadData: "goodbye"
        }    
      ],
      modal: {
        show: false,
        rawPayloadData: ''
      }
    }
  }

  setClientNumber(clientNumber){

    const socket = io.connect('https://stormy-bastion-74675.herokuapp.com/');
    socket.on('eventPayload', (data) => {
      const event = this.extractPayload(data);
      this.setState({
        eventList: this.state.eventList.concat(event)
      });
      console.log(data);
    });

    socket.emit('register', clientNumber);

    this.setState( { 
      selectedClientNumber: clientNumber,
      socket: socket 
    } );
    
  }

  resetClientNumber(){
    this.setState( {
      selectedClientNumber: '',
      eventList: []
    })
  }

  //pull out event details from the socket payload 
  extractPayload(data){
    return data; 
  }

  //display modal dialog with raw event xml payload
  displayRawPayload(rawPayload){
    this.setState({
      modal: {
        show: true,
        rawPayloadData: rawPayload
      }
    })
  }

  //close the Raw Payload modal and clear its contents 
  closeModal(){
    this.setState({
      modal: {
        show: false,
        rawPayloadData: ''
      }
    })
  }

  render() {

    return (
      <div className="App containter-fluid">
        <Modal show={this.state.modal.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Raw Event Payload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre>
              <code>
                {this.state.modal.rawPayloadData}
              </code>
            </pre>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Header selectedClientNumber={this.state.selectedClientNumber} setClientNumber={this.setClientNumber} resetClientNumber={this.resetClientNumber}/>
        <Event 
          events={this.state.eventList} 
          displayRawPayload={this.displayRawPayload} />
      </div>
    );
  }
}

export default App;
