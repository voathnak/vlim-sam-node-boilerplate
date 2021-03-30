const dynamodb = require('aws-sdk/clients/dynamodb');
const { httpOk } = require('utils/helpers');

const docClient = new dynamodb.DocumentClient();

const tableName = process.env.DYNAMODB_TODO_TABLE;

const { v4: uuidv4 } = require('uuid');

exports.createTodo = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }
  console.info('received:', JSON.stringify(event, null, 2));

  const body = JSON.parse(event.body);
  const { name, gender } = body;

  const uuid = uuidv4();

  const params = {
    TableName: tableName,
    Item: { itemId: uuid, name, gender },
  };

  const result = await docClient.put(params).promise();

  return httpOk(result);
};
