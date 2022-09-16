import { RawEvent } from "../src/event/event-dataclasses.js";
import { EventHandler } from "../src/event/event-handler.js";

describe('Main Events Flow', () => {
    it('process single event, event LIMIT_USER_CREATED', async () => {
        const handler = new EventHandler();
        const event: RawEvent<any> = {
            "aggregateId": "VijPYTEOgK7dxLs5fBjJ",
            "context": {},
            "createdAt": 1647945426109,
            "eventId": "fpCjY8GhaQjuzpcqkaCk",
            "payload": {
                "brandId": "000000000000000000000001",
                "currencyCode": "SEK",
                "jurisdiction": "SGA",
                "userId": "VijPYTEOgK7dxLs5fBjJ"
            },
            "sequenceNumber": 1,
            "source": "limitUser",
            "type": "LIMIT_USER_CREATED"
        };
        const result = await handler.process(event);
        expect(result.status).toBe('User <VijPYTEOgK7dxLs5fBjJ> Saved Successfully');
    });
});