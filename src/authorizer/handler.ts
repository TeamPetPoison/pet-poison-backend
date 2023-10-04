import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

exports.handler = async function (event: APIGatewayTokenAuthorizerEvent) {
  console.log(event);
  // const token = event.authorizationToken;
  // const { organisationId, userName } = decodeAccessToken(
  //   token.replace('Bearer ', '').replace('bearer ', '')
  // );
  const methodArn = event.methodArn;
  // if (organisationId && userName) {
  //   return generateAuthResponse('user', 'Allow', methodArn);
  // } else {
  //   return generateAuthResponse('user', 'Deny', methodArn);
  // }

  return generateAuthResponse('user', 'Allow', methodArn);
};

function generateAuthResponse(
  principalId: string,
  effect: string,
  methodArn: string
) {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  return {
    principalId,
    policyDocument,
  };
}

function generatePolicyDocument(effect: string, methodArn: string) {
  if (!effect || !methodArn) return null;

  const policyDocument = {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: methodArn,
      },
    ],
  };

  return policyDocument;
}
