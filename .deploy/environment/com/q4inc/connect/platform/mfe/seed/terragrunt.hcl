include {
  path = find_in_parent_folders("root_terragrunt.hcl")
}

locals {
  variables = read_terragrunt_config(find_in_parent_folders("root_terragrunt.hcl")).inputs
}

inputs = {
  region           = local.variables.aws_region
  environment      = local.variables.environment
  iam_role         = local.variables.iam_role
  environment_type = local.variables.environment_type
}

dependencies {
  paths = ["../../bootstrap/deployment_role"]
}