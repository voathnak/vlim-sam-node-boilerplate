const tableName = process.env.SAMPLE_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const { httpOk } = require('utils/helpers');

const docClient = new dynamodb.DocumentClient();

exports.getTodoById = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);

  const { itemId } = event.pathParameters;

  // Get the item from the table
  const params = {
    TableName: tableName,
    Key: { itemId },
  };
  const data = await docClient.get(params).promise();
  const item = data.Item;

  return httpOk(item);
};
