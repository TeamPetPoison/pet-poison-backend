# Create a lambda

In order to add a AWS Lambda function to the project, one needs to modify the correspondent `template.yml` file by adding a resource to it. The code related to the `hello-world` Lambda function is the next one (note that, in such a file, resources are grouped below comments #Lambda Functions, # Api, etc... ):

```
HelloWorld:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: !Sub "HelloWorld-${stage}"
      CodeUri: ./build/
      Handler: src/functions/hello-world/handler.handler
    Events:
      Submit:
        Type: Api
        Properties:
          Path: /hello
          Method: GET
          RestApiId: !Ref Api
    Environment:
      Variables:
        NODE_OPTIONS: --enable-source-maps
```

Let us go through the code. The **bold** text refers to fields that can be modified and personalized according to the Lambda we want to create.
Before starting, note that `!Sub` replaces the value included inside the expression `${some_value}` with its actual value, usually accessible by a environment variable.

- **HelloWorld** -> is the name of the Resource we want to create, can be any name
  - Type: AWS::Serverless::Function
  - Properties:
    - FunctionName: !Sub "**HelloWorld**-${stage}" -> the name of the Lambda function we want to use in AWS. **<u>ALWAYS leave the stage name at the end of the function</u>**
    - CodeUri: ./build/
    - Handler: src/functions/**hello-world**/handler.handler -> it is the function that is run by the API Gateway. Every Lambda must have one.
    - Events: -> the event that triggers the Lambda function, in this case a GET request to the API to the `/hello`
      - Submit:
      - Type: Api
      - Properties:
        - Path: **/hello**
        - Method: **GET** -> the Method we have implemented in ou
        - RestApiId: !Ref Api -> this is authomatically replaced by the API we have created before in this file
    - Environment: -> from here we can setup environment stage
      - Variables:
        - **NODE_OPTIONS: --enable-source-maps** -> you can pass any environment variables with the the format `KEY: VALUE`.

Every Lambda function will be stored in the path `./src/functions/function-name`. The folder must contain a `handler.ts` file, which will describe the AWS flow of execution (input -> logic -> response). The logic of the Lambda function itself is contained in the `index.ts`.

Every handler of a AWS Lambda function takes as input two parameters

- APIGatewayEvent: (or any other event that has triggered the Lambda function)
- Context: a complex object defining the context the Lambda has been triggered (see the [AWS Docs](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 'AWS Lambda Function Context Docs')).

And the response that is sent will be shaped using the function _shapeResponse_ (`src/helpers.ts`), which accepts as a parameters a `status code:number` (see the complete [list](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes 'Status Codes list') and a JSON object which will be the body of the response.
