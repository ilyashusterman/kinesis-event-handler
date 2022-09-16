import { EventDatabase } from "../database/db.js";
import { UserLimit } from "./user-limit.js";
import { EventHandlerResult, EventPayload, EventType } from "../event/event-dataclasses.js";


export class BaseUserLimit {
    /* 
    base class logic that will create and keep an updated `UserLimit` entity for user limit,
    based on the interface defined in `user-limit.ts`. via implemented event business logic:
    */
    eventType: any = null;
    defaultProgress: string = "0"
    payload: EventPayload
    db: EventDatabase
    rawEventProps: any
    constructor(db: EventDatabase, payload: EventPayload, rawEventProps: any) {
        this.db = db;
        this.payload = payload;
        this.rawEventProps = rawEventProps;
    }
    handle(): Promise<EventHandlerResult> {
        throw new Error('NotImplemented')
    }
    getUserLimit(): UserLimit {
        return {
            activeFrom: this.payload.activeFrom,
            createdAt: this.rawEventProps.createdAt,
            brandId: this.payload.brandId,
            currencyCode: this.payload.currencyCode,
            userId: this.payload.userId,
            period: this.payload.period,
            status: this.payload.status,
            type: this.payload.type,
            progress: this.defaultProgress,
            userLimitId: this.payload.userLimitId,
            value: this.payload.value,
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