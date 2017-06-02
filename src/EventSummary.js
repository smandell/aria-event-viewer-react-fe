import React from "react";
import PropTypes from "prop-types";
import Label from "react-bootstrap/lib/Label";

const EventSummary = props => {
  let eventSummaryElement = null;

  switch (props.type) {
    case "instance":
      eventSummaryElement = <InstanceEventSummary data={props.data} />;
      break;
    case "order":
      eventSummaryElement = <OrderEventSummary data={props.data} />;
      break;
    case "financial":
      eventSummaryElement = <FinancialEventSummary data={props.data} />;
      break;
    case "notification":
      eventSummaryElement = <NotificationEventSummary data={this.props.data} />;
      break;
    case "product":
      eventSummaryElement = <ProductEventSummary data={this.props.data} />;
      break;
    default:
      eventSummaryElement = <UnknownEventSummary data={this.props.data} />;
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

EventSummary.propTypes = {
  type: PropTypes.string.isRequired,
  eventTitles: PropTypes.array.isRequired,
  data: PropTypes.object
};

const InstanceEventSummary = props => {
  return (
    <div className="event-summary row">
      <div className="col-sm-2">
        <Label bsStyle="danger">Acct: {props.data.accountNum}</Label>
      </div>
      <div className="col-sm-10">
        {props.data.planData.map(plan => {
          return (
            <Label bsStyle="primary" key={plan.plan_instance_num}>
              {plan.plan_instance_num} - {plan.plan_instance_name}
            </Label>
          );
        })}
      </div>
    </div>
  );
};

InstanceEventSummary.propTypes = {
  data: PropTypes.shape({
    accountNum: PropTypes.string.isRequired,
    planData: PropTypes.shape({
      plan_instance_num: PropTypes.number,
      plan_instance_name: PropTypes.string
    })
  })
};

const OrderEventSummary = props => {
  return <div className="event-summary" />;
};

/**
 * Captures the Financial Event Class summary display 
 * @param {Object} props 
 */
const FinancialEventSummary = props => {
  return (
    <div className="event-summary">
      <Label bsStyle="danger">Acct: {props.data.accountNum}</Label>
      {props.data.totalInvoiceAmount &&
        <Label bsStyle="success">
          Total Invoice Amount: {props.data.totalInvoiceAmount}
        </Label>}
    </div>
  );
};

FinancialEventSummary.propTypes = {
  data: PropTypes.shape({
    accountNum: PropTypes.number.isRequired,
    totalInvoiceAmount: PropTypes.number
  })
};

/**
 * Captures the Notification Event Class summary display 
 * @param {Object} props 
 */
const NotificationEventSummary = props => {
  return (
    <div className="event-summary">
      <Label bsStyle="danger">Acct: {props.data.accountNum}</Label>
      <Label bsStyle="primary">
        Message Subject: {props.data.messageSubject}
      </Label>
      <Label bsStyle="primary">
        Message Recipient: {props.data.messageRecepient}
      </Label>
    </div>
  );
};

NotificationEventSummary.propTypes = {
  data: PropTypes.shape({
    accountNum: PropTypes.number.isRequired,
    messageSubject: PropTypes.string.isRequired,
    messageRecepient: PropTypes.string.isRequired
  })
};

const ProductEventSummary = props => {
  return <div className="event-summary" />;
};

/**
 * This is a generic event summary field that will simply display the contents of the data object in string format. 
 * It is included in case Aria adds any more classes of events later down the line. 
 * @param {Object} props 
 */
const UnknownEventSummary = props => {
  return <div className="event-summary" />;
};

export default EventSummary;