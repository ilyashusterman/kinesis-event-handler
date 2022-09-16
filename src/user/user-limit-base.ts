import { EventDatabase } from "../database/db.js";
import { UserLimit } from "./user-limit.js";
import { EventHandlerResult, EventType } from "../event/event-dataclasses.js";


export class BaseUserLimit {
    /* 
    base class logic that will create and keep an updated `UserLimit` entity for user limit,
    based on the interface defined in `user-limit.ts`. via implemented event business logic:
    */
    eventType: any = null;
    defaultProgress: string = "0"
    payload: UserLimit
    db: EventDatabase
    rawEventProps: any
    constructor(db: EventDatabase, payload: UserLimit, rawEventProps: any) {
        this.db = db;
        this.payload = payload;
        this.rawEventProps = rawEventProps;
    }
    handle(): Promise<EventHandlerResult> {
        throw new Error('NotImplemented')
    }
    getUserLimit(): UserLimit {
        return {
            createdAt: this.rawEventProps.createdAt,
            progress: this.defaultProgress,
            ...this.payload
        }
    }
    async validateUserExist(message: string) {
        const isUserExist = await this.db.isUserExist(this.payload.userId);
        if (!isUserExist) {
            throw new Error(message);
        }
    }
}

export class LimitUserBaseProgress extends BaseUserLimit {
    async handle(): Promise<EventHandlerResult> {
        await this.validateUserExist(
            `UserLimit does not exist, Got event of {"${this.eventType}"} with out ${EventType.USER_LIMIT_CREATED} instanciation`
        )

        const progress = this.getProgress()
        const status = await this.db.updateUserKeyVal(this.payload.userId, 'progress', progress)
        return {
            'status': status
        }
    }
    getProgress() {
        throw new Error("Method not implemented.");
    }
}