const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('node_modules', {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.grpcObject;

const server = new grpc.Server();
server.bind('localhost:4000', grpc.ServerCredentials.createInsecure());

server.addService(todoPackage.Todo.service, {
  createTodo,
  readTodos,
});

function createTodo(call, callback) {
  callback('test');
}

function readTodos(call, callback) {
  callback('test');
}

server.start();
