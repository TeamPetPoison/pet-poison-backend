# pet-poison-backend-functions

## Getting started

In order to get started, you need first to install all the dependencies with the following command:

```
npm install
```

## Run the project

To run a local express server (`src/server.ts`) that runs on a default port (`:3030`) that simulates locally the lambdas behavior, one must run the following command:

```
npm run start
```

From now on, the user will be able to trigger locally lambdas using the APIs with the methods implemented as for the design. This can be done using Insomnia or Postman.

## Example

In order to test the most basic lambda, namely _hello-world_ (GET Method), one should open the Insomnia or Postman and send a GET request to the address

```
localhost:3030/hello-world?name=username
```

Where username can be any string. The server will then reply the user with calling it with its name.
