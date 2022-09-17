import { EventDatabase } from "../database/db.js";
import { EventHandlerResult, EventType } from "../event/event.data.classes.js";


export class BaseUserLimitHandler<EventPayloadType>{
    /* 
    base class logic that will create and keep an updated `UserLimit` entity for user limit,
    based on the interface defined in `user-limit.ts`. via implemented event business logic:
    */
    eventType: any = null;
    defaultProgress: string = "0"

    payload: EventPayloadType | any
    db: EventDatabase
    rawEventProps: any
    constructor(db: EventDatabase, payload: EventPayloadType, rawEventProps: any) {
        this.db = db;
        this.payload = payload;
        this.rawEventProps = rawEventProps;
    }
    handle(): Promise<EventHandlerResult | Error> {
        throw new Error('NotImplemented')
    }
    getUserLimit(): EventPayloadType {
        return {
            createdAt: this.rawEventProps.createdAt,
            progress: this.getProgress(),
            ...this.payload
        }
    }
    getProgress() {
        throw new Error("Method not implemented.");
    }
}

export class LimitUserBaseProgressHandler<T> extends BaseUserLimitHandler<T> {


    async handle(): Promise<EventHandlerResult | Error> {
        await this.validateUserExist(
            `UserLimit does not exist, Got event of {"${this.eventType}"} with out ${EventType.USER_LIMIT_CREATED} instanciation`
        )

        const progress = this.getProgress()
        await this.db.updateUserKeyVal(this.payload.userId, 'progress', progress)
        return {
            'status': 'Updated User progress successfully'
        }
    }
    async validateUserExist(message: string): Promise<void> {
        const isUserExist = await this.db.isUserExist(this.payload.userId);
        if (!isUserExist) {
            throw new Error(message);
        }
    }
}