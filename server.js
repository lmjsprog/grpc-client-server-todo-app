const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
server.bind('0.0.0.0:4000', grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
  createTodo,
  readTodos,
});

function createTodo(call, callback) {}

function readTodos(call, callback) {}

server.start();
