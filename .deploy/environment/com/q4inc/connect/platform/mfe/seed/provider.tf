###
# When changing provider versions we should use a new image of com/q4inc/connect/platform/terragrunt/base
# to prevent large docker images
###
terraform {
  required_providers {
    auth0 = {
      source  = "auth0/auth0"
      version = "0.48.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version =  "4.67.0"
    }

    external = {
      source  = "hashicorp/external"
      version =  "2.3.1"
    }

    local = {
      source  = "hashicorp/local"
      version =  "2.4.0"
    }

    null = {
      source  = "hashicorp/null"
      version =  "3.2.1"
    }

    random = {
      source  = "hashicorp/random"
      version =  "3.5.1"
    }

    time = {
      source  = "hashicorp/time"
      version =  "0.9.1"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "platform"
  region = var.aws_region

  assume_role {
    role_arn = "arn:aws:iam::${var.platform_aws_account_number}:role/CreateRoute53RecordsCrossAccount"
  }
}

provider "random" {}

data "aws_caller_identity" "current" {}

data "aws_iam_session_context" "current" {
  arn = data.aws_caller_identity.current.arn
}
