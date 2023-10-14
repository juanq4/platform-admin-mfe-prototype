set -e
terragrunt run-all init  --terragrunt-non-interactive --terragrunt-include-external-dependencies
terragrunt run-all destroy --terragrunt-non-interactive --terragrunt-include-external-dependencies