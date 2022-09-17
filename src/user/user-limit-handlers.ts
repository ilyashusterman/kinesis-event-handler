import { EventHandlerResult } from "../event/event.data.classes.js";
import { UserLimit, UserLimitProcessReset, UserLimitProgessChangedModel } from "./user-limit.js";
import { BaseUserLimitHandler, LimitUserBaseProgressHandler } from "./user-limit-base.js";

export class LimitUserCreated extends BaseUserLimitHandler<UserLimit> {
    /*
    Instantiate a new UserLimit on USER_LIMIT_CREATED with correct values
    */
    async handle(): Promise<EventHandlerResult | Error> {
        let userLimit: UserLimit = this.getUserLimit()
        const isUserExist = await this.db.isUserExist(this.payload.userId);
        if (isUserExist) {
            return await this.updateUser(userLimit);

        }
        return await this.createUser(userLimit);
    }

    getProgress(): string {
        return this.defaultProgress
    }
    private async createUser(userLimit: UserLimit): Promise<EventHandlerResult> {
        console.log('Creating new UserLimit');
        await this.db.saveUser(userLimit);
        return {
            'status': `User <${userLimit.userId}> Saved Successfully`
        };
    }

    private async updateUser(userLimit: UserLimit): Promise<EventHandlerResult> {
        console.log('UserLimit existing, updating user with corrected values...');
        const { progress, ...updateFieldsMap } = userLimit;
        await this.db.updateUser(this.payload.userId, updateFieldsMap)
        return {
            'status': `Updating user successfully!`
        }
    }
}


export class LimitUserProgressChanged extends LimitUserBaseProgressHandler<UserLimitProgessChangedModel> {
    getProgress(): string {
        /* not sure which progress to give so generated random value
        * Change UserLimit.progress on USER_LIMIT_PROGRESS_CHANGED
        business logic was not specifed so giving default value of 
        */
        return `Changed UserLimit progress at:${this.payload.createdAt}`
    }
}

export class LimitUserReset extends LimitUserBaseProgressHandler<UserLimitProcessReset> {

    getProgress(): string {
        /*
        * Reset the progress value on USER_LIMIT_RESET
        */
        return this.defaultProgress
    }
}