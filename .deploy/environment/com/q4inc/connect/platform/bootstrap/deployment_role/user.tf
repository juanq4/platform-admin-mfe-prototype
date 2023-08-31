module "deployment_user" {
  source      = "git@github.com:q4mobile/terraform-module-aws-deployment-user.git?ref=v1.0.1"
  environment = var.environment
  name        = var.name
}