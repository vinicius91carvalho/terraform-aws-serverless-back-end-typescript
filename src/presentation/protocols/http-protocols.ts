interface UserData {
  userEmail: string
  userGroup: string
}

export interface HttpRequest<T> {
  user: UserData
  path: string
  pathParameters: any
  queryStringParameters: any
  body: T
}

export interface HttpResponse {
  statusCode: number
  body: any
}
