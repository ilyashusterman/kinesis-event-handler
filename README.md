### Features

- handle user attributes with user events for each implemented logic
- save user limites over data.json local file system

# kinesis-event-handler

####Install

`$ npm install`
or
`$ yarn install`

####Usage

```typescript
/*
 * to your index.js or any other main entry in package.json which the producer is located also
 */
import { consumer } from "kinesis-event-handler";
/*
 * or debug and run locally event handler by yourself
 */
import { EventHandler } from "kinesis-event-handler";
/*
 *
 */
const load_your_event_here = {
  payload: {
    someId: 1,
  },
};
const handler = new EventHandler();
await handler.process(load_your_event_here);
```

####Testing

located at `main.ts`.
