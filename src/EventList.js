import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/lib/Button";
import Label from "react-bootstrap/lib/Label";
import "./Styles/EventList.css";
import EventSummary from "./EventSummary";

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
    <div className="row event-box">
      <div key={event.id} className="col-sm-12">
        <div className="col-sm-1 datetime-box">
          <EventTime dateTime={event.dateTime} />
        </div>
        <div className="col-sm-1 type-box">
          <EventType type={event.type} />
        </div>
        <div className="col-sm-8">
          <EventSummary
            data={event.data}
            type={event.type}
            eventTitles={event.eventTitles}
          />
        </div>
        <div className="col-sm-2 rawPayloadData-box">
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

EventTime.propTypes = {
  dateTime: PropTypes.string.isRequired
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
    default:
      //[todo: come up with an icon and color for unknown events]
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
const EventType = ({ type }) => {
  const eventTypeData = determineEventType(type);

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

EventType.propTypes = {
  type: PropTypes.string.isRequired
};

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

EventPayload.propTypes = {
  displayRawPayload: PropTypes.func.isRequired,
  rawPyaloadData: PropTypes.string.isRequred
};

export default EventList;
