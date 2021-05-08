export const handler = async (event): Promise<any> => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World!',
        input: event
      },
      null,
      2
    )
  }
  return response
}
