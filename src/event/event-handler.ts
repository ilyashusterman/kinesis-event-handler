import { EventDatabase, instance } from "../database/db.js";
import { RawEvent, EventHandlerResult, EventPayload } from "./event-dataclasses.js";
import { USER_LIMIT_IMPLEMENTATIONS } from "../user/user-limit-factory.js";


export class EventHandler {
    db: EventDatabase = instance;

    async process({ type, payload, ...rawEventProps }: RawEvent<number | string | any>): Promise<EventHandlerResult> {
        const loadedPayload: EventPayload = payload;
        if (!(type in USER_LIMIT_IMPLEMENTATIONS)) {
            const msg = `>>> Event type={${type}} not implemented<<<`
            console.warn(msg)
            return {
                'status': msg
            }
        }
        /* Factory based on event.payload.type */
        const result = await this.userLimitFactory(type, loadedPayload, rawEventProps)

        return result
    }
    async userLimitFactory(type: any, payload: EventPayload, rawEventProps: any): Promise<EventHandlerResult> {
        const factoryClass = USER_LIMIT_IMPLEMENTATIONS[type];
        const clsImplementation = new factoryClass(this.db, payload, rawEventProps)
        let result;
        try {
            result = await clsImplementation.handle()
        } catch (err) {
            result = {
                'status': err
            }
        }
        return result
    }
}