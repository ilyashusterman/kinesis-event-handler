

import { EventHandler } from './index.js';
import { EventType, RawEvent } from './src/event/event.data.classes.js';
import data from './tests/events.json' assert {type: "json"};
import { producer as producerMock } from './tests/kinesis.mock.js';
import { consumer as consumerMock } from './tests/kinesis.mock.js';


const handler = new EventHandler();

const getEvent = (eventType: EventType): RawEvent<any> => {
    const eventsFound = data.filter((event) => event.type === eventType);
    return eventsFound[0]
}
const testUserLimitCreated = async () => {
    const event = getEvent(EventType.USER_LIMIT_CREATED);
    const result = await handler.process(event);
    console.log(result)
}
const testUserLimitProgressChanged = async () => {
    const event = getEvent(EventType.USER_LIMIT_PROGRESS_CHANGED);
    const result = await handler.process(event);
    console.log(result)
}
const testUserLimitReset = async () => {
    const event = getEvent(EventType.USER_LIMIT_RESET);
    const result = await handler.process(event);
    console.log(result)
}

const testKinesisConsumerProducerMocksEventsJson = async () => {
    const kinesisMockConsumer = consumerMock();
    await producerMock(data, kinesisMockConsumer)
}

const main = () => {
    testUserLimitCreated()
    testUserLimitProgressChanged()
    testUserLimitReset()
    testKinesisConsumerProducerMocksEventsJson()
}
main();