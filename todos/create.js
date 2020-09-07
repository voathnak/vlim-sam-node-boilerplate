const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.DYNAMODB_TODO_TABLE;

const { v4: uuidv4 } = require('uuid');

exports.createTodoHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }
  console.info('received:', JSON.stringify(event,null, 2));

  const body = JSON.parse(event.body)
  const { name, gender } = body;

  uuid = uuidv4();

  var params = {
    TableName : tableName,
    Item: { itemId : uuid, name, gender }
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 200,
    body: JSON.stringify(result)
  };

  console.log("result:", result);
  //
  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
}
