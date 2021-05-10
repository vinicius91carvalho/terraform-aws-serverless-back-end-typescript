resource "aws_iam_role" "lambda_dynamodb_role" {
  name = "${var.environment}-dynamodb-role"
  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_basic_role_attachment" {
  role       = aws_iam_role.lambda_dynamodb_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb_role_attachment" {
  role       = aws_iam_role.lambda_dynamodb_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_ssm_parameter" "lambda_dynamodb_iam_role" {
  name      = "${var.environment}-lambda-dynamodb-iam-role"
  type      = "String"
  value     = aws_iam_role.lambda_dynamodb_role.arn
  overwrite = true
}
