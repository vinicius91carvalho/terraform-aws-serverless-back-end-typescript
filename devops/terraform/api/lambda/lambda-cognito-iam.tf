resource "aws_iam_role" "lambda_cognito_role" {
  name = "${var.environment}-cognito-role"

  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_iam_role_policy_attachment" "lambda_cognito_role_attachment" {
  role       = aws_iam_role.lambda_cognito_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "lambda_cognito_policy" {
  name   = "${var.environment}-lambda-cognito-iam-policy"
  policy = templatefile("${path.module}/templates/lambda-cognito-policy.tpl", {})
}

resource "aws_iam_role_policy_attachment" "lambda_cognito_policy_role_attachment" {
  role       = aws_iam_role.lambda_cognito_role.name
  policy_arn = aws_iam_policy.lambda_cognito_policy.arn
}

resource "aws_ssm_parameter" "lambda_cognito_iam_role" {
  name      = "${var.environment}-lambda-cognito-iam-role"
  type      = "String"
  value     = aws_iam_role.lambda_cognito_role.arn
  overwrite = true
}
