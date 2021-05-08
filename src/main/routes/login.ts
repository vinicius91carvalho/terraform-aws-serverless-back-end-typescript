import AWS from 'aws-sdk'
const cognito = new AWS.CognitoIdentityServiceProvider()

export const handler = async (event): Promise<any> => {
  console.log(event)
  const { username, password } = JSON.parse(event.body)
  const params = {
    AuthFlow: 'ADMIN_NO_SRP_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID,
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password
    }
  }

  let response
  try {
    response = await cognito.adminInitiateAuth(params).promise()
    console.log(response)
  } catch (error) {
    console.error(error)
    return {
      statusCode: '500',
      body: JSON.stringify(error),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      }
    }
  }

  return {
    statusCode: '200',
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    }
  }
}
