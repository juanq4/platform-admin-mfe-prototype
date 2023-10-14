set -e
terragrunt run-all init  --terragrunt-non-interactive --terragrunt-include-external-dependencies
terragrunt run-all apply --terragrunt-non-interactive --terragrunt-include-external-dependencies
echo 'outputs<<EOF' >> $GITHUB_OUTPUT
terragrunt run-all output --terragrunt-non-interactive --terragrunt-include-external-dependencies -json | jq -s add | jq 'with_entries(.value |= .value)' >> $GITHUB_OUTPUT
echo 'EOF' >> $GITHUB_OUTPUT