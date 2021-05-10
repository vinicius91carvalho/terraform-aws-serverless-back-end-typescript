
import Controller from '@/presentation/protocols/controller-protocol'
import { HttpRequest } from '@/presentation/protocols/http-protocols'
import { APIGatewayProxyEvent } from 'aws-lambda'

export const adaptHandler = (controller: Controller) => {
  return async (event: APIGatewayProxyEvent) => {
    const userGroup = event?.requestContext?.authorizer?.claims?.['cognito:groups']
    const userEmail = event?.requestContext?.authorizer?.claims?.email
    const request: HttpRequest<any> = {
      user: {
        userEmail,
        userGroup
      },
      path: event.path,
      pathParameters: event.pathParameters,
      queryStringParameters: event.queryStringParameters,
      body: JSON.parse(event.body)
    }
    const httpResponse = await controller.handle(request)
    httpResponse.body = JSON.stringify(httpResponse.body)
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Origin': '*'
      },
      ...httpResponse
    }
  }
}
