import React, { Component } from "react";
import "./Styles/App.css";
import Header from "./Header";
import EventList from "./EventList";
import io from "socket.io-client";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import {
  InstanceEventData,
  OrderEventData,
  FinancialEventData,
  NotificationEventData,
  ProductEventData
} from "./EventData";
import extractPayload from "./PayloadConverter";

class App extends Component {
  constructor(props) {
    super(props);
    this.setClientNumber = this.setClientNumber.bind(this);
    this.resetClientNumber = this.resetClientNumber.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.displayRawPayload = this.displayRawPayload.bind(this);
    this.state = {
      selectedClientNumber: "",
      eventList: [
        {
          id: "1235",
          dateTime: "12/2/2017",
          type: "instance",
          eventTitles: [
            {
              event_num: "724",
              event_name: "Master Plan Instance Assigned"
            },
            {
              event_num: "726",
              event_name: "Master Plan Instance Made Up Event"
            }
          ],
          data: {
            accountNum: "123456",
            planData: [
              {
                plan_instance_num: "203052",
                plan_instance_name: "STARLINK Safety"
              },
              {
                plan_instance_num: "234522",
                plan_instance_name: "STARLINK Remote Services"
              }
            ]
          },
          rawPayloadData: "hello"
        },
        {
          id: "12356",
          dateTime: "12/2/2017",
          type: "order",
          eventTitles: [
            {
              event_num: "804",
              event_name: "Order Paid"
            }
          ],
          data: {
            account_num: 111111,
            user_id: "bob_smith",
            order_num: 12345,
            order_status: "good", //todo: figure out valid values for this
            plan_instance_num: 123456,
            orderData: [
              {
                sku: "12345abc",
                units: 1234,
                unit_rate: "123.23"
              },
              {
                sku: "abc12345",
                units: 12,
                unit_rate: "555.55"
              }
            ]
          },
          rawPayloadData: "order"
        }
      ],
      modal: {
        show: false,
        rawPayloadData: ""
      }
    };
  }

  /**
   * 
   * @param {int} clientNumber - The client number the user has selected
   */
  setClientNumber(clientNumber) {
    const socket = io.connect("https://stormy-bastion-74675.herokuapp.com/");
    socket.on("eventPayload", data => {
      const event = extractPayload(data);
      this.setState({
        eventList: this.state.eventList.concat(event)
      });
      console.log(data);
    });

    socket.emit("register", clientNumber);

    this.setState({
      selectedClientNumber: clientNumber,
      socket: socket
    });
  }

  /**
   * Clears the client number from state and unregisters its listener from the server 
   */
  resetClientNumber() {
    this.setState({
      selectedClientNumber: "",
      eventList: []
    });

    this.state.socket.emit("unregister", this.state.selectedClientNumber);
  }

  //display modal dialog with raw event xml payload
  displayRawPayload(rawPayload) {
    this.setState({
      modal: {
        show: true,
        rawPayloadData: rawPayload
      }
    });
  }

  //close the Raw Payload modal and clear its contents
  closeModal() {
    this.setState({
      modal: {
        show: false,
        rawPayloadData: ""
      }
    });
  }

  render() {
    {
      /* required by React to be able to insert the raw html for the XML event payload */
    }
    const preBlock = {
      __html: "<pre>" + this.state.modal.rawPayloadData + "</pre>"
    };

    return (
      <div className="App containter-fluid">
        <Modal show={this.state.modal.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Raw Event Payload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div dangerouslySetInnerHTML={preBlock} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <div className="row">
          <Header
            selectedClientNumber={this.state.selectedClientNumber}
            setClientNumber={this.setClientNumber}
            resetClientNumber={this.resetClientNumber}
          />
        </div>
        <div className="row">
          <EventList
            events={this.state.eventList}
            displayRawPayload={this.displayRawPayload}
          />
        </div>
      </div>
    );
  }
}

export default App;
