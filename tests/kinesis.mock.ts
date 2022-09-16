import { EventHandler } from "../index.js";
import { RawEvent } from "../src/event/event.data.classes.js";

export const consumer = () => {
    const handler = new EventHandler();
    const processEvent = async (event: RawEvent<any>) => {
        const result = await handler.process(event);
        console.log(`>>>Consumed Result {${result.status}} >>>`);
    };
    return processEvent;

}

export const producer = async (data: any, consumerCallBack: Function) => {
    console.log('Kinesis Producer mock instanciated and connected!')
    for (const event of data) {
        await consumerCallBack(event)
    }
}
