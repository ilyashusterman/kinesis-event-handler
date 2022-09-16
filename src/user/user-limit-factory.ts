import { EventType } from "../event/event-dataclasses.js";
import { LimitUserCreated, LimitUserProgressChanged, LimitUserReset } from "./user-limit-implementaions.js";


export interface Dictionary<T> {
    [Key: string]: T;
}

export const USER_LIMIT_IMPLEMENTATIONS: Dictionary<any> = {
    [EventType.USER_LIMIT_CREATED]: LimitUserCreated,
    [EventType.USER_LIMIT_PROGRESS_CHANGED]: LimitUserProgressChanged,
    [EventType.USER_LIMIT_RESET]: LimitUserReset,
}