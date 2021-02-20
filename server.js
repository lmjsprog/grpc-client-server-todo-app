const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();

server.addService(todoPackage.Todo.service, {
  createTodo,
  readTodos,
  readTodosStream,
});

const todoList = [];

function createTodo(call, callback) {
  const todoItem = {
    id: todoList.length + 1,
    text: call.request.text,
  };

  todoList.push(todoItem);
  callback(null, todoItem);
}

function readTodos(call, callback) {
  callback(null, {
    items: todoList,
  });
}

function readTodosStream(call) {
  for (let i = 0; i < 100; i++) {
    todoList.push({ id: todoList.length + 1, text: `To do something ${i}` });
  }

  todoList.forEach((todoItem) => call.write(todoItem));
  call.end();
}

server.bindAsync(
  '0.0.0.0:50051',
  grpc.credentials.createInsecure(),
  (err, port) => {
    if (err) console.log('Error has occurred ', err);
    console.log(`Server is listening ${port} port`);
    server.start();
  },
);
