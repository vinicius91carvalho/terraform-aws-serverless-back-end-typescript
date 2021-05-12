resource "aws_dynamodb_table" "customer_table" {
  name           = "${var.environment}-${var.project_name}-customers"
  hash_key       = "id"
  billing_mode   = "PAY_PER_REQUEST"
  stream_enabled   = true
  stream_view_type = "NEW_IMAGE"

  attribute {
    name = "id"
    type = "S"
  }
}

resource "aws_ssm_parameter" "dynamodb-customer-arn" {
  name      = "${var.environment}-${var.project_name}-dynamodb-customer-arn"
  type      = "String"
  value     = aws_dynamodb_table.customer_table.arn
  overwrite = true
}

resource "aws_ssm_parameter" "dynamodb-customer-stream-arn" {
  name      = "${var.environment}-${var.project_name}-dynamodb-customer-stream-arn"
  type      = "String"
  value     = aws_dynamodb_table.customer_table.stream_arn
  overwrite = true
}

resource "aws_ssm_parameter" "dynamodb-customer-name" {
  name      = "${var.environment}-${var.project_name}-dynamodb-customer-name"
  type      = "String"
  value     = aws_dynamodb_table.customer_table.id
  overwrite = true
}