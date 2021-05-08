resource "aws_iam_role" "lambda_basic_role" {
  name = "${var.environment}-basic-role"

  assume_role_policy = templatefile("${path.module}/templates/lambda-base-policy.tpl", {})
}

resource "aws_iam_role_policy_attachment" "lambda_basic_role_policy_attachment" {
  role       = aws_iam_role.lambda_basic_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_ssm_parameter" "lambda_basic_iam_role" {
  name      = "${var.environment}-lambda-basic-iam-role"
  type      = "String"
  value     = aws_iam_role.lambda_basic_role.arn
  overwrite = true
}
