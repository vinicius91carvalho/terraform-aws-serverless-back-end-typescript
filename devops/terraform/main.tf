data "aws_caller_identity" "current" {}

provider "aws" {
  region = var.region
}

terraform {
  backend "s3" {
    bucket         = "customer-api-645026403743-us-east-1-remote-state"
    key            = "customer-api/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "customer-api-645026403743-us-east-1-remote-state"
  }
}

module "auth" {
  source                   = "./auth"
  environment              = var.environment
  pool_name                = "${var.project_name}-user-pool"
  admin_user_email         = var.admin_cognito_email
  admin_user_password      = var.admin_cognito_password
  admin_group_name         = var.admin_group_cognito_name
}