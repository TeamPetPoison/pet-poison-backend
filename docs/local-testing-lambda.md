Before starting, ensure you have followed step by step the guide in [local-testing-setup](./local-testing-setup.md), especially the part regarding the installation of [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification.html 'SAM Docs').

# Local Test - HelloWorld Lambda

The following code is used **only** to test the HelloWorld lambda, which is triggered after a **GET** request to the APIGateway. For other methods, please refer to the documentation.

1. Being in the root folder of the project create an `event` to trigger your Lambda according to this [guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-generate-event.html 'SAM local docs'). Yours should be something like: `sam local generate-event apigateway aws-proxy --method GET`. You will notice that this only prints the event to your terminal, to save it into a file we must append `> output-file.json` to the previous command. Namely, the final command will look like:

```
sam local generate-event apigateway aws-proxy --method GET > output-file.json
```

2. Move the file that you have just generated to the folder of your Lambda inside an _events_ folder that, eventually, you might have to create and give the file a descriptive name (we will still refer to it as `output-file.json`).
3. You will have to modify the `output-file.json` with the information required by your Lambda. In our case we must change `queryStringParameters` field from:

```JSON
"queryStringParameters": {
  "foo": "bar"
},
```

to

```JSON
"queryStringParameters": {
  "name": "Mariagiangengiangola"
},
```

4. Now proceed with the transpiling of Typescript files to Javascript files with:

```
npm run build
```

5. You are now ready to locally test your Lambda! This can be done through the following command. Please note that you might need to wait some time if it is the first time that you run it.

```
sam local invoke -t template.yml HelloWorld -e src/functions/hello-world/output-file.json
```

6. The output you should see after such a request, given the input file we have built so far, is:

```
{"statusCode":200,"headers":{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Credentials":true},"body":"{\"res\":\"Hello Mariagiangengiangola from the world\"}"}%
```

That is nothing more than the response we expect from that Lambda, but with an ugly formatting.

7. You can repeat this process to create a number of events to test your Lambdas behavior with several and different inputs. Just remember to name those events in a descriptive way, in such a a way that is **clear** to everybody what output we expect when ingesting such a file.
