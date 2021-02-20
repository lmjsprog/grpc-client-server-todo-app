const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  'localhost:50051',
  grpc.credentials.createInsecure(),
);

// * * * * * * * * * * * * *
// Create todo item
// * * * * * * * * * * * * *

client.createTodo({ id: 1, text: 'To do something' }, (err, response) => {
  if (err) console.log('Error has occurred', err);
  console.log('createTodo is ', JSON.stringify(response));
});

// * * * * * * * * * * * * *
// Get all todo items using response
// * * * * * * * * * * * * *

client.readTodos({}, (err, response) => {
  if (err) console.log('Error has occurred', err);
  console.log('readTodos is ', JSON.stringify(response));
});

// * * * * * * * * * * * * *
// Get all todo items using stream
// * * * * * * * * * * * * *

const callObject = client.readTodosStream();

callObject.on('data', (message) => {
  console.log('Message from server is ', JSON.stringify(message));
});
callObject.on('end', () => {
  console.log('Server ended its stream');
});
