/**
 * @param {int} clientNum - The Aria client number that fired this event. 
 * @param {string} dateTime - The time and date of the event.
 * @param {string} type - The type of event. 
 * @param {Object[]} eventTitles - The event number and names for this single event payload.
 * @param {int} eventTitles[].number - The event number.
 * @param {string} eventTitles[].name - The event name.
 * @param {string} rawPayloaddata - The raw XML event payload recieved from Aria. 
 */
class EventData{
    constructor(clientNum, dateTime, type, eventTitles, rawPayloadData){
        this.type = type;
        this.eventTitles = eventTitles;
        this.rawPayloadData = rawPayloadData;
    }
}

/**
 * @param {int} clientNum - The Aria client number that fired this event. 
 * @param {string} dateTime - The time and date of the event.
 * @param {string} type - The type of event. 
 * @param {Object[]} eventTitles - The event number and names for this single event payload.
 * @param {int} eventTitles[].number - The event number.
 * @param {string} eventTitles[].name - The event name.
 * @param {string} rawPayloaddata - The raw XML event payload recieved from Aria. 
 * @param {int} transactionId - The event transaction number. 
 * @param {int} accountNum - The Aria account number the event relates to.
 * @param {Object[]} planData - The plan instance ID and name the event is related to.
 * @param {int} planData[].planInstanceId - The plan instance ID the event is related to.
 * @param {string} planData[].planInstanceName - The plan instance name the event is related to. 
 */
class InstanceEventData extends EventData{
    constructor(clientNum, dateTime, type, eventTitles, rawPayloadData, transactionId, accountNum, planData){
        super(type, eventTitles, rawPayloadData);
        this.accountNum = accountNum;
        this.planData = planData;
    }
}

class OrderEventData extends EventData{

}

class FinancialEventData extends EventData{

}

class NotificationEventData extends EventData{

}

class ProductEventData extends EventData{

}

export {InstanceEventData, OrderEventData, FinancialEventData, NotificationEventData, ProductEventData};