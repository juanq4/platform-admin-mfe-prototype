###
#build locally:
#   syntax: docker build --ssh default={path_to_id_rsa} .
#   ex:     docker build --ssh default=/Users/andrew/.ssh/id_rsa .
###

FROM artifacts.platform.q4inc.com/docker-capital-connect-platform-virtual/com/q4inc/connect/platform/terragrunt/base:4.0.1

COPY environment environment
COPY *.sh .
COPY root_terragrunt.hcl root_terragrunt.hcl
RUN chmod +x *.sh

ENV TERRAGRUNT_DISABLE_BACKEND_INIT=true
RUN --mount=type=ssh terragrunt run-all init --terragrunt-non-interactive --terragrunt-include-external-dependencies -upgrade
RUN terragrunt run-all validate --terragrunt-non-interactive --terragrunt-include-external-dependencies
ENV TERRAGRUNT_DISABLE_BACKEND_INIT=false