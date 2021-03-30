const tableName = process.env.DYNAMODB_TODO_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

exports.deleteTodo = async (event) => {
  console.info('received:', event);

  const params = {
    TableName: tableName,
  };

  const data = await docClient.scan(params).promise();
  const items = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
  };

  console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
  return response;
};
