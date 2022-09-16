import {
    KinesisStreamHandler,
    KinesisStreamEvent,
    KinesisStreamRecordPayload,
} from 'aws-lambda';
import { EventHandler } from '../event.handler.js';

/**
 * taken from https://github.com/serverless/examples/blob/master/aws-node-typescript-kinesis/kinesis/consumer.ts
 * @param event : KinesisStreamEvent
 */
const consumer: KinesisStreamHandler = async (event: KinesisStreamEvent) => {
    /*
    taken from https://github.com/serverless/examples/blob/master/aws-node-typescript-kinesis/kinesis/consumer.ts
    */
    const eventHandler = new EventHandler();
    try {
        for (const record of event.Records) {
            const payload: KinesisStreamRecordPayload = record.kinesis;
            const message: string = Buffer.from(payload.data, 'base64').toString();

            console.log(
                `Kinesis Message:
            partition key: ${payload.partitionKey}
            sequence number: ${payload.sequenceNumber}
            kinesis schema version: ${payload.kinesisSchemaVersion}
            data: ${message}
          `);
            const dataPayload = JSON.parse(message)
            await eventHandler.process({ payload: dataPayload, ...payload })
        }
    } catch (error) {
        console.log(error);
    }
};

export default consumer;