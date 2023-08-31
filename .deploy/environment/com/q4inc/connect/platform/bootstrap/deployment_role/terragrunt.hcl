include {
  path = find_in_parent_folders("root_terragrunt.hcl")
}

locals {
  variables = read_terragrunt_config(find_in_parent_folders("root_terragrunt.hcl")).inputs
}

inputs = {
  region      = local.variables.aws_region
  environment = local.variables.environment
}