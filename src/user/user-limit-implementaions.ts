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
            return await this.updateUser(userLimit);

        }
        return await this.createUser(userLimit);
    }
    private async createUser(userLimit: UserLimit) {
        console.log('Creating new UserLimit');
        const status = await this.db.saveUser(userLimit);
        return {
            'status': status
        };
    }

    private async updateUser(userLimit: UserLimit): Promise<EventHandlerResult> {
        console.log('UserLimit existing, updating user with corrected values...');
        const { progress, ...updateFieldsMap } = userLimit;
        const status = await this.db.updateUser(this.payload.userId, updateFieldsMap)
        return {
            'status': `Updating user ${status}`
        }
    }
}


export class LimitUserProgressChanged extends LimitUserBaseProgress {
    getProgress(): string {
        /* not sure which progress to give so generated random value
        * Change UserLimit.progress on USER_LIMIT_PROGRESS_CHANGED
        business logic was not specifed so giving default value of 
        */
        return `Changed UserLimit progress at:${this.payload.createdAt}`
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