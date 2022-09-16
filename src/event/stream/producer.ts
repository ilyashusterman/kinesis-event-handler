import { APIGatewayProxyHandler } from 'aws-lambda';
import { Kinesis } from 'aws-sdk';


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const kinesis = new Kinesis({
    apiVersion: '2013-12-02',
});

/**
 * see more at https://github.com/serverless/examples/blob/master/aws-node-typescript-kinesis/kinesis/producer.ts
 */
const producer: APIGatewayProxyHandler = async (event) => {
    let statusCode: number = 200;
    let message: string;

    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'No body was found',
            }),
        };
    }

    const streamName: string = 'eventStream';

    try {
        await kinesis.putRecord({
            StreamName: streamName,
            PartitionKey: uuidv4(),
            Data: event.body,
        }).promise();

        message = 'Message placed in the Event Stream!';

    } catch (error) {
        console.log(error);
        message = error;
        statusCode = 500;
    }

    return {
        statusCode,
        body: JSON.stringify({
            message,
        }),
    };
};

export default producer;