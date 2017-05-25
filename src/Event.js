import React, { Component } from "react";
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';

var Event = (props) => {
  return (
    <div>
      {props.events.map(event => {
        return (
          <div key={event.id} className="col-sm-12 event-box">
            <div className="col-sm-1">
              <EventTime datetime={event.datetime} />
            </div>
            <div className="col-sm-1">
              <EventType type={event.type} />
            </div>
            <div className="col-sm-8">
              <EventSummary data={event.data} />
            </div>
            <div className="col-sm-2">
              <EventPayload 
                rawPayloadData={event.rawPayloadData} 
                displayRawPayload={props.displayRawPayload} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

var EventTime = (props) => {
  return (
    <div className="timestamp">
      <div>
        <p className="text-center">{props.datetime} </p>
      </div>
    </div>
  );
}

//Generates eventTypeData object used to create event UI
var determineEventType = (eventType) => {
  let eventTypeData = {
    class: "type-icon", //background color
    title: "", //tooltip text
    icon: "" //material design icon
  };

  switch (eventType) {
    case "instance":
      eventTypeData.class = `${eventTypeData.class} bg-primary`;
      eventTypeData.title = "Accounts and Master Plan Instances";
      eventTypeData.icon = "account_circle";
      break;
    case "order":
      eventTypeData.class = `${eventTypeData.class} bg-info`;
      eventTypeData.title = "Orders";
      eventTypeData.icon = "shopping_cart";
      break;
    case "financial":
      eventTypeData.class = `${eventTypeData.class} bg-primary`;
      eventTypeData.title = "Accounts and Master Plan Instances";
      eventTypeData.icon = "account_circle";
      break;
    case "notification":
      eventTypeData.class = `${eventTypeData.class} bg-primary`;
      eventTypeData.title = "Accounts and Master Plan Instances";
      eventTypeData.icon = "account_circle";
      break;
    case "product":
      eventTypeData.class = `${eventTypeData.class} bg-primary`;
      eventTypeData.title = "Accounts and Master Plan Instances";
      eventTypeData.icon = "account_circle";
      break;
  }

  return eventTypeData;
}

var EventType = (props) => {
  const eventTypeData = determineEventType(props.type);

  return (
    <div
      className={eventTypeData.class}
      data-toggle="tooltip"
      title={eventTypeData.title}
    >
      <i className="material-icons">{eventTypeData.icon}</i>
    </div>
  );
}

var EventSummary = (props) => {
  let eventSummaryElement = null;

  switch (props.data.type) {
    case "instance":
      eventSummaryElement = <InstanceEventSummary data={props.data} />;
      break;
    // case "order":
    //   eventSummaryElement = <OrderEventSummary data={this.props.data} />
    //   break;
    // case "financial":
    //   eventSummaryElement = <FinancialEventSummary data={this.props.data} />
    //   break;
    // case "notification":
    //   eventSummaryElement = <NotificationEventSummary data={this.props.data} />
    //   break;
    // case "product":
    //   eventSummaryElement = <ProductEventSummary data={this.props.data} />
    //   break;
  }

  return (
    <div>
      <ul className="event-title-list">
        {props.data.eventTitles.map(eventTitle => {
          return (
            <li key={eventTitle.event_no}>
              {eventTitle.event_no} - {eventTitle.event_name}{" "}
            </li>
          );
        })}
      </ul>
      {eventSummaryElement}
    </div>
  );
}

var InstanceEventSummary = (props) => {
  return (
    <div className="event-summary">
      <div className="col-sm-2">
        <Label bsStyle="danger">Acct: {props.data.acct_no}</Label>
      </div>
      <div className="col-sm-10">
        {props.data.plandata.map(plan => {
          return (
            <Label bsStyle="primary">Master Plan: {plan.plan_instance_title}</Label>
          );
        })}
      </div>
    </div>
  );
}

//displays the 'View Payload' button and contents 
class EventPayload extends Component {
  constructor(props) {
    super(props);
    this.displayRawPayload = this.displayRawPayload.bind(this);
  }

  displayRawPayload(event){
    this.props.displayRawPayload(this.props.rawPayloadData);
  }

  render() {
    return(
      <Button bsStyle="info" onClick={this.displayRawPayload}>View Payload</Button>
    );
  }
}

export default Event;
