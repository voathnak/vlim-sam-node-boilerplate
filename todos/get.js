// Create clients and set shared const values outside of the handler.

// Get the DynamoDB table name from environment variables
const tableName = process.env.SAMPLE_TABLE;

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

/**
 * A simple example includes a HTTP get method to get one item by id from a DynamoDB table.
 */
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

  return {
    statusCode: 200,
    body: JSON.stringify(item),
  };
};
