const { httpMethodNotAllowed } = require('utils/helpers');
const { WRONG_HTTP_METHOD } = require('constants/text-constants').respondMessages;
const { getTodoById } = require('./get');
const { getAllTodos } = require('./list');
const { createTodo } = require('./create');
const { deleteTodo } = require('./delete');

const handlingGetRequest = async (resource, event) => {
  switch (resource) {
    case '/todos/{itemId}':
      return getTodoById(event);
    default:
      return getAllTodos(event);
  }
};

const handlingPostRequest = async (resource, event) => {
  switch (resource) {

    default:
      return createTodo(event);
  }
};

const handlingDeleteRequest = async (resource, event) => {
  switch (resource) {
    default:
      return deleteTodo(event);
  }
};

exports.lambdaHandler = async (event) => {
  const { resource } = event;
  console.info('◊◊◊◊◊◊◊  resource:', resource);

  switch (event.httpMethod) {
    case 'GET':
      return handlingGetRequest(resource, event);
    case 'POST':
      return handlingPostRequest(resource, event);
    case 'DELETE':
      return handlingDeleteRequest(resource, event);
    default:
      return httpMethodNotAllowed(JSON.stringify({
        message: WRONG_HTTP_METHOD,
      }, null, 2));
  }
};
