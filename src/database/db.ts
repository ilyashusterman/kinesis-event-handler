import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url'
import { BaseUserLimitModel } from '../user/user-limit.js';

class JSONFileDatabase {
    /**
     * implemented database json db with local file
    */
    db: Low;
    constructor(filename = 'data.json') {
        const __dirname = dirname(fileURLToPath(import.meta.url));
        const file = join(__dirname, filename)
        const adapter = new JSONFile(file);
        this.db = new Low(adapter);
        this.db.data ||= { users: {} }
    }
    async sync() {
        await this.db.read();
    }
    async initialize(): Promise<this> {
        await this.sync();
        return this
    }
    async saveDB(): Promise<void> {
        await this.db.write()
    }
}

/**
 * The `EventDatabase` class data layer access to the user database.
 * It can be accessed using:
 *
 * ```js
 * import { EventDatabase, instance } from "../database/db.js";
 * instance.saveUser(...)
 * ```
 */
export class EventDatabase extends JSONFileDatabase {

    async isUserExist(userId: string): Promise<boolean> {
        await this.sync();
        /* @ts-ignore */
        return userId in this.db.data.users
    }
    async saveUser(userLimit: BaseUserLimitModel): Promise<BaseUserLimitModel> {
        await this.sync();
        /* @ts-ignore */
        this.db.data.users[userLimit.userId] = userLimit
        await this.saveDB()
        return userLimit
    }
    async getUser(userId: string): Promise<BaseUserLimitModel | undefined> {
        const isUserExist = await this.isUserExist(userId);
        if (!isUserExist) {
            return undefined
        }
        /* @ts-ignore */
        return this.db.data.users[userId]
    }
    async updateUser(userId: string, updateFieldsMap: any) {
        const userLimit = await this.getUser(userId);
        const newUserLimit: BaseUserLimitModel = { ...userLimit, ...updateFieldsMap }
        return await this.saveUser(newUserLimit)
    }
    async updateUserKeyVal(userId: string, key: string, value: any) {
        await this.sync();
        /* @ts-ignore */
        this.db.data.users[userId][key] = value
        await this.saveDB()
        return userId
    }
}

export const instance = await (new EventDatabase()).initialize();