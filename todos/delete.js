const tableName = process.env.DYNAMODB_TODO_TABLE;

const dynamodb = require('aws-sdk/clients/dynamodb');
const { httpOk } = require('utils/helpers');

const docClient = new dynamodb.DocumentClient();

exports.deleteTodo = async (event) => {
  console.info('received:', event);

  const params = {
    TableName: tableName,
  };

  const data = await docClient.scan(params).promise();
  const items = data.Items;

  return httpOk(items);
};
