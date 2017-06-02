
  /**
   * Extracts the event payload data and transforms it inot the new EventData types. 
   * Note - eventually this will go away when the server has been re-written with the same data types
   * @param {Object} data - The socket payload containing event data 
   */
  export default function extractPayload(data) {
    var eventData = {};

    eventData.clientNum = data.client_no;
    eventData.dateTime = data.eventTime;
    eventData.rawPayloadData = data.rawBody;

    /**
       * get event titles. Note that these come in as a string in the form of:
       * [event number] [event name]
       * this method splits up that string so that each can be stored in its own variable 
       */
    eventData.eventTitles = data.event.map(eventTitle => {
      const eventTitleSplit = eventTitle.split(" ");
      const event = {
        event_num: eventTitleSplit.shift(),
        event_name: eventTitleSplit.join(' ')
      };
      return event;
    });

    if (data.eventType.instance){
      eventData.type = "instance";
      
      eventData.data = {};
      eventData.data.transactionId = data.transaction_id;
      eventData.data.accountNum = data.acct_no;

      if (data.planData) {
        eventData.data.planData = data.planData.map(planTitle => {
          const planTitleSplit = planTitle.split(" ");
          const plan = {
            plan_instance_num: planTitleSplit.shift(),
            plan_instance_name: planTitleSplit.join(' ')
          };
          return plan;
        });
      }
    } else if (data.eventType.order) {
      eventData.type = "order";
    } else if (data.eventType.financial) {
      eventData.type = "financial";
      
      eventData.data = {};
      eventData.data.accountNum = data.acct_no;
      eventData.data.totalInvoiceAmount = data.total_amount;

    } else if (data.eventType.notification) {
      eventData.type = "financial";
      
      eventData.data = {};
      eventData.data.accountNum = data.acct_no;
      eventData.data.messageSubject = data.messageSubject;        
      eventData.data.messageRecipient = data.messageRecipient;
    } else if (data.eventType.product) {

    } else { //for when a new event type gets introduced 
      eventData.type = "unknown";
    }


    return eventData;
  }