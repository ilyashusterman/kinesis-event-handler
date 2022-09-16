import { EventHandlerResult } from "../event/event-dataclasses.js";
import { UserLimit } from "./user-limit.js";
import { BaseUserLimit, LimitUserBaseProgress } from "./user-limit-base.js";

export class LimitUserCreated extends BaseUserLimit {
    /*
    Instantiate a new UserLimit on USER_LIMIT_CREATED with correct values
    */
    async handle(): Promise<EventHandlerResult> {
        let userLimit: UserLimit = this.getUserLimit()
        const isUserExist = await this.db.isUserExist(this.payload.userId);
        if (isUserExist) {
            console.log('UserLimit existing, updating user with corrected values...');
            userLimit = await this.getUserLimitCorrectedValues(userLimit)

        } else {
            console.log('Creating new UserLimit');
        }
        const status = await this.db.saveUser(userLimit)
        return {
            'status': status
        }
    }
    async getUserLimitCorrectedValues(userLimit: UserLimit): Promise<UserLimit> {
        const existingUser = await this.db.getUser(this.payload.userId)
        return { ...existingUser, ...userLimit, ...{ progress: existingUser?.progress } }
    }
}


export class LimitUserProgressChanged extends LimitUserBaseProgress {
    getProgress(): string {
        /* not sure which progress to give so generated random value
        * Change UserLimit.progress on USER_LIMIT_PROGRESS_CHANGED
        business logic was not specifed so giving default value of 
        */
        return `Changed user limit progress ${this.uuidv4()}`
    }
    uuidv4() {
        /*
        uuid4 random string
        */
        /* @ts-ignore */
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export class LimitUserReset extends LimitUserBaseProgress {

    getProgress(): string {
        /*
        * Reset the progress value on USER_LIMIT_RESET
        */
        return this.defaultProgress
    }
}