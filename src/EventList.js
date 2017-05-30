import React, { Component } from "react";
import Button from "react-bootstrap/lib/Button";
import Label from "react-bootstrap/lib/Label";

var EventList = props => {
  return (
    <div>
      {props.events.map(eventInstance => {
        return (
          <Event
            event={eventInstance}
            displayRawPayload={props.displayRawPayload}
          />
        );
      })}
    </div>
  );
};

const Event = ({ event, displayRawPayload }) => {
  return (
    <div className="row">
      <div key={event.id} className="col-sm-12 event-box">
        <div className="col-sm-1">
          <EventTime dateTime={event.dateTime} />
        </div>
        <div className="col-sm-1">
          <EventType type={event.type} />
        </div>
        <div className="col-sm-8">
          <EventSummary
            data={event.data}
            type={event.type}
            eventTitles={event.eventTitles}
          />
        </div>
        <div className="col-sm-2">
          <EventPayload
            rawPayloadData={event.rawPayloadData}
            displayRawPayload={displayRawPayload}
          />
        </div>
      </div>
    </div>
  );
};

const EventTime = props => {
  return (
    <div className="timestamp">
      <div>
        <p className="text-center">{props.dateTime} </p>
      </div>
    </div>
  );
};

/**
 * Creates the styling for the Event Type section of the Event Box
 * @param {string} eventType - The type of event {instance, order, financial, notification, product, or unknown}
 */
const determineEventType = eventType => {
  const eventTypeData = {};

  switch (eventType) {
    case "instance":
      eventTypeData.class = "type-icon bg-primary";
      eventTypeData.title = "Accounts and Master Plan Instances";
      eventTypeData.icon = "account_circle";
      break;
    case "order":
      eventTypeData.class = "type-icon bg-info";
      eventTypeData.title = "Orders";
      eventTypeData.icon = "shopping_cart";
      break;
    case "financial":
      eventTypeData.class = "type-icon bg-success";
      eventTypeData.title = "Financial";
      eventTypeData.icon = "euro_symbol";
      break;
    case "notification":
      eventTypeData.class = "type-icon bg-primary";
      eventTypeData.title = "Accounts and Master Plan Instances";
      eventTypeData.icon = "account_circle";
      break;
    case "product":
      eventTypeData.class = "type-icon bg-primary";
      eventTypeData.title = "Accounts and Master Plan Instances";
      eventTypeData.icon = "account_circle";
      break;
    default: //[todo: come up with an icon and color for unknown events]
      eventTypeData.class = "type-icon bg-primary";
      eventTypeData.title = "Unknown Event";
      eventTypeData.icon = "account_circle";            
  }

  return eventTypeData;
};

/**
 * Displays the Event Type section of the Event Box 
 * @param {Object} props 
 */
var EventType = props => {
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
};

var EventSummary = props => {
  let eventSummaryElement = null;

  switch (props.type) {
    case "instance":
      eventSummaryElement = <InstanceEventSummary data={props.data} />;
      break;
    case "order":
      eventSummaryElement = <OrderEventSummary data={props.data} />
      break;
    case "financial":
      eventSummaryElement = <FinancialEventSummary data={props.data} />
      break;
    case "notification":
      eventSummaryElement = <NotificationEventSummary data={this.props.data} />
      break;
    case "product":
      eventSummaryElement = <ProductEventSummary data={this.props.data} />
      break;
    default:
      eventSummaryElement = <UnknownEventSummary data={this.props.data} />
  }

  return (
    <div>
      <ul className="event-title-list">
        {props.eventTitles.map(eventTitle => {
          return (
            <li key={eventTitle.event_no}>
              {eventTitle.event_num} - {eventTitle.event_name}{" "}
            </li>
          );
        })}
      </ul>
      {eventSummaryElement}
    </div>
  );
};

const InstanceEventSummary = props => {
  return (
    <div className="event-summary">
      <div className="col-sm-2">
        <Label bsStyle="danger">Acct: {props.data.accountNum}</Label>
      </div>
      <div className="col-sm-10">
        {props.data.planData.map(plan => {
          return (
            <Label bsStyle="primary">
              {plan.plan_instance_num} - {plan.plan_instance_name}
            </Label>
          );
        })}
      </div>
    </div>
  );
};

const OrderEventSummary = props => {
  return (
    <div className="event-summary">
    </div>
  );
}

const FinancialEventSummary = props => {
  return (
    <div className="event-summary">
      <Label bsStyle="danger">Acct: {props.data.accountNum}</Label>
      {props.data.totalInvoiceAmount && 
      <Label bsStyle="success">Total Invoice Amount: {props.data.totalInvoiceAmount}</Label>}
    </div>
  );  
}

const NotificationEventSummary = props => {
  return (
    <div className="event-summary">
      <Label bsStyle="danger">Acct: {props.data.accountNum}</Label>
      <Label bsStyle="primary">Message Subject: {props.data.messageSubject}</Label>
      <Label bsStyle="primary">Message Recipient: {props.data.messageRecepient}</Label>
    </div>
  );
}

const ProductEventSummary = props => {
  return (
    <div className="event-summary">
    </div>
  );
}

const UnknownEventSummary = props => {
  return (
    <div className="event-summary">
    </div>
  );
}

//displays the 'View Payload' button and contents
class EventPayload extends Component {
  constructor(props) {
    super(props);
    this.displayRawPayload = this.displayRawPayload.bind(this);
  }

  displayRawPayload(event) {
    this.props.displayRawPayload(this.props.rawPayloadData);
  }

  render() {
    return (
      <Button bsStyle="info" onClick={this.displayRawPayload}>
        View Payload
      </Button>
    );
  }
}

export default EventList;
