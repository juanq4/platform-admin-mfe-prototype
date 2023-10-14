module "deployment_role" {
  source                                   = "git@github.com:q4mobile/terraform-module-aws-deployment-role.git?ref=v1.0.2"
  allow_local_development                  = var.allow_local_development
  deployment_user                          = module.deployment_user.user
  environment                              = var.environment
  name                                     = var.name
}