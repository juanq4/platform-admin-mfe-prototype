terraform_version_constraint = "1.4.2"

locals {
  aws_region                = "us-east-1"
  environment_failover      = "dev"
  environment               = get_env("ENVIRONMENT", local.environment_failover)
  is_feature                = !contains(["dev", "stage", "prod"], local.environment)
  environment_type          = local.is_feature ? "feature" : local.environment
  state_environment         = local.is_feature ? local.environment_failover : local.environment
  state_file_bucket_name    = "state.terraform.${local.state_environment}.microservices.connect.q4inc.com.${local.aws_region}"
  state_file_dynamodb_table = "lock.state.terraform.${local.state_environment}.microservices.connect.q4inc.com"
  state_file_prefix         = replace(path_relative_to_include(), "/^environment/", "environment/${local.environment}" )
  state_file_name           = "terraform.tfstate"
  state_file_key            = "${local.state_file_prefix}/${local.state_file_name}"
  disable_backend_init      = tobool(get_env("TERRAGRUNT_DISABLE_BACKEND_INIT", "false"))
  #We can't set these during build because we have no aws_access_keys.
  account_id                = local.disable_backend_init ? "" : get_aws_account_id()
  # <deployment-role-> comming from deployment, <platform-mfe-seed> from terraform tfvars
  iam_role                  = local.disable_backend_init ? null : "arn:aws:iam::${local.account_id}:role/deployment-role-platform-mfe-seed-${local.state_environment}" 
  is_docker_container          = get_env("DOCKER_CONTAINER", false)
  terraform_provider_directory = local.is_docker_container ? "/apps/.terraform.d/plugin-cache" : ""
}

iam_role=local.iam_role

remote_state {
  backend = "s3"

  generate = {
    path      = "backend.tf"
    if_exists = "overwrite"
  }

  config = {
    bucket         = local.state_file_bucket_name
    key            = local.state_file_key
    region         = local.aws_region
    encrypt        = true
    dynamodb_table = local.state_file_dynamodb_table
  }
  disable_init = local.disable_backend_init
}


terraform {
  extra_arguments "conditional_vars" {
    commands = [
      "destroy",
      "apply",
      "plan",
      "import",
      "push",
      "refresh"
    ]

    optional_var_files = [
      "${get_terragrunt_dir()}/tfvars/${local.environment_type}.tfvars"
    ]
  }

  extra_arguments "terraform_cache_directory" {
    commands = [
      "apply",
      "console",
      "destroy",
      "env",
      "fmt",
      "get",
      "graph",
      "import",
      "init",
      "login",
      "logout",
      "output",
      "plan",
      "providers",
      "refresh",
      "show",
      "taint",
      "untaint",
      "validate",
      "version",
      "workspace"
    ]
    env_vars = {
      TF_PLUGIN_CACHE_DIR = local.terraform_provider_directory
    }
  }

}
inputs = local