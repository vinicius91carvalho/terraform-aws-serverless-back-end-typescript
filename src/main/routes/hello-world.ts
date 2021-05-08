export const handler = async (event): Promise<any> => {
  const userGroup = event?.requestContext?.authorizer?.claims?.['cognito:groups']
  const userEmail = event?.requestContext?.authorizer?.claims?.email
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello World: ${userGroup} - ${userEmail}`,
        input: event
      },
      null,
      2
    )
  }
  return response
}
