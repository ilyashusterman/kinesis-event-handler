
import { EventType, RawEvent } from './src/event/event-dataclasses.js';
import { EventHandler } from './src/event/event-handler.js';
import data from './tests/events.json' assert {type: "json"};


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

const testFullIntegration = async () => {
    const handleEvent = async (event: RawEvent<any>) => await handler.process(event)
    for (const iterator of data) {
        await handleEvent(iterator)
    }
}

const main = () => {
    testUserLimitCreated()
    testUserLimitProgressChanged()
    testUserLimitReset()
    testFullIntegration()
}
main();