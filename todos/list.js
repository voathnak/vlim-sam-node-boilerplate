const tableName = process.env.DYNAMODB_TODO_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const { httpOk } = require('utils/helpers');

const docClient = new dynamodb.DocumentClient();

exports.getAllTodos = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
  }
  console.info('received:', event);
  console.info('TableName:', tableName);

  const params = {
    TableName: tableName,
  };

  const data = await docClient.scan(params).promise();
  const items = data.Items;

  return httpOk(items);
};
